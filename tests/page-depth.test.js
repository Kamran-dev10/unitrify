import { describe, it, expect } from "vitest";
import { PAGES, pageUrl, relatedSlugsFor, getPageBySlug } from "../lib/pages.js";
import { NUMBER_PAGES } from "../lib/tools.js";
import { CATEGORIES } from "../lib/categories.js";
import { CONVERTER_GROUPS } from "../lib/groups.js";
import { DEPTH_PATHS } from "../lib/page-depth.js";
import { siteEntries } from "../lib/site-urls.js";

const DAY = "2026-11-20";

describe("indexing fix: deeper content on thin pages", () => {
  it("every improved pair page has usage, 3 examples, a practical table and 3-4 FAQs", () => {
    expect(DEPTH_PATHS.pairs.length).toBeGreaterThanOrEqual(25);
    for (const path of DEPTH_PATHS.pairs) {
      const p = PAGES.find((x) => pageUrl(x) === path);
      expect(p, path).toBeTruthy();
      expect(p.usage.split(/[.!?](\s|$)/).filter((s) => s.trim().length > 1).length, `${path} usage sentences`).toBeGreaterThanOrEqual(2);
      expect(p.examples, path).toHaveLength(3);
      expect(p.tableRowSet.length, path).toBeGreaterThanOrEqual(10);
      // Not just 1-10: at least one value outside 1..10 or a fraction.
      expect(p.tableRowSet.some((v) => v > 10 || !Number.isInteger(v)), path).toBe(true);
      expect(p.faqs.length, path).toBeGreaterThanOrEqual(3);
      expect(p.faqs.length, path).toBeLessThanOrEqual(5);
      expect(p.updated, path).toBe(DAY);
      for (const text of [p.usage, ...p.examples, ...p.faqs.flatMap((f) => [f.question, f.answer])]) {
        expect(text, path).not.toMatch(/NaN|undefined|Infinity|null/);
      }
    }
  });

  it("number pages have a step-by-step method and worked examples", () => {
    for (const path of DEPTH_PATHS.numbers) {
      const p = NUMBER_PAGES.find((x) => `/number-converter/${x.slug}` === path);
      expect(p.usage, path).toBeTruthy();
      expect(p.steps.length, path).toBeGreaterThanOrEqual(3);
      expect(p.worked, path).toHaveLength(3);
      expect(p.faqs.length, path).toBe(4);
    }
    // The worked examples add up (numbers come from the converter).
    const hex = NUMBER_PAGES.find((x) => x.slug === "hex-to-decimal");
    expect(hex.worked.join(" ")).toContain("1A3 = 1 × 256 + 10 × 16 + 3 = 419");
  });

  it("improved category pages explain the quantity and name the SI unit", () => {
    for (const id of DEPTH_PATHS.categories) {
      const c = CATEGORIES.find((x) => x.id === id);
      expect(c, id).toBeTruthy();
      expect(c.about.join(" "), id).toMatch(/SI unit/);
      expect(c.updated, id).toBe(DAY);
    }
  });

  it("sitemap dates change only for pages whose content changed", () => {
    // Other pages whose content changed that day: kcal/h factor, killa FAQ and note, privacy policy.
    const OTHER = ["/power", "/zameen", "/zameen/acre-to-marla", "/privacy-policy"];
    const changed = new Set([...DEPTH_PATHS.pairs, ...DEPTH_PATHS.numbers, ...DEPTH_PATHS.categories.map((id) => `/${id}`), ...OTHER]);
    for (const e of siteEntries()) {
      if (changed.has(e.path)) expect(e.lastModified, e.path).toBe(DAY);
      else expect(e.lastModified, e.path).not.toBe(DAY);
    }
  });
});

describe("internal links", () => {
  it("every pair page links to 5 related pairs (or every pair in its group, if fewer)", async () => {
    const { getUnitCategory } = await import("../lib/categories/index.js");
    const groupOf = (p) => getUnitCategory(p.unitCategory)?.group;
    for (const p of PAGES) {
      if (p.tool === "plot-size") continue;
      const pairs = relatedSlugsFor(p).filter((r) => !r.startsWith("/"));
      const available = PAGES.filter((q) => q !== p && q.tool !== "plot-size" && groupOf(q) === groupOf(p)).length;
      expect(pairs.length, p.slug).toBe(Math.min(5, Math.max(available, p.related.filter((r) => !r.startsWith("/")).length)));
      expect(new Set(pairs).size, p.slug).toBe(pairs.length);
      expect(pairs, p.slug).not.toContain(p.slug);
      for (const s of pairs) expect(getPageBySlug(s), `${p.slug} -> ${s}`).toBeTruthy();
    }
  });

  it("every category page is linked from its group page", () => {
    const linked = new Set(CONVERTER_GROUPS.flatMap((g) => g.items.map((i) => i.href)));
    for (const c of CATEGORIES) expect(linked.has(`/${c.id}`), c.id).toBe(true);
  });
});

describe("REVIEW.md decisions", async () => {
  const { convert, getUnits } = await import("../lib/convert.js");
  it("maund stays 40 kg", () => expect(convert(1, "maund", "kg", "weight")).toBe(40));
  it("kcal/h is the International Table kilocalorie: 1.163 W", () => {
    expect(convert(1, "kcal-h", "w", "power")).toBeCloseTo(1.163, 12);
    expect(getUnits("power").find((u) => u.id === "kcal-h").name).toBe("Kilocalorie (IT) per hour");
  });
  it("killa is an alias of the acre in zameen, with a note", () => {
    const acre = getUnits("zameen").find((u) => u.id === "acre");
    expect(acre.aliases).toContain("killa");
    expect(acre.note).toBe("Killa: used as 1 acre in Punjab");
    const faq = getPageBySlug("acre-to-marla").faqs.find((f) => /killa/.test(f.question));
    expect(faq.answer).toMatch(/160 marla \(272\.25 sq ft marla\)/);
  });
  it("no visible 'litre' spelling in page text", () => {
    const visible = JSON.stringify(
      [...PAGES.map((p) => [p.title, p.metaDescription, p.h1, p.intro, p.faqs, p.examples, p.usage]), ...CATEGORIES.map((c) => [c.title, c.metaDescription, c.h1, c.intro, c.faqs, c.about])],
    );
    expect(visible).not.toMatch(/litre|millilitre/i);
  });
});
