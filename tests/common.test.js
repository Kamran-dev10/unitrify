import { describe, it, expect } from "vitest";
import { convert } from "../lib/convert.js";
import { UNIT_CATEGORIES } from "../lib/categories/index.js";

const round = (n, d) => Math.round(n * 10 ** d) / 10 ** d;

describe("common converters: exact checks", () => {
  it("1 mile = 1.609344 km", () => expect(convert(1, "mile", "km", "length")).toBeCloseTo(1.609344, 12));
  it("1 stone = 6.35029318 kg", () => expect(convert(1, "stone", "kg", "weight")).toBeCloseTo(6.35029318, 12));
  it("1 US gallon = 3.785411784 L", () => expect(convert(1, "us-gallon", "litre", "volume")).toBeCloseTo(3.785411784, 12));
  it("1 atm = 14.6959 psi", () => expect(round(convert(1, "atm", "psi", "pressure"), 4)).toBe(14.6959));
  it("1 kWh = 3.6 MJ", () => expect(convert(1, "kwh", "mj", "energy")).toBeCloseTo(3.6, 12));
  it("1 hp = 745.7 W", () => expect(round(convert(1, "hp", "w", "power"), 1)).toBe(745.7));
  it("1 kgf = 9.80665 N", () => expect(convert(1, "kgf", "n", "force")).toBeCloseTo(9.80665, 12));
  it("1 day = 86400 s", () => expect(convert(1, "day", "s", "time")).toBe(86400));
  it("60 mph = 96.5606 km/h", () => expect(round(convert(60, "mph", "km-h", "speed"), 4)).toBe(96.5606));
  it("180 degree = pi rad", () => expect(convert(180, "deg", "rad", "angle")).toBeCloseTo(Math.PI, 12));
  it("30 mpg (US) = 7.8405 L/100km", () =>
    expect(round(convert(30, "mpg-us", "l-100km", "fuel-consumption"), 4)).toBe(7.8405));
  it("10 km/L = 10 L/100km", () => expect(convert(10, "km-l", "l-100km", "fuel-consumption")).toBeCloseTo(10, 12));
  it("1 TB = 931.3226 GiB", () => expect(round(convert(1, "tb", "gib", "data-storage"), 4)).toBe(931.3226));
  it("1 US bushel = 35.2391 L", () => expect(round(convert(1, "us-bushel", "litre", "volume-dry"), 4)).toBe(35.2391));
  it("0 K = -459.67 F", () => expect(convert(0, "kelvin", "fahrenheit", "temperature")).toBeCloseTo(-459.67, 10));
  it("491.67 R = 0 C", () => expect(convert(491.67, "rankine", "celsius", "temperature")).toBeCloseTo(0, 10));
});

describe("fuel consumption: inverse units", () => {
  it("0 mpg cannot be converted", () => expect(convert(0, "mpg-us", "l-100km", "fuel-consumption")).toBeNull());
});

describe("area: exact square meter (NIST)", () => {
  it("1 km² = 1,000,000 m²", () => expect(convert(1, "sq-km", "sq-m", "area")).toBeCloseTo(1e6, 6));
  it("1 sq ft = 0.09290304 m²", () => expect(convert(1, "sq-ft", "sq-m", "area")).toBeCloseTo(0.09290304, 12));
});

describe("every unit has 1-6 aliases", () => {
  it("aliases", () => {
    for (const c of UNIT_CATEGORIES) {
      for (const u of c.units) {
        expect(u.aliases.length, `${c.id}/${u.id}`).toBeGreaterThanOrEqual(1);
        expect(u.aliases.length, `${c.id}/${u.id}`).toBeLessThanOrEqual(6);
      }
    }
  });
});
