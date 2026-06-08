import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

const linkClass =
  "text-faint no-underline transition-colors duration-150 hover:text-ink";

/** Site footer with copyright and social links. */
export function Footer() {
  return (
    <footer className="border-border border-t py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="text-faint text-[13px] tracking-[-0.005em]">
            © 2026 {site.name} · {site.location.city}, {site.location.country}
          </div>
          <div className="flex flex-wrap gap-6 text-[13px] tracking-[-0.005em]">
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              GitHub
            </a>
            <a
              href={site.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {site.company.name} ↗
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
