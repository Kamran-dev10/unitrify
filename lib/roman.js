// Roman numerals for whole numbers 1 to 3999.

const TABLE = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const RANGE_ERROR = "Roman numerals here cover whole numbers from 1 to 3999.";

// toRoman(1994) -> { value: "MCMXCIV" } or { error }
export function toRoman(input) {
  const text = String(input ?? "").trim().replace(/,/g, "");
  if (text === "") return { error: "" };
  const n = Number(text);
  if (!Number.isInteger(n)) return { error: "Please enter a whole number, like 2026." };
  if (n < 1 || n > 3999) return { error: RANGE_ERROR };
  let rest = n;
  let out = "";
  for (const [v, s] of TABLE) {
    while (rest >= v) {
      out += s;
      rest -= v;
    }
  }
  return { value: out };
}

// Standard form only (e.g. IV, not IIII).
const VALID = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

// fromRoman("MMXXVI") -> { value: 2026 } or { error }
export function fromRoman(input) {
  const s = String(input ?? "").trim().toUpperCase();
  if (s === "") return { error: "" };
  if (!/^[MDCLXVI]+$/.test(s)) return { error: "Use only the letters I, V, X, L, C, D and M." };
  if (!VALID.test(s)) return { error: `“${s}” is not a standard Roman numeral (for example, 4 is IV, not IIII).` };
  let total = 0;
  let i = 0;
  for (const [v, sym] of TABLE) {
    while (s.startsWith(sym, i)) {
      total += v;
      i += sym.length;
    }
  }
  return { value: total };
}
