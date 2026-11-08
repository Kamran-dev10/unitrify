// Whole numbers between bases 2 to 36, using BigInt so any length works.

const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";

export const BASE_NAMES = { 2: "binary", 8: "octal", 10: "decimal", 16: "hexadecimal" };

export function baseName(base) {
  return BASE_NAMES[base] ?? `base ${base}`;
}

// Parse text in the given base. Returns { value: BigInt } or { error }.
// Spaces and underscores are ignored, a leading "-" is allowed, and the
// prefixes 0b / 0o / 0x are accepted for bases 2 / 8 / 16.
export function parseInBase(text, base) {
  if (!Number.isInteger(base) || base < 2 || base > 36) return { error: "The base must be a whole number from 2 to 36." };
  let s = String(text ?? "").trim().replace(/[\s_]/g, "").toLowerCase();
  if (s === "") return { error: "" };
  let negative = false;
  if (s.startsWith("-")) {
    negative = true;
    s = s.slice(1);
  }
  const prefix = { 2: "0b", 8: "0o", 16: "0x" }[base];
  if (prefix && s.startsWith(prefix)) s = s.slice(2);
  if (s === "") return { error: "Please enter a number." };

  const big = BigInt(base);
  let value = 0n;
  for (const ch of s) {
    const d = DIGITS.indexOf(ch);
    if (d === -1 || d >= base) {
      const allowed = base <= 10 ? `0–${base - 1}` : `0–9 and a–${DIGITS[base - 1]}`;
      return { error: `“${ch}” is not a valid digit in ${baseName(base)}. Use ${allowed}.` };
    }
    value = value * big + BigInt(d);
  }
  return { value: negative ? -value : value };
}

// BigInt -> text in the given base (lowercase letters, like 0xff).
export function formatInBase(value, base) {
  return value.toString(base);
}

// convertBase("255", 10, 16) -> { value: "ff" } or { error }
export function convertBase(text, fromBase, toBase) {
  const parsed = parseInBase(text, fromBase);
  if (parsed.error !== undefined) return { error: parsed.error };
  if (!Number.isInteger(toBase) || toBase < 2 || toBase > 36) return { error: "The base must be a whole number from 2 to 36." };
  return { value: formatInBase(parsed.value, toBase) };
}
