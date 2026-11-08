import { PAGES, pageUrl } from "./pages.js";
import { CATEGORIES, getCategory } from "./categories.js";
import { TOOLS, TOOL_PAGES, getTool, toolPageUrl } from "./tools.js";
import { getUnits } from "./convert.js";

// A small search index: only what the search box needs, so the browser
// does not download all the page text. Pair pages first, then one entry
// per category page (/length, /pressure, ...) with all its unit names.
export function buildSearchIndex() {
  return [...pageEntries(), ...toolEntries(), ...categoryEntries()];
}

// Tools (case, number, currency) and their pair pages.
function toolEntries() {
  const kw = (k) => (k ? [k.primary, ...k.secondary] : []);
  const tools = TOOLS.map((t) => ({
    url: `/${t.id}`,
    label: t.h1,
    section: "Tools",
    slugWords: t.id.replace(/-/g, " "),
    text: [t.h1, t.title, t.id.replace(/-/g, " "), ...kw(t.keywords)].join(" ").toLowerCase(),
  }));
  const pairs = TOOL_PAGES.map((p) => ({
    url: toolPageUrl(p),
    label: p.h1,
    section: getTool(p.tool)?.name ?? "Tools",
    slugWords: p.slug.replace(/-/g, " "),
    text: [p.h1, p.title, p.slug.replace(/-/g, " "), ...kw(p.keywords)].join(" ").toLowerCase(),
  }));
  return [...pairs, ...tools];
}

function categoryEntries() {
  return CATEGORIES.map((c) => {
    const slugWords = c.id.replace(/-/g, " ");
    const unitWords = getUnits(c.id).flatMap((u) => [u.name, u.symbol, ...(u.aliases ?? [])]);
    return {
      url: `/${c.id}`,
      label: c.h1,
      section: "All units",
      type: "category",
      slugWords,
      text: [c.h1, c.name, c.title, slugWords, ...(c.searchAliases ?? []), ...unitWords].join(" ").toLowerCase(),
    };
  });
}

function pageEntries() {
  return PAGES.map((p) => {
    const units = getUnits(p.unitCategory);
    const unitWords = [p.from, p.to, ...(p.alsoShow ?? [])]
      .map((id) => units.find((u) => u.id === id))
      .filter(Boolean)
      .flatMap((u) => [u.name, u.symbol, ...(u.aliases ?? [])]);
    const kw = p.keywords ? [p.keywords.primary, ...p.keywords.secondary] : [];
    const words = [p.h1, p.title, p.slug.replace(/-/g, " "), getCategory(p.category)?.name, ...unitWords, ...kw];
    return {
      url: pageUrl(p),
      label: p.h1,
      section: getCategory(p.category)?.name ?? "",
      slugWords: p.slug.replace(/-/g, " "),
      text: words.join(" ").toLowerCase(),
    };
  });
}

export { searchPages } from "./search-match.js";
