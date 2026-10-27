import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ChecklistPage } from "@/components/ChecklistPage";

export const metadata: Metadata = {
  title: { absolute: "Technical due diligence checklist (free PDF)" },
  description:
    "Technical due diligence checklist: the 25 things investors check before a seed round, from architecture and security to GDPR, infra and tests. Free PDF.",
  alternates: { canonical: "/checklist" },
};

export default function Checklist() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <ChecklistPage locale="en" />
      </main>
      <Footer />
    </>
  );
}
