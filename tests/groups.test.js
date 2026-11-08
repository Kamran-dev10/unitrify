import { describe, it, expect } from "vitest";
import { CONVERTER_GROUPS, ALL_CONVERTERS_PAGE, groupCrumbFor, menuGroups } from "../lib/groups.js";
import { CATEGORIES } from "../lib/categories.js";
import { TOOLS } from "../lib/tools.js";
import { PAGES } from "../lib/pages.js";
import { buildTitle, MAX_TITLE_LENGTH } from "../lib/seo.js";
import { buildSearchIndex } from "../lib/search.js";
import { searchPages } from "../lib/search-match.js";

describe("converter groups", () => {
  const items = CONVERTER_GROUPS.flatMap((g) => g.items);

  it("every category and tool is in exactly one group", () => {
    const ids = items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const c of CATEGORIES) expect(ids, c.id).toContain(c.id);
    for (const t of TOOLS) expect(ids, t.id).toContain(t.id);
  });

  it("every pair page is listed on /converters", () => {
    const listed = new Set(items.flatMap((i) => i.pages.map((p) => p.href)));
    for (const p of PAGES) expect(listed.has(`/${p.category}/${p.slug}`), p.slug).toBe(true);
  });

  it("group pages have a title under 60, an h1, an intro, and 2-3 popular pages per card", () => {
    for (const g of [...CONVERTER_GROUPS, ALL_CONVERTERS_PAGE]) {
      expect(buildTitle(g.title).length, g.path).toBeLessThan(MAX_TITLE_LENGTH);
    }
    for (const g of CONVERTER_GROUPS) {
      expect(g.h1 && g.intro, g.id).toBeTruthy();
      for (const i of g.items) {
        if (i.pages.length === 0) continue;
        expect(i.popular.length, i.id).toBeGreaterThanOrEqual(Math.min(2, i.pages.length));
        expect(i.popular.length, i.id).toBeLessThanOrEqual(3);
      }
    }
  });

  it("breadcrumbs include the group", () => {
    expect(groupCrumbFor("torque")).toEqual({ name: "Engineering", path: "/converters/engineering" });
    expect(groupCrumbFor("currency-converter").path).toBe("/converters/common");
    expect(groupCrumbFor("zameen").path).toBe("/converters/land");
  });

  it("the menu has every group and only names and links", () => {
    const menu = menuGroups();
    expect(menu.map((g) => g.id)).toEqual(CONVERTER_GROUPS.map((g) => g.id));
    for (const g of menu) for (const i of g.items) expect(Object.keys(i).sort()).toEqual(["href", "id", "name"]);
  });
});

describe("search index (served as /search-index.json)", () => {
  it("covers 250+ pages and still finds kg to lbs first", () => {
    const index = buildSearchIndex();
    expect(index.length).toBeGreaterThanOrEqual(250);
    expect(searchPages(index, "kg to lbs")[0].url).toBe("/weight/kg-to-lbs");
  });
});
