import { describe, it, expect } from "vitest";
import { convert, formatResult } from "../lib/convert.js";
import { MARLA_STANDARDS } from "../lib/units.js";

// Decimal maths on computers can be off by a tiny amount (e.g. 2.5399999999).
// toBeCloseTo(x, 10) checks the value matches to 10 decimal places.
const round4 = (n) => Math.round(n * 10000) / 10000;

describe("area", () => {
  for (const [name, size] of Object.entries(MARLA_STANDARDS)) {
    it(`1 kanal = 20 marla (${name} standard, ${size} sq ft)`, () => {
      expect(convert(1, "kanal", "marla", "area", { marlaSize: size })).toBeCloseTo(20, 10);
    });
  }

  it("1 marla = 272.25 sq ft (revenue)", () => {
    expect(convert(1, "marla", "sq-ft", "area", { marlaSize: MARLA_STANDARDS.revenue })).toBeCloseTo(272.25, 10);
  });

  it("1 marla = 225 sq ft (urban)", () => {
    expect(convert(1, "marla", "sq-ft", "area", { marlaSize: MARLA_STANDARDS.urban })).toBeCloseTo(225, 10);
  });

  it("1 acre = 43560 sq ft", () => {
    expect(convert(1, "acre", "sq-ft", "area")).toBeCloseTo(43560, 10);
  });

  it("1 acre = 160 marla (revenue standard)", () => {
    expect(convert(1, "acre", "marla", "area", { marlaSize: MARLA_STANDARDS.revenue })).toBeCloseTo(160, 10);
  });

  it("1 murabba = 25 acre", () => {
    expect(convert(1, "murabba", "acre", "area")).toBeCloseTo(25, 10);
  });

  it('input "5" (a string) marla = 1361.25 sq ft', () => {
    expect(convert("5", "marla", "sq-ft", "area")).toBeCloseTo(1361.25, 10);
  });
});

describe("weight", () => {
  it("1 kg = 2.2046 lb (rounded to 4 decimals)", () => {
    expect(round4(convert(1, "kg", "pound", "weight"))).toBe(2.2046);
  });

  it("1 tola = 11.6638 g", () => {
    expect(round4(convert(1, "tola", "g", "weight"))).toBe(11.6638);
  });

  it("1 maund = 40 kg", () => {
    expect(convert(1, "maund", "kg", "weight")).toBeCloseTo(40, 10);
  });
});

describe("length", () => {
  it("1 inch = 2.54 cm", () => {
    expect(convert(1, "inch", "cm", "length")).toBeCloseTo(2.54, 10);
  });
});

describe("temperature", () => {
  it("100 C = 212 F", () => {
    expect(convert(100, "celsius", "fahrenheit", "temperature")).toBeCloseTo(212, 10);
  });

  it("0 C = 32 F", () => {
    expect(convert(0, "celsius", "fahrenheit", "temperature")).toBeCloseTo(32, 10);
  });

  it("-40 C = -40 F", () => {
    expect(convert(-40, "celsius", "fahrenheit", "temperature")).toBeCloseTo(-40, 10);
  });
});

describe("invalid input", () => {
  it('"" returns null', () => {
    expect(convert("", "kg", "pound", "weight")).toBeNull();
  });

  it('"abc" returns null', () => {
    expect(convert("abc", "kg", "pound", "weight")).toBeNull();
  });

  it("-5 kg returns null", () => {
    expect(convert(-5, "kg", "pound", "weight")).toBeNull();
  });
});

describe("formatResult", () => {
  it('formatResult(1361.25) = "1,361.25"', () => {
    expect(formatResult(1361.25)).toBe("1,361.25");
  });
});
