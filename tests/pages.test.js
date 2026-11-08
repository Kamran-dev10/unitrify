// Safety checks on lib/pages.js, so a typo in page data is caught early.
import { describe, it, expect } from "vitest";
import { PAGES, getPageBySlug } from "../lib/pages.js";
import { getUnits } from "../lib/convert.js";
import { getUnitCategory } from "../lib/categories/index.js";

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

  // Rule: related links come from the same category first; if it has fewer
  // than 3 other pages, from the same group; if still not enough, the
  // category page itself ("/<category>"). Never an unrelated category.
  // (Replaces the old "always 3 related pages" check: temperature has only
  // 2 pages and is alone in its group, so it gets reverse + category page.)
  it("related links follow the category -> group -> category page rule", () => {
    const groupOf = (p) => getUnitCategory(p.unitCategory)?.group;
    for (const p of PAGES) {
      const sameCat = PAGES.filter((q) => q !== p && q.category === p.category);
      const sameGroup = PAGES.filter((q) => q.category !== p.category && groupOf(q) === groupOf(p));
      const rel = p.related ?? [];
      expect(new Set(rel).size, `${p.slug}: duplicate related`).toBe(rel.length);

      let catLinks = 0, groupLinks = 0, categoryPage = 0;
      for (const r of rel) {
        if (r === `/${p.category}`) { categoryPage++; continue; }
        const q = getPageBySlug(r);
        expect(q, `${p.slug} -> ${r} does not exist`).not.toBeNull();
        if (q.category === p.category) catLinks++;
        else if (groupOf(q) === groupOf(p)) groupLinks++;
        else throw new Error(`${p.slug} -> ${r}: unrelated category`);
      }
      const expected = Math.min(3, sameCat.length + sameGroup.length + 1);
      expect(rel.length, `${p.slug}: related count`).toBe(expected);
      expect(catLinks, `${p.slug}: use same-category pages first`).toBe(Math.min(3, sameCat.length));
      if (categoryPage > 0) expect(sameGroup.length, `${p.slug}: group pages available`).toBe(0);
    }
  });
});
