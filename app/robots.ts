import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Allow classic search + AI training, retrieval and grounding crawlers: we
 * want to be found and *cited* by ChatGPT, Claude, Perplexity, Gemini, Apple
 * Intelligence and Google AI Overviews. /lp/ (Ads-only, noindex) and /api/
 * are off limits for everyone.
 *
 * IMPORTANT: this only takes effect if Cloudflare "Managed robots.txt" is
 * DISABLED in the Cloudflare dashboard (Bots → Settings). Otherwise Cloudflare
 * serves its own robots.txt and overrides this file.
 */
const aiBots = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User",
  "ClaudeBot", // Anthropic
  "Claude-Web",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini grounding / AI Overviews
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl
];

const disallow = ["/lp/", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    host: site.url,
    sitemap: `${site.url}/sitemap.xml`,
  };
}
