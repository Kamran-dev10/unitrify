// Text case conversions for the Case Converter. All run in the browser.

// Split text into words for programming cases: handles spaces, punctuation,
// snake_case, kebab-case and camelCase boundaries ("helloWorld" -> hello, World).
function words(text) {
  return (
    text
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .match(/[\p{L}\p{N}]+/gu) ?? []
  );
}

const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

export const CASES = [
  { id: "upper", label: "UPPERCASE", fn: (t) => t.toUpperCase() },
  { id: "lower", label: "lowercase", fn: (t) => t.toLowerCase() },
  { id: "title", label: "Title Case", fn: (t) => t.toLowerCase().replace(/(^|[\s\-–—(/"'“‘])(\p{L})/gu, (m, p, c) => p + c.toUpperCase()) },
  {
    id: "sentence",
    label: "Sentence case",
    fn: (t) => t.toLowerCase().replace(/(^\s*|[.!?]\s+|\n\s*)(\p{L})/gu, (m, p, c) => p + c.toUpperCase()),
  },
  { id: "camel", label: "camelCase", fn: (t) => words(t).map((w, i) => (i === 0 ? w.toLowerCase() : cap(w))).join("") },
  { id: "pascal", label: "PascalCase", fn: (t) => words(t).map(cap).join("") },
  { id: "snake", label: "snake_case", fn: (t) => words(t).map((w) => w.toLowerCase()).join("_") },
  { id: "kebab", label: "kebab-case", fn: (t) => words(t).map((w) => w.toLowerCase()).join("-") },
  { id: "constant", label: "CONSTANT_CASE", fn: (t) => words(t).map((w) => w.toUpperCase()).join("_") },
  {
    id: "alternating",
    label: "aLtErNaTiNg cAsE",
    // Letters alternate lower/upper, starting lower; spaces and symbols are skipped.
    fn: (t) => {
      let i = 0;
      return Array.from(t)
        .map((ch) => {
          if (ch.toLowerCase() === ch.toUpperCase()) return ch;
          return i++ % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase();
        })
        .join("");
    },
  },
  {
    id: "inverse",
    label: "iNVERSE cASE",
    fn: (t) =>
      Array.from(t)
        .map((ch) => (ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()))
        .join(""),
  },
];

export function convertCase(text, id) {
  const c = CASES.find((x) => x.id === id);
  return c ? c.fn(text) : text;
}

// Live counts shown under the text box.
export function textStats(text) {
  const chars = Array.from(text);
  return {
    characters: chars.length,
    charactersNoSpaces: chars.filter((ch) => !/\s/.test(ch)).length,
    words: (text.trim().match(/\S+/g) ?? []).length,
    lines: text === "" ? 0 : text.split(/\r\n|\r|\n/).length,
  };
}
