// Safety checks on lib/pages.js, so a typo in page data is caught early.
import { describe, it, expect } from "vitest";
import { PAGES, getPageBySlug } from "../lib/pages.js";
import { getUnits } from "../lib/convert.js";

describe("page data", () => {
  it("every slug is unique", () => {
    const slugs = PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every title is unique and under 60 characters", () => {
    const titles = PAGES.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const t of titles) expect(t.length, t).toBeLessThan(60);
  });

  it("every page has a valid country", () => {
    for (const p of PAGES) expect(["pk", "global"], p.slug).toContain(p.country);
  });

  it("every from/to is a real unit id", () => {
    for (const p of PAGES) {
      if (p.tool === "plot") continue;
      const ids = getUnits(p.unitCategory).map((u) => u.id);
      expect(ids, `${p.slug} from`).toContain(p.from);
      expect(ids, `${p.slug} to`).toContain(p.to);
      for (const extra of p.alsoShow ?? []) expect(ids, `${p.slug} alsoShow`).toContain(extra);
    }
  });

  it("every page links to 3 related pages that exist", () => {
    for (const p of PAGES) {
      expect(p.related?.length, p.slug).toBe(3);
      for (const slug of p.related) expect(getPageBySlug(slug), `${p.slug} -> ${slug}`).not.toBeNull();
    }
  });
});
