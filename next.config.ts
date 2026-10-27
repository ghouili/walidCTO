import type { NextConfig } from "next";

/**
 * Security headers are set here so they apply with or without nginx in
 * front. When nginx is present (deploy/nginx/walid.ghouili.com.conf) it hides
 * these upstream copies and sends its own, so browsers never see duplicates.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Next 15 streams generateMetadata output into <body> unless the user
  // agent is a known HTML-limited bot, and prerendered pages are built once
  // for everyone. Treat every agent as limited so <title>, description,
  // canonical and hreflang always ship in <head>, where all crawlers, link
  // unfurlers and AI fetchers look for them.
  htmlLimitedBots: /.*/,

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Static files from /public: images, PDFs, icons.
        source: "/:file(.+\\.(?:png|jpg|jpeg|webp|avif|svg|ico|pdf))",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
      {
        // The checklist PDF is a lead magnet, keep it out of search results.
        source: "/downloads/:file*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/lp/:slug*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  async redirects() {
    // No slug has ever been renamed (checked git history). These catch the
    // URLs people and old links are most likely to guess or have saved.
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/fr/services", destination: "/fr#services", permanent: true },
      { source: "/fr/work", destination: "/fr#work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/fr/contact", destination: "/fr#contact", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      {
        source: "/case-studies/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
      {
        source: "/work/simplify-for-kids",
        destination: "/work/simplify-kids",
        permanent: true,
      },
      { source: "/work/guid-up", destination: "/work/guidup", permanent: true },
      {
        source: "/services/fractional-cto-services",
        destination: "/services/fractional-cto",
        permanent: true,
      },
      {
        source: "/services/audit",
        destination: "/services/technical-audit",
        permanent: true,
      },
      {
        source: "/services/mvp",
        destination: "/services/mvp-development",
        permanent: true,
      },
      {
        source: "/due-diligence-checklist",
        destination: "/checklist",
        permanent: true,
      },
      {
        source: "/fr/cto-temps-partage",
        destination: "/fr/services/fractional-cto",
        permanent: true,
      },
      {
        source: "/fr/audit-technique",
        destination: "/fr/services/technical-audit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
