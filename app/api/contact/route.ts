import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/lib/site";
import { checklistPdf } from "@/lib/checklist";
import {
  budgetValues,
  stuckValues,
  type ContactPayload,
  type ContactResponse,
} from "@/lib/contact";
import { en } from "@/lib/dictionaries/en";

/**
 * Contact + checklist form endpoint. Sends the submission to CONTACT_TO
 * through Resend's HTTP API and stores nothing. Spam defences: a honeypot
 * field, a minimum fill time, and a per-IP rate limit held in memory (fine for
 * the single PM2 process this runs as, resets on restart).
 *
 * Env: RESEND_API_KEY (required in production), CONTACT_TO (defaults to the
 * site email), CONTACT_FROM (a sender on a domain verified in Resend). When
 * CONTACT_FROM is set, checklist requesters also get the PDF link by email.
 */

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim().replace(/\s+\n/g, "\n");
  return v ? v.slice(0, max) : undefined;
}

function json(body: ContactResponse, status = 200) {
  return NextResponse.json(body, { status });
}

async function sendEmail(message: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONTACT_FROM ?? "Walid Ghouili site <onboarding@resend.dev>",
      to: [message.to],
      subject: message.subject,
      text: message.text,
      ...(message.replyTo ? { reply_to: message.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
  }
  return res.ok;
}

export async function POST(req: NextRequest) {
  if (Number(req.headers.get("content-length") ?? 0) > 20_000) {
    return json({ ok: false, error: "invalid" }, 413);
  }

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const isChecklist = body.source === "checklist";
  const download = isChecklist
    ? body.locale === "fr"
      ? checklistPdf.fr
      : checklistPdf.en
    : undefined;

  // Bots: pretend it worked so they don't retry with a smarter payload.
  if (body.hp || (typeof body.elapsed === "number" && body.elapsed < 800)) {
    return json({ ok: true, download });
  }

  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const source =
    typeof body.source === "string" &&
    /^(contact|checklist|lp:[a-z0-9-]{1,60})$/.test(body.source)
      ? body.source
      : null;
  const email = clean(body.email, 200);
  const name = clean(body.name, 120);
  const company = clean(body.company, 200);
  const building = clean(body.building, 4000);
  const budget = budgetValues.find((v) => v === body.budget);
  const stuck = stuckValues.find((v) => v === body.stuck);

  const valid =
    source !== null &&
    !!email &&
    EMAIL_RE.test(email) &&
    (isChecklist || (!!name && !!building));
  if (!valid) return json({ ok: false, error: "invalid" }, 400);

  const attribution = Object.entries(body.attribution ?? {})
    .filter(([k, v]) => /^(utm_[a-z]+|gclid)$/.test(k) && typeof v === "string")
    .map(([k, v]) => `${k}: ${String(v).slice(0, 200)}`);

  const lines = [
    `Source: ${source}`,
    `Locale: ${body.locale === "fr" ? "fr" : "en"}`,
    `Page: ${clean(body.page, 300) ?? "-"}`,
    "",
    `Name: ${name ?? "-"}`,
    `Email: ${email}`,
    `Company: ${company ?? "-"}`,
    `Budget: ${budget ? en.form.budgetOptions[budget] : "-"}`,
    `Stuck: ${stuck ? en.form.stuckOptions[stuck] : "-"}`,
    "",
    "What are you building:",
    building ?? "-",
    ...(attribution.length ? ["", "Attribution:", ...attribution] : []),
  ];

  const subject = isChecklist
    ? `[checklist] ${email}`
    : `[${source}] ${name}${stuck ? ` · ${en.form.stuckOptions[stuck]}` : ""}`;

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RESEND_API_KEY is not set");
      return json({ ok: false, error: "unavailable" }, 503);
    }
    console.info(`[contact] (dev, not sent) ${subject}\n${lines.join("\n")}`);
    return json({ ok: true, download });
  }

  const sent = await sendEmail({
    to: process.env.CONTACT_TO ?? site.email,
    subject,
    text: lines.join("\n"),
    replyTo: email,
  });
  if (!sent) return json({ ok: false, error: "unavailable" }, 502);

  if (isChecklist && download && process.env.CONTACT_FROM) {
    const fr = body.locale === "fr";
    await sendEmail({
      to: email,
      subject: fr
        ? "Votre checklist due diligence technique"
        : "Your technical due-diligence checklist",
      text: [
        fr ? `Bonjour${name ? ` ${name}` : ""},` : `Hi${name ? ` ${name}` : ""},`,
        "",
        fr
          ? "Voici le lien vers la checklist en 25 points :"
          : "Here's the link to the 25-point checklist:",
        `${site.url}${download}`,
        "",
        fr
          ? "Si un point vous inquiète, répondez simplement à cet email."
          : "If any point worries you, just reply to this email.",
        "",
        "Walid",
      ].join("\n"),
      replyTo: process.env.CONTACT_TO ?? site.email,
    });
  }

  return json({ ok: true, download });
}
