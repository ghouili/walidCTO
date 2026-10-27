/**
 * Builds the due-diligence checklist PDFs (EN + FR) from lib/checklist.ts
 * into public/downloads/. Runs in `prebuild` and `predev`, so the files are
 * generated, not committed.
 */

import { createWriteStream, mkdirSync } from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { checklistPdf, checklists } from "@/lib/checklist";
import { locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const INK = "#0a0a0a";
const DIM = "#525252";
const FAINT = "#a1a1aa";
const ACCENT = "#5b5bd6";
const RED = "#b91c1c";
const MARGIN = 56;

function build(locale: Locale): Promise<string> {
  const c = checklists[locale];
  const out = path.join(process.cwd(), "public", checklistPdf[locale]);
  mkdirSync(path.dirname(out), { recursive: true });

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    info: {
      Title: `${c.title}: ${c.subtitle}`,
      Author: site.name,
      Subject: c.subtitle,
    },
    bufferPages: true,
  });
  const stream = createWriteStream(out);
  doc.pipe(stream);

  const width = doc.page.width - MARGIN * 2;
  // French typography puts a space before the colon.
  const sep = locale === "fr" ? " : " : ": ";

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(ACCENT)
    .text(site.name.toUpperCase(), { characterSpacing: 1.5 });
  doc.moveDown(0.8);
  doc.font("Helvetica-Bold").fontSize(24).fillColor(INK).text(c.title);
  doc.font("Helvetica").fontSize(14).fillColor(DIM).text(c.subtitle);
  doc.moveDown(1);
  doc.fontSize(10.5).fillColor(DIM).text(c.intro, { lineGap: 2.5 });
  doc.moveDown(1.2);

  let n = 0;
  for (const section of c.sections) {
    if (doc.y > doc.page.height - MARGIN - 120) doc.addPage();
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(ACCENT)
      .text(section.title.toUpperCase(), MARGIN, doc.y, {
        width,
        characterSpacing: 1.2,
      });
    doc.moveDown(0.5);

    for (const item of section.items) {
      n += 1;
      if (doc.y > doc.page.height - MARGIN - 90) doc.addPage();
      const top = doc.y;
      // Tick box.
      doc
        .lineWidth(1)
        .strokeColor(FAINT)
        .rect(MARGIN, top + 1, 10, 10)
        .stroke();
      const x = MARGIN + 20;
      const w = width - 20;
      doc
        .font("Helvetica-Bold")
        .fontSize(11.5)
        .fillColor(INK)
        .text(`${String(n).padStart(2, "0")}  ${item.title}`, x, top, {
          width: w,
        });
      doc.moveDown(0.25);
      doc
        .font("Helvetica-Bold")
        .fontSize(9.5)
        .fillColor(INK)
        .text(`${c.checkLabel}${sep}`, x, doc.y, { width: w, continued: true })
        .font("Helvetica")
        .fillColor(DIM)
        .text(item.check, { lineGap: 1.5 });
      doc.moveDown(0.15);
      doc
        .font("Helvetica-Bold")
        .fontSize(9.5)
        .fillColor(RED)
        .text(`${c.redFlagLabel}${sep}`, x, doc.y, {
          width: w,
          continued: true,
        })
        .font("Helvetica")
        .fillColor(DIM)
        .text(item.redFlag, { lineGap: 1.5 });
      doc.moveDown(0.9);
    }
    doc.moveDown(0.4);
  }

  if (doc.y > doc.page.height - MARGIN - 110) doc.addPage();
  doc.moveDown(0.5);
  doc
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor(INK)
    .text(c.outro, MARGIN, doc.y, { width, lineGap: 2.5 });
  doc.moveDown(0.8);
  const audit = `${site.url}${locale === "fr" ? "/fr" : ""}/services/technical-audit`;
  doc.fillColor(ACCENT).text(audit, { link: audit, underline: true });
  doc
    .fillColor(DIM)
    .text(`${site.email} · ${site.bookingUrl}`, { link: site.bookingUrl });

  // Footer on every page.
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    // Writing inside the bottom margin would otherwise trigger a page break.
    doc.page.margins.bottom = 0;
    const y = doc.page.height - MARGIN + 18;
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(FAINT)
      .text(
        `${site.name} · ${site.url.replace(/^https?:\/\//, "")}`,
        MARGIN,
        y,
        { width, lineBreak: false },
      )
      .text(`${i + 1} / ${range.count}`, MARGIN, y, {
        width,
        align: "right",
        lineBreak: false,
      });
  }

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(out));
    stream.on("error", reject);
  });
}

async function main() {
  for (const locale of locales) {
    const out = await build(locale);
    console.log(`[checklist-pdf] ${path.relative(process.cwd(), out)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
