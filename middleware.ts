import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing (hand-rolled, see lib/i18n.ts). Every page lives under
 * app/[locale]. English is served unprefixed: "/work/x" is rewritten to
 * "/en/work/x" internally, and a visible "/en/..." URL redirects to the
 * unprefixed one so each page has exactly one public address. French lives
 * under "/fr". French landing pages keep their French slugs at "/lp/<slug>"
 * without the prefix, so they are rewritten to the fr locale here.
 */

// Keep in sync with the `locale: "fr"` entries in lib/landing-pages.ts.
const FR_LANDING_PAGES = new Set(["audit-technique", "cto-a-temps-partage"]);

/** Request header carrying the resolved locale (read by not-found.tsx). */
const LOCALE_HEADER = "x-wg-locale";

function withLocale(req: NextRequest, locale: string) {
  const headers = new Headers(req.headers);
  headers.set(LOCALE_HEADER, locale);
  return { request: { headers } };
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return NextResponse.next(withLocale(req, "fr"));
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    // Metadata image routes are generated with the internal /en prefix.
    if (/\/(opengraph|twitter)-image/.test(pathname)) {
      return NextResponse.next();
    }
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = req.nextUrl.clone();
  const lp = pathname.match(/^\/lp\/([^/]+)\/?$/);
  const locale = lp && FR_LANDING_PAGES.has(lp[1]) ? "fr" : "en";
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, withLocale(req, locale));
}

export const config = {
  // Skip API routes, Next internals and anything with a file extension
  // (robots.txt, sitemap.xml, feed.xml, llms.txt, images, PDFs).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
