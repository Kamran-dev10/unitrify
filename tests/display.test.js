import { describe, it, expect } from "vitest";
import { prettyNumber, formatDisplay, formatSmart } from "../lib/engine.js";

describe("number display", () => {
  it("shows scientific numbers as × 10 with a superscript exponent", () => {
    expect(prettyNumber("1e-6")).toBe("1 × 10⁻⁶");
    expect(formatDisplay(0.00000000123456789)).toBe("1.23457 × 10⁻⁹");
    expect(formatDisplay(2e15)).toBe("2 × 10¹⁵");
    expect(prettyNumber("1 m = 1e-9 Gm")).toBe("1 m = 1 × 10⁻⁹ Gm");
  });

  it("leaves normal numbers alone and keeps the plain text for copying", () => {
    expect(formatDisplay(1234.5)).toBe("1,234.5");
    expect(formatSmart(0.000001)).toBe("1e-6"); // what copy buttons copy
  });
});
