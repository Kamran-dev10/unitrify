import { describe, it, expect } from "vitest";
import { convert } from "../lib/convert.js";
import { buildSearchIndex, searchPages } from "../lib/search.js";
import nextConfig from "../next.config.mjs";

const round = (x, d) => Math.round(x * 10 ** d) / 10 ** d;

describe("engineering and heat: exact checks", () => {
  it("1 rpm = 0.10472 rad/s", () => expect(round(convert(1, "rpm", "rad-s", "angular-velocity"), 5)).toBe(0.10472));
  it("1 g = 9.80665 m/s2", () => expect(convert(1, "g", "m-s2", "acceleration")).toBeCloseTo(9.80665, 12));
  it("1 lbf*ft = 1.35582 N*m", () => expect(round(convert(1, "lbf-ft", "n-m", "torque"), 5)).toBe(1.35582));
  it("1 g/cm3 = 62.428 lb/ft3", () => expect(round(convert(1, "g-cm3", "lb-ft3", "density"), 3)).toBe(62.428));
  it("a change of 10 C = 18 F (temperature-interval)", () =>
    expect(convert(10, "delta-c", "delta-f", "temperature-interval")).toBeCloseTo(18, 10));
  it("1 W/(m*K) = 0.5778 BTU/(h*ft*F)", () =>
    expect(round(convert(1, "w-mk", "btu-hftf", "thermal-conductivity"), 4)).toBe(0.5778));
  it("1 BTU/(lb*F) = 4.1868 kJ/(kg*K)", () =>
    expect(convert(1, "btu-lbf", "kj-kgk", "specific-heat-capacity")).toBeCloseTo(4.1868, 10));
});

describe("torque and moment of force", () => {
  it("/moment-of-force permanently redirects to /torque", async () => {
    const redirects = await nextConfig.redirects();
    expect(redirects).toContainEqual({ source: "/moment-of-force", destination: "/torque", permanent: true });
  });

  it('searching "moment of force" finds the torque page', () => {
    expect(searchPages(buildSearchIndex(), "moment of force").map((r) => r.url)).toContain("/torque");
  });
});
