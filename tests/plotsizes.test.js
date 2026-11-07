import { describe, it, expect } from "vitest";
import { convert, formatResult, plotSizeSummary } from "../lib/convert.js";
import { MARLA_STANDARDS } from "../lib/units.js";
import { PAGES } from "../lib/pages.js";

describe("plot sizes", () => {
  it("5 marla = 1,361.25 / 1,250 / 1,125 sq ft for the three standards", () => {
    const sq = (marlaSize) => formatResult(convert(5, "marla", "sq-ft", "area", { marlaSize }));
    expect(sq(MARLA_STANDARDS.revenue)).toBe("1,361.25");
    expect(sq(MARLA_STANDARDS.scheme)).toBe("1,250");
    expect(sq(MARLA_STANDARDS.urban)).toBe("1,125");
  });

  it("1 kanal = 5,445 sq ft (revenue)", () => {
    expect(formatResult(convert(1, "kanal", "sq-ft", "area", { marlaSize: MARLA_STANDARDS.revenue }))).toBe("5,445");
  });

  it("10 marla = 302.5 sq yd (revenue)", () => {
    expect(formatResult(convert(10, "marla", "sq-yd", "area", { marlaSize: MARLA_STANDARDS.revenue }))).toBe("302.5");
  });

  it("plotSizeSummary (used by PlotSizeAnswer) matches the engine", () => {
    const s = plotSizeSummary(5, "marla");
    expect(formatResult(s.sqFt.revenue)).toBe("1,361.25");
    expect(formatResult(s.sqFt.scheme)).toBe("1,250");
    expect(formatResult(s.sqFt.urban)).toBe("1,125");
    expect(formatResult(plotSizeSummary(10, "marla").sqYd)).toBe("302.5");
    expect(formatResult(plotSizeSummary(1, "kanal").sqFt.revenue)).toBe("5,445");
  });
});

describe("plot size page data", () => {
  const plotPages = PAGES.filter((p) => p.tool === "plot-size");

  it("there are 10 plot size pages, each with a size and 4 FAQs", () => {
    expect(plotPages.length).toBe(10);
    for (const p of plotPages) {
      expect(typeof p.size, p.slug).toBe("number");
      expect(p.faqs.length, p.slug).toBe(4);
    }
  });

  it("FAQ questions are different on every page, even with numbers removed", () => {
    // "How many square yards is 7 marla?" and "... is 10 marla?" count as the same.
    const normalise = (q) =>
      q.toLowerCase().replace(/[\d,.]+/g, "#").replace(/\b(marla|kanal)\b/g, "U");
    const seen = new Map();
    for (const p of plotPages) {
      for (const f of p.faqs) {
        const key = normalise(f.question);
        expect(seen.get(key), `"${f.question}" (${p.slug}) repeats ${seen.get(key)}`).toBeUndefined();
        seen.set(key, p.slug);
      }
    }
  });
});
