import { PAGES, pageUrl } from "./pages.js";
import { getCategory } from "./categories.js";
import { getUnits } from "./convert.js";

// A small search index: only what the search box needs, so the browser
// does not download all the page text.
export function buildSearchIndex() {
  return PAGES.map((p) => {
    const units = getUnits(p.unitCategory);
    const unitWords = [p.from, p.to, ...(p.alsoShow ?? [])]
      .map((id) => units.find((u) => u.id === id))
      .filter(Boolean)
      .flatMap((u) => [u.name, u.symbol]);
    const words = [p.h1, p.title, p.slug.replace(/-/g, " "), getCategory(p.category)?.name, ...unitWords];
    return {
      url: pageUrl(p),
      label: p.h1,
      section: getCategory(p.category)?.name ?? "",
      slugWords: p.slug.replace(/-/g, " "),
      text: words.join(" ").toLowerCase(),
    };
  });
}

// Every word typed must appear somewhere in the page's search text.
// Best first: the URL starts with what was typed ("kg to lbs"), then
// pages whose URL or label starts with the first word, then the rest.
export function searchPages(index, query, limit = 8) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const phrase = words.join(" ");
  const rank = (item) => {
    if (item.slugWords.startsWith(phrase)) return 0;
    if (item.slugWords.startsWith(words[0]) || item.label.toLowerCase().startsWith(words[0])) return 1;
    return 2;
  };
  return index
    .filter((item) => words.every((w) => item.text.includes(w)))
    .map((item) => ({ item, starts: rank(item) }))
    .sort((a, b) => a.starts - b.starts)
    .slice(0, limit)
    .map((r) => r.item);
}
