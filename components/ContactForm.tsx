"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import {
  budgetValues,
  stuckValues,
  type ContactPayload,
  type ContactResponse,
  type ContactSource,
} from "@/lib/contact";

type Props = {
  locale: Locale;
  source: ContactSource;
  /** "full" = project enquiry, "checklist" = email gate for the PDF. */
  variant?: "full" | "checklist";
  labels: Dictionary["form"];
  checklistLabels?: Dictionary["checklistForm"];
  bookingUrl: string;
  email: string;
  privacyHref: string;
};

type Status = "idle" | "sending" | "done" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "building", string>>;

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] tracking-[-0.005em] text-ink transition-colors duration-150 placeholder:text-faint hover:border-border-strong focus:border-accent focus:outline-none aria-[invalid=true]:border-red-500";
const labelClass =
  "mb-1.5 block text-[13px] font-medium tracking-[-0.01em] text-ink";
const errorClass = "mt-1.5 text-[13px] text-red-600";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm({
  locale,
  source,
  variant = "full",
  labels,
  checklistLabels,
  bookingUrl,
  email,
  privacyHref,
}: Props) {
  const isChecklist = variant === "checklist";
  const c = checklistLabels;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [download, setDownload] = useState<string | null>(null);
  const startedAt = useRef(0);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "done" && download) downloadRef.current?.click();
  }, [status, download]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const errors: FieldErrors = {};
    if (!EMAIL_RE.test(get("email"))) errors.email = labels.errorEmail;
    if (!isChecklist) {
      if (!get("name")) errors.name = labels.errorRequired;
      if (!get("building")) errors.building = labels.errorRequired;
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setErrorMsg(labels.errorInvalid);
      setStatus("error");
      return;
    }

    const payload: ContactPayload = {
      source,
      locale,
      email: get("email"),
      name: get("name") || undefined,
      company: get("company") || undefined,
      building: get("building") || undefined,
      budget: (get("budget") || undefined) as ContactPayload["budget"],
      stuck: (get("stuck") || undefined) as ContactPayload["stuck"],
      page: window.location.pathname,
      attribution: getAttribution(),
      hp: get("nickname"),
      elapsed: Date.now() - startedAt.current,
    };

    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json()) as ContactResponse;
      if (body.ok) {
        // Ads conversions (see docs/ads-tracking.md).
        if (isChecklist) {
          track("checklist_download", { locale, form_source: source });
        } else {
          track("contact_submit", {
            locale,
            form_source: source,
            budget: payload.budget,
            stuck: payload.stuck,
          });
        }
        setDownload(body.download ?? null);
        setStatus("done");
        return;
      }
      setErrorMsg(
        body.error === "rate_limited"
          ? labels.errorRateLimited
          : body.error === "invalid"
            ? labels.errorInvalid
            : null,
      );
      setStatus("error");
    } catch {
      setErrorMsg(null);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="bg-section rounded-3xl p-9 text-left max-[900px]:rounded-[18px] max-[900px]:p-6"
      >
        <h3 className="text-ink mb-2 text-[22px] font-semibold tracking-[-0.02em]">
          {isChecklist && c ? c.successTitle : labels.successTitle}
        </h3>
        <p className="text-dim mb-6 text-[15px] leading-[1.55]">
          {isChecklist && c ? c.successBody : labels.successBody}
        </p>
        <div className="flex flex-wrap gap-3">
          {isChecklist && download && c && (
            <a
              ref={downloadRef}
              href={download}
              download
              className="bg-ink hover:bg-accent hover:shadow-btn inline-flex items-center gap-1.5 rounded-full px-[22px] py-3 text-sm font-medium tracking-[-0.01em] text-white no-underline transition-all duration-150 hover:-translate-y-px"
            >
              {c.download} ↓
            </a>
          )}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isChecklist
                ? "text-accent inline-flex items-center px-1 py-3 text-sm font-medium tracking-[-0.01em] no-underline"
                : "bg-ink hover:bg-accent hover:shadow-btn inline-flex items-center gap-1.5 rounded-full px-[22px] py-3 text-sm font-medium tracking-[-0.01em] text-white no-underline transition-all duration-150 hover:-translate-y-px"
            }
          >
            {isChecklist && c ? c.bookCta : labels.successCta} →
          </a>
        </div>
      </div>
    );
  }

  const sending = status === "sending";
  const fieldId = (name: string) => `${source}-${name}`;
  const errId = (name: string) => `${source}-${name}-error`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-section rounded-3xl p-9 text-left max-[900px]:rounded-[18px] max-[900px]:p-6"
    >
      {/* Honeypot: hidden from people and assistive tech, bots fill it. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Nickname
          <input type="text" name="nickname" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div
        className={`grid gap-5 ${isChecklist ? "grid-cols-[1fr_1.4fr] max-[600px]:grid-cols-1" : "grid-cols-2 max-[600px]:grid-cols-1"}`}
      >
        <div>
          <label htmlFor={fieldId("name")} className={labelClass}>
            {isChecklist && c ? c.name : labels.name}
            {isChecklist && (
              <span className="text-faint font-normal">
                {" "}
                ({labels.optional})
              </span>
            )}
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            className={inputClass}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? errId("name") : undefined}
          />
          {fieldErrors.name && (
            <p id={errId("name")} className={errorClass}>
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={fieldId("email")} className={labelClass}>
            {isChecklist && c ? c.email : labels.email}
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={200}
            className={inputClass}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? errId("email") : undefined}
          />
          {fieldErrors.email && (
            <p id={errId("email")} className={errorClass}>
              {fieldErrors.email}
            </p>
          )}
        </div>

        {!isChecklist && (
          <>
            <div>
              <label htmlFor={fieldId("company")} className={labelClass}>
                {labels.company}{" "}
                <span className="text-faint font-normal">
                  ({labels.optional})
                </span>
              </label>
              <input
                id={fieldId("company")}
                name="company"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder={labels.companyPlaceholder}
                maxLength={200}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={fieldId("budget")} className={labelClass}>
                {labels.budget}{" "}
                <span className="text-faint font-normal">
                  ({labels.optional})
                </span>
              </label>
              <select
                id={fieldId("budget")}
                name="budget"
                defaultValue=""
                className={`${inputClass} form-select appearance-none`}
              >
                <option value="">{labels.budgetPlaceholder}</option>
                {budgetValues.map((v) => (
                  <option key={v} value={v}>
                    {labels.budgetOptions[v]}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 max-[600px]:col-span-1">
              <label htmlFor={fieldId("stuck")} className={labelClass}>
                {labels.stuck}{" "}
                <span className="text-faint font-normal">
                  ({labels.optional})
                </span>
              </label>
              <select
                id={fieldId("stuck")}
                name="stuck"
                defaultValue=""
                className={`${inputClass} form-select appearance-none`}
              >
                <option value="">{labels.stuckPlaceholder}</option>
                {stuckValues.map((v) => (
                  <option key={v} value={v}>
                    {labels.stuckOptions[v]}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 max-[600px]:col-span-1">
              <label htmlFor={fieldId("building")} className={labelClass}>
                {labels.building}
              </label>
              <textarea
                id={fieldId("building")}
                name="building"
                rows={4}
                maxLength={4000}
                placeholder={labels.buildingPlaceholder}
                className={`${inputClass} resize-y`}
                aria-invalid={!!fieldErrors.building}
                aria-describedby={
                  fieldErrors.building ? errId("building") : undefined
                }
              />
              {fieldErrors.building && (
                <p id={errId("building")} className={errorClass}>
                  {fieldErrors.building}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={sending}
          className="bg-ink hover:bg-accent hover:shadow-btn inline-flex cursor-pointer items-center gap-1.5 rounded-full px-[22px] py-3 text-sm font-medium tracking-[-0.01em] text-white transition-all duration-150 hover:-translate-y-px disabled:cursor-wait disabled:opacity-60"
        >
          {sending
            ? isChecklist && c
              ? c.sending
              : labels.sending
            : isChecklist && c
              ? c.submit
              : labels.submit}{" "}
          →
        </button>
        <p className="text-faint max-w-[380px] text-[12.5px] leading-[1.45]">
          <a
            href={privacyHref}
            className="hover:text-ink underline decoration-1 underline-offset-2 transition-colors"
          >
            {isChecklist && c ? c.privacy : labels.privacy}
          </a>
        </p>
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p className="mt-4 text-[14px] text-red-600">
            {errorMsg ?? (
              <>
                {labels.errorGeneric}{" "}
                <a
                  href={`mailto:${email}`}
                  className="[overflow-wrap:anywhere] underline underline-offset-2"
                >
                  {email}
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
