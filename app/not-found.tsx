import Link from "next/link";
import "./globals.css";

/**
 * Last-resort 404 for URLs that never reach a locale (the pass-through root
 * layout renders no <html>, so this page brings its own). Pages under
 * app/[locale] use app/[locale]/not-found.tsx instead.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-ink text-[32px] font-semibold tracking-[-0.03em]">
            Page not found
          </h1>
          <Link href="/" className="text-accent font-medium no-underline">
            Back to the home page →
          </Link>
        </main>
      </body>
    </html>
  );
}
