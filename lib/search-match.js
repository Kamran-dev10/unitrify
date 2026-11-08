// Matching for the search box. No imports, so the browser only loads this
// small function; the index itself comes from /search-index.json.

// Every word typed must appear somewhere in the page's search text.
// Best first: the URL starts with what was typed ("kg to lbs"), then
// pages whose URL or label starts with the first word, then the rest.
// A category page that only matches by one of its unit names comes last,
// so "marla" lists marla pages before the land category page.
export function searchPages(index, query, limit = 8) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const phrase = words.join(" ");
  const rank = (item) => {
    if (item.slugWords.startsWith(phrase)) return 0;
    if (item.slugWords.startsWith(words[0]) || item.label.toLowerCase().startsWith(words[0])) return 1;
    return item.type === "category" ? 3 : 2;
  };
  return index
    .filter((item) => words.every((w) => item.text.includes(w)))
    .map((item) => ({ item, starts: rank(item) }))
    .sort((a, b) => a.starts - b.starts)
    .slice(0, limit)
    .map((r) => r.item);
}
