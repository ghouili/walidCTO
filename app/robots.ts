import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Allow classic search + AI retrieval/grounding crawlers — we want to be found
 * and *cited* by ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews.
 *
 * IMPORTANT: this only takes effect if Cloudflare "Managed robots.txt" is
 * DISABLED in the Cloudflare dashboard (Bots → Settings). Otherwise Cloudflare
 * serves its own robots.txt and overrides this file.
 */
const aiBots = [
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot", // Anthropic retrieval
  "Claude-User",
  "anthropic-ai",
  "Google-Extended", // Gemini grounding / AI Overviews
  "CCBot", // Common Crawl
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    host: site.url,
    sitemap: `${site.url}/sitemap.xml`,
  };
}
