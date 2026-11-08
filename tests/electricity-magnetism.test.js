import { describe, it, expect } from "vitest";
import { convert, getUnits, toBase, fromBase } from "../lib/convert.js";
import { UNIT_CATEGORIES } from "../lib/categories/index.js";

const round = (x, d) => Math.round(x * 10 ** d) / 10 ** d;

describe("electricity, magnetism and Kelvin: exact checks", () => {
  it("2000 mAh = 2 Ah", () => expect(convert(2000, "mah", "ah", "charge")).toBeCloseTo(2, 12));
  it("1 Ah = 3600 C", () => expect(convert(1, "ah", "c", "charge")).toBe(3600));
  it("1 uF = 1000 nF", () => expect(convert(1, "uf", "nf", "capacitance")).toBeCloseTo(1000, 9));
  it("1 nF = 1000 pF", () => expect(convert(1, "nf", "pf", "capacitance")).toBeCloseTo(1000, 9));
  it("1 T = 10000 G", () => expect(convert(1, "t", "gauss", "magnetic-flux-density")).toBeCloseTo(10000, 9));
  it("1 Oe = 79.5775 A/m", () =>
    expect(round(convert(1, "oersted", "a-m", "magnetic-field-strength"), 4)).toBe(79.5775));
  it("1 Gb = 0.795775 ampere-turn", () =>
    expect(round(convert(1, "gilbert", "at", "magnetomotive-force"), 6)).toBe(0.795775));
  it("1000 uS/cm = 1 mS/cm", () =>
    expect(convert(1000, "us-cm", "ms-cm", "electric-conductivity")).toBeCloseTo(1, 12));
  it("1 statV = 299.792458 V", () =>
    expect(convert(1, "statv", "v", "electric-potential")).toBeCloseTo(299.792458, 10));
  it("100 C = 373.15 K", () => expect(convert(100, "celsius", "kelvin", "temperature")).toBeCloseTo(373.15, 10));
  it("32 F = 273.15 K", () => expect(convert(32, "fahrenheit", "kelvin", "temperature")).toBeCloseTo(273.15, 10));
});

describe("electricity and magnetism: round trip", () => {
  const cats = UNIT_CATEGORIES.filter((c) => c.group === "electricity" || c.group === "magnetism");

  it("has all 19 new categories", () => expect(cats.length).toBe(19));

  it("7.5 -> base -> back = 7.5 for every new unit", () => {
    for (const c of cats) {
      for (const u of getUnits(c.id)) {
        const back = fromBase(toBase(7.5, u), u);
        expect(Math.abs(back - 7.5) / 7.5, `${c.id}/${u.id}`).toBeLessThan(1e-9);
      }
    }
  });
});
