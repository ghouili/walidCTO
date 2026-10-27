/**
 * Client testimonials rendered by components/Testimonials.tsx (home, between
 * Work and About, and on every /lp/* page).
 *
 * TODO(testimonials): every entry below is a placeholder. Replace each
 * {{...}} token with the real quote, name, role/company and LinkedIn URL once
 * the client has approved it in writing. Entries that still contain "{{" in
 * any field are hidden automatically, so the section stays invisible until at
 * least one is real. Never write a quote the client didn't give you.
 */

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Founder, Facturra". */
  roleCompany: string;
  linkedinUrl: string;
};

export const testimonials: Testimonial[] = [
  // TODO(testimonials): ask Facturra.
  {
    quote: "{{QUOTE}}",
    name: "{{NAME}}",
    roleCompany: "{{ROLE_COMPANY}}",
    linkedinUrl: "{{LINKEDIN_URL}}",
  },
  // TODO(testimonials): ask Débarras Aurea.
  {
    quote: "{{QUOTE}}",
    name: "{{NAME}}",
    roleCompany: "{{ROLE_COMPANY}}",
    linkedinUrl: "{{LINKEDIN_URL}}",
  },
  // TODO(testimonials): ask Fresh Tenancy.
  {
    quote: "{{QUOTE}}",
    name: "{{NAME}}",
    roleCompany: "{{ROLE_COMPANY}}",
    linkedinUrl: "{{LINKEDIN_URL}}",
  },
  // TODO(testimonials): ask Zorro Services.
  {
    quote: "{{QUOTE}}",
    name: "{{NAME}}",
    roleCompany: "{{ROLE_COMPANY}}",
    linkedinUrl: "{{LINKEDIN_URL}}",
  },
  // TODO(testimonials): ask Guid'Up.
  {
    quote: "{{QUOTE}}",
    name: "{{NAME}}",
    roleCompany: "{{ROLE_COMPANY}}",
    linkedinUrl: "{{LINKEDIN_URL}}",
  },
];

function isFilled(t: Testimonial): boolean {
  return !Object.values(t).some((v) => v.includes("{{"));
}

/** Testimonials with every placeholder replaced. */
export const visibleTestimonials = testimonials.filter(isFilled);
