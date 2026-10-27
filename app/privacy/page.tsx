import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How walid.ghouili.com handles your data: no tracking cookies, and the only personal data processed is what you send through a form, by email or via Calendly.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const updated = "October 2026";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
          <Container className="max-w-[760px]">
            <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
              Legal
            </span>
            <h1 className="text-ink mb-4 text-[clamp(32px,4.5vw,48px)] leading-[1.05] font-semibold tracking-[-0.035em]">
              Privacy
            </h1>
            <p className="text-faint mb-12 font-mono text-xs tracking-[0.02em]">
              Last updated: {updated}
            </p>

            <div className="flex flex-col gap-8">
              <Block title="The short version">
                This is a personal portfolio site. It sets no advertising or
                analytics cookies and does not track you. The only personal data
                I process is what you deliberately send me, through a form, by
                email or when you book a call.
              </Block>

              <Block title="What this site collects">
                Nothing automatically. There are no analytics scripts, no
                tracking pixels, and no first-party cookies. Browsing the site
                leaves no profile of you with me. Your browser may remember that
                you dismissed the checklist banner (local storage, never sent to
                me).
              </Block>

              <Block title="Contact and checklist forms">
                When you submit the contact form or the checklist form, what you
                typed (name, email, company, project details) and the campaign
                parameters in the page address, if any, are sent to me as an
                email through{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-accent underline decoration-1 underline-offset-2 transition-colors"
                >
                  Resend
                </a>
                , an email delivery service. The site itself stores nothing.
                Resend keeps delivery logs under its own policy. I use the
                details only to reply to you or send the checklist you asked
                for.
              </Block>

              <Block title="When you email me">
                If you email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink hover:text-accent underline decoration-1 underline-offset-2 transition-colors"
                >
                  {site.email}
                </a>
                , I receive whatever you put in that message — your name,
                address, and anything you describe about your project. I use it
                only to reply and, if we work together, to deliver the
                engagement. I don&apos;t sell it or share it with anyone.
              </Block>

              <Block title="Booking a call (Calendly)">
                The &ldquo;Book a call&rdquo; buttons open{" "}
                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-accent underline decoration-1 underline-offset-2 transition-colors"
                >
                  Calendly
                </a>
                , a third-party scheduling service. When you open it, Calendly
                processes the details you enter (name, email, time slot) and may
                set its own cookies under{" "}
                <a
                  href="https://calendly.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-accent underline decoration-1 underline-offset-2 transition-colors"
                >
                  its own privacy policy
                </a>
                . I only receive the booking details you submit.
              </Block>

              <Block title="Hosting">
                The site runs on a private server that keeps standard web server
                logs (such as IP address and request time) for security and
                operations, for a limited time. Your IP address is also used, in
                memory only, to rate-limit the forms against spam. EU-resident
                hosting is available for client projects on request.
              </Block>

              <Block title="Your rights">
                Under the GDPR you can ask to access, correct, or delete any
                personal data I hold about you, or object to its use. Email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink hover:text-accent underline decoration-1 underline-offset-2 transition-colors"
                >
                  {site.email}
                </a>{" "}
                and I&apos;ll handle it promptly.
              </Block>

              <Block title="Changes">
                If this site starts collecting anything new, I&apos;ll update
                this page and the date above before doing so.
              </Block>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-ink mb-2 text-[19px] font-semibold tracking-[-0.02em]">
        {title}
      </h2>
      <p className="text-dim text-[16px] leading-[1.65] tracking-[-0.005em] break-words">
        {children}
      </p>
    </div>
  );
}
