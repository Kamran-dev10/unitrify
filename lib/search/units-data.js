// Server only: the compact unit data the search box needs to answer
// queries like "100 cm to m". Served as /search-units.json and loaded only
// when the search box is first focused (together with /search-index.json).
import { UNIT_CATEGORIES, getCategoryUnits } from "../categories/index.js";
import { CATEGORIES } from "../categories.js";
import { PAGES, pageUrl } from "../pages.js";
import { CURRENCY_PAGES } from "../tools.js";
import { MARLA_STANDARDS } from "../marla.js";

const MARLA_SIZES = [MARLA_STANDARDS.revenue, MARLA_STANDARDS.scheme, MARLA_STANDARDS.urban];

export function buildSearchUnits() {
  const withPage = new Set(CATEGORIES.map((c) => c.id));
  const units = [];
  for (const c of UNIT_CATEGORIES) {
    if (!withPage.has(c.id)) continue;
    const base = getCategoryUnits(c.id);
    // Land units whose size depends on the marla standard get one factor per standard.
    const bySize = c.hasMarlaStandard ? MARLA_SIZES.map((size) => getCategoryUnits(c.id, { marlaSize: size })) : null;
    base.forEach((u, i) => {
      const entry = {
        id: u.id,
        category: c.id,
        name: u.name,
        symbol: u.symbol,
        aliases: u.aliases ?? [],
        kind: u.kind,
        factor: u.factor,
        offset: u.offset,
      };
      if (bySize && bySize.some((list) => list[i].factor !== u.factor)) {
        entry.marlaFactors = Object.fromEntries(MARLA_SIZES.map((size, s) => [String(size), bySize[s][i].factor]));
      }
      units.push(entry);
    });
  }
  return {
    units,
    categories: CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      h1: c.h1,
      href: `/${c.id}`,
      allowNegative: Boolean(c.allowNegative),
    })),
    pairs: PAGES.filter((p) => !p.tool).map((p) => ({ category: p.unitCategory, from: p.from, to: p.to, h1: p.h1, href: pageUrl(p) })),
    currencyPairs: CURRENCY_PAGES.map((p) => ({ from: p.from, to: p.to, href: `/currency-converter/${p.slug}` })),
    marlaSizes: MARLA_SIZES,
  };
}
