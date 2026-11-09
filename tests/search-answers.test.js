import { describe, it, expect } from "vitest";
import { parseQuery } from "../lib/search/parseQuery.js";
import { buildAnswers, formatCurrencyAnswer } from "../lib/search/answers.js";
import { buildSearchUnits } from "../lib/search/units-data.js";

const data = buildSearchUnits();
// Mocked rates (units per 1 USD), as /api/rates returns them.
const RATES = { rates: { USD: 1, PKR: 280, GBP: 0.8, EUR: 0.9, AED: 3.6725, SAR: 3.75, INR: 83 }, updatedUtc: "Tue, 10 Nov 2026 00:00:01 +0000" };
const currencies = Object.keys(RATES.rates);

const ask = (q, rates = RATES) => {
  const parsed = parseQuery(q, data, { currencies });
  return { parsed, answers: buildAnswers(parsed, data, rates) };
};
// Copy text is the plain number as the site shows it ("1,361.25").
const num = (s) => Number(s.replace(/,/g, ""));
const first = (q) => num(ask(q).answers.lines[0].copy);

describe("parseQuery: numbers and units", () => {
  it('"100 cm" -> 1 m first', () => {
    const { parsed, answers } = ask("100 cm");
    expect(parsed).toMatchObject({ type: "unit", value: 100, category: "length" });
    expect(parsed.from.id).toBe("cm");
    expect(answers.main.text).toBe("100 cm = 1 m");
    expect(answers.lines.length).toBeGreaterThanOrEqual(4);
    // Rows: unit name on the left, 4 significant figures on the right, at most 5.
    expect(answers.rows.find((r) => r.label === "Inches").valueText).toBe("39.37 in");
    expect(answers.rows.find((r) => r.label === "Feet").valueText).toBe("3.281 ft");
    expect(answers.rows.length).toBeLessThanOrEqual(5);
    // cm is not ambiguous: no "Did you mean" (typography also has a centimeter).
    expect(answers.didYouMean).toEqual([]);
    expect(answers.links.at(-1)).toEqual({ label: "Length Converter", href: "/length" });
  });

  it('"100 cm to m" -> 1', () => expect(first("100 cm to m")).toBe(1));
  it('"100cm in inches" -> 39.3701', () => expect(first("100cm in inches")).toBeCloseTo(39.3701, 4));
  it('"1,000 m to km" -> 1', () => expect(first("1,000 m to km")).toBe(1));
  it('"5 ft 4 in to cm" -> 162.56', () => {
    const { answers } = ask("5 ft 4 in to cm");
    expect(num(answers.lines[0].copy)).toBeCloseTo(162.56, 9);
    expect(answers.lines[0].text).toBe("5 ft 4 in = 162.56 cm");
  });
  it(`5'4" to cm -> 162.56`, () => expect(first(`5'4" to cm`)).toBeCloseTo(162.56, 9));
  it('"100f to c" -> 37.7778 (temperature formula)', () => expect(first("100f to c")).toBeCloseTo(37.7778, 4));
  it('"-40 c to f" -> -40', () => expect(first("-40 c to f")).toBeCloseTo(-40, 9));

  it('"5 marla in sq ft" -> all three marla standards', () => {
    const { answers } = ask("5 marla in sq ft");
    expect(answers.lines.map((l) => num(l.copy))).toEqual([1361.25, 1250, 1125]);
    expect(answers.lines[0].text).toBe("5 marla = 1,361.25 sq ft (272.25 sq ft marla)");
  });

  it('"10 marla kitne square feet" (Roman Urdu) -> 2722.5 with the revenue marla first', () => {
    const { parsed, answers } = ask("10 marla kitne square feet");
    expect(parsed.to.id).toBe("sq-ft");
    expect(num(answers.lines[0].copy)).toBe(2722.5);
  });

  it('"cm to inch" (no number) -> 1 cm = 0.3937 in', () => {
    const { answers } = ask("cm to inch");
    expect(answers.lines[0].text).toBe("1 cm = 0.3937 in");
  });

  it('"100 kilogrm to lbs" (typo) -> 220.462', () => {
    const { parsed } = ask("100 kilogrm to lbs");
    expect(parsed.typo).toBe(true);
    expect(first("100 kilogrm to lbs")).toBeCloseTo(220.462, 3);
  });

  it('"100 m" -> meter, with "Did you mean" minute and mile', () => {
    const { parsed, answers } = ask("100 m");
    expect(parsed.from.id).toBe("m");
    expect(parsed.category).toBe("length");
    expect(answers.didYouMean.map((d) => d.label)).toEqual(["Minute", "Mile"]);
    // A suggestion is a new query that reads as that unit.
    expect(ask(answers.didYouMean[0].query).parsed.from.id).toBe("min");
  });

  it('"2 cups to ml" -> 473.1765 (US cup)', () => expect(first("2 cups to ml")).toBeCloseTo(473.1765, 4));
  it('"how many ml in 2 cups" -> 473.1765', () => expect(first("how many ml in 2 cups")).toBeCloseTo(473.1765, 4));
  it('"100 pounds" -> weight, with "Did you mean British pound (GBP)"', () => {
    const { parsed, answers } = ask("100 pounds");
    expect(parsed).toMatchObject({ type: "unit", category: "weight" });
    expect(answers.didYouMean.at(-1)).toEqual({ label: "British pound (GBP)", query: "100 gbp" });
  });

  it("links to the pair page with the value filled in", () => {
    const { answers } = ask("10 cm to inch");
    expect(answers.lines[0].href).toBe("/length/cm-to-inch?v=10");
    const noPair = ask("3 furlong to chain").answers;
    expect(noPair.lines[0].href).toBe("/length?v=3&from=furlong&to=chain");
  });
});

describe("parseQuery: currency", () => {
  it('"100 pkr" -> USD, GBP, EUR, AED, SAR', () => {
    const { parsed, answers } = ask("100 pkr");
    expect(parsed).toMatchObject({ type: "currency", from: "PKR", to: null });
    expect(answers.lines.map((l) => l.text.split(" ").at(-1))).toEqual(["USD", "GBP", "EUR", "AED", "SAR"]);
    // The amount as typed ("100", not "100.00"); below 1: 4 significant digits.
    expect(answers.main.text).toBe("100 PKR = 0.3571 USD");
    // 1 and above: 2 decimals (100 PKR = 1.3116 AED -> 1.31).
    expect(answers.rows.find((r) => r.valueText.endsWith("AED")).valueText).toBe("1.31 AED");
    expect(answers.rates.updated).toBeTruthy();
  });

  it("currency rounding rule", () => {
    expect(formatCurrencyAnswer(1.3333)).toBe("1.33");
    expect(formatCurrencyAnswer(28000)).toBe("28,000.00");
    expect(formatCurrencyAnswer(0.361349)).toBe("0.3613");
    expect(formatCurrencyAnswer(0.000123456)).toBe("0.0001235");
  });

  it("echoes the amount as typed: 1,000 and 2.5", () => {
    expect(ask("1,000 usd to pkr").answers.main.text).toBe("1,000 USD = 280,000.00 PKR");
    expect(ask("2.5 usd to pkr").answers.main.text).toBe("2.5 USD = 700.00 PKR");
  });

  it('"100 dollar to pkr" -> one answer, 28,000 PKR', () => {
    const { answers } = ask("100 dollar to pkr");
    expect(answers.lines).toHaveLength(1);
    expect(num(answers.lines[0].copy)).toBe(28000);
    expect(answers.lines[0].href).toBe("/currency-converter/usd-to-pkr?v=100");
  });

  it("£ and 'pound to pkr' mean GBP", () => {
    expect(ask("£50 to pkr").parsed).toMatchObject({ type: "currency", from: "GBP", to: "PKR", value: 50 });
    expect(ask("10 pound to pkr").parsed).toMatchObject({ type: "currency", from: "GBP", to: "PKR" });
  });

  it("asks for rates when they have not loaded yet", () => {
    expect(ask("100 pkr", null).answers.needsRates).toBe(true);
  });
});

describe("parseQuery: nothing to read", () => {
  it('"abc" -> no result', () => {
    expect(ask("abc").parsed.type).toBe("none");
    expect(ask("abc").answers).toBeNull();
  });
  it("page searches without units stay page searches", () => {
    expect(ask("pressure").parsed.type).toBe("none");
    expect(ask("length converter").parsed.type).toBe("none");
  });
});
