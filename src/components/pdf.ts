// Tiny wrapper around jsPDF that gives the tool islands a consistent,
// paginated writer with the SteadyFocusCo look. jsPDF is imported
// dynamically so it only loads in the browser when a download is requested.

export interface Writer {
  heading: (text: string) => void;
  subheading: (text: string) => void;
  line: (
    text: string,
    opts?: { indent?: number; muted?: boolean; bullet?: boolean },
  ) => void;
  space: (n?: number) => void;
  save: (filename: string) => void;
}

const INK: [number, number, number] = [43, 46, 40];
const INK_SOFT: [number, number, number] = [92, 98, 89];
const PRIMARY_DARK: [number, number, number] = [55, 73, 61];
const BORDER: [number, number, number] = [227, 223, 211];

export async function createWriter(
  title: string,
  subtitle?: string,
): Promise<Writer> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const maxW = pageW - margin * 2;
  let y = margin;

  const ensure = (needed: number) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...INK);
  doc.text(title, margin, y);
  y += 26;

  if (subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...INK_SOFT);
    doc.text(subtitle, margin, y);
    y += 18;
  }

  doc.setDrawColor(...BORDER);
  doc.line(margin, y, pageW - margin, y);
  y += 20;

  return {
    heading(text) {
      ensure(30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...PRIMARY_DARK);
      doc.text(text, margin, y);
      y += 20;
    },
    subheading(text) {
      ensure(24);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...INK);
      doc.text(text, margin, y);
      y += 16;
    },
    line(text, opts = {}) {
      const indent = opts.indent ?? 0;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(...(opts.muted ? INK_SOFT : INK));
      const prefix = opts.bullet ? "•  " : "";
      const wrapped: string[] = doc.splitTextToSize(
        prefix + text,
        maxW - indent,
      );
      for (const row of wrapped) {
        ensure(16);
        doc.text(row, margin + indent, y);
        y += 15;
      }
    },
    space(n = 10) {
      y += n;
    },
    save(filename) {
      doc.save(filename);
    },
  };
}

/** Human-friendly current date, e.g. "Sunday, 9 August 2026". */
export function today(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
