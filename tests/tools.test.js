import { describe, it, expect } from "vitest";
import { plotArea, feetInchesToCm } from "../lib/convert.js";
import { MARLA_STANDARDS } from "../lib/units.js";

const round4 = (n) => Math.round(n * 10000) / 10000;

describe("plot calculator", () => {
  it("25 x 50 ft = 1250 sq ft = 4.5914 marla (272.25)", () => {
    const area = plotArea(25, 50, { marlaSize: MARLA_STANDARDS.revenue });
    expect(area.sqFt).toBe(1250);
    expect(round4(area.marla)).toBe(4.5914);
  });
});

describe("feet and inches", () => {
  it("5 ft 4 in = 162.56 cm", () => {
    expect(feetInchesToCm(5, 4)).toBeCloseTo(162.56, 10);
  });
});
