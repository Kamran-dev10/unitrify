import { describe, it, expect } from "vitest";
import { convert, convertUnits, toBase, fromBase, formatSmart, getUnits } from "../lib/convert.js";
import { UNIT_CATEGORIES, GROUPS } from "../lib/categories/index.js";
import { inverse, linear } from "../lib/categories/helpers.js";

describe("affine units (temperature)", () => {
  it("100 C = 212 F", () => {
    expect(convert(100, "celsius", "fahrenheit", "temperature")).toBeCloseTo(212, 10);
  });

  it("0 K = -273.15 C", () => {
    expect(convert(0, "kelvin", "celsius", "temperature")).toBeCloseTo(-273.15, 10);
  });
});

describe("inverse units", () => {
  // Temporary test units until the real fuel category exists.
  // Base: L/100 km. US mpg: L/100 km = 100 × 3.785411784 / 1.609344 / mpg.
  const L_PER_100KM = linear("l-100km", "Litres per 100 km", "L/100 km", 1);
  const MPG_US = inverse("mpg-us", "Miles per gallon (US)", "mpg", (100 * 3.785411784) / 1.609344);
  const round4 = (n) => Math.round(n * 10000) / 10000;

  it("30 mpg (US) = 7.8405 L/100km", () => {
    expect(round4(convertUnits(30, MPG_US, L_PER_100KM))).toBe(7.8405);
  });

  it("7.8405 L/100km is about 30 mpg (US)", () => {
    expect(convertUnits(7.8405, L_PER_100KM, MPG_US)).toBeCloseTo(30, 3);
  });

  it("0 returns null for inverse units", () => {
    expect(convertUnits(0, MPG_US, L_PER_100KM)).toBeNull();
    expect(convertUnits(0, L_PER_100KM, MPG_US)).toBeNull();
  });
});

describe("round trip through the base unit", () => {
  it("7.5 -> base -> back = 7.5 for every unit (relative error < 1e-9)", () => {
    for (const cat of UNIT_CATEGORIES) {
      for (const u of getUnits(cat.id)) {
        const back = fromBase(toBase(7.5, u), u);
        expect(Math.abs(back - 7.5) / 7.5, `${cat.id}/${u.id}`).toBeLessThan(1e-9);
      }
    }
  });
});

describe("registry", () => {
  it("every category has a unique id and a valid group", () => {
    const ids = UNIT_CATEGORIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const c of UNIT_CATEGORIES) {
      expect(GROUPS, c.id).toContain(c.group);
      expect(typeof c.name, c.id).toBe("string");
      expect(typeof c.intro, c.id).toBe("string");
    }
  });

  it("every unit id is unique within its category; every unit has a name and symbol", () => {
    for (const c of UNIT_CATEGORIES) {
      const units = getUnits(c.id);
      const ids = units.map((u) => u.id);
      expect(new Set(ids).size, c.id).toBe(ids.length);
      for (const u of units) {
        expect(u.name, `${c.id}/${u.id}`).toBeTruthy();
        expect(u.symbol, `${c.id}/${u.id}`).toBeTruthy();
        expect(["linear", "affine", "inverse"], `${c.id}/${u.id}`).toContain(u.kind);
        expect(Array.isArray(u.aliases), `${c.id}/${u.id}`).toBe(true);
        expect(u.country === "global" || /^[a-z]{2}$/.test(u.country), `${c.id}/${u.id}`).toBe(true);
      }
    }
  });

  it("every category's base unit and default units exist", () => {
    for (const c of UNIT_CATEGORIES) {
      const ids = getUnits(c.id).map((u) => u.id);
      expect(ids, c.id).toContain(c.baseUnit);
      expect(ids, c.id).toContain(c.defaultFrom);
      expect(ids, c.id).toContain(c.defaultTo);
    }
  });
});

describe("formatSmart", () => {
  it("normal numbers use the formatResult rules", () => {
    expect(formatSmart(1361.25)).toBe("1,361.25");
    expect(formatSmart(0.5)).toBe("0.5");
    expect(formatSmart(0)).toBe("0");
  });

  it("very small and very large numbers use scientific notation (6 significant digits)", () => {
    expect(formatSmart(0.00000000123456789)).toBe("1.23457e-9");
    expect(formatSmart(0.00005)).toBe("5e-5");
    expect(formatSmart(2e15)).toBe("2e15");
    expect(formatSmart(-1.5e12)).toBe("-1.5e12");
  });

  it("returns an empty string for null", () => {
    expect(formatSmart(null)).toBe("");
  });
});
