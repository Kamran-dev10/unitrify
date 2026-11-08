import { describe, it, expect } from "vitest";
import { convert, getUnits, toBase, fromBase } from "../lib/convert.js";
import { UNIT_CATEGORIES } from "../lib/categories/index.js";
import { downloadSeconds, formatDuration, splitDuration } from "../lib/download-time.js";
import { paToDbSpl, dbSplToPa } from "../lib/sound-pressure.js";
import { getPageBySlug } from "../lib/pages.js";

const round = (x, d) => Math.round(x * 10 ** d) / 10 ** d;

describe("fluids, light, radiology and other: exact checks", () => {
  it("1 cusec = 28.3168 L/s", () => expect(round(convert(1, "cusec", "l-s", "flow"), 4)).toBe(28.3168));
  it("1 gpm (US) = 3.78541 L/min", () => expect(round(convert(1, "gpm", "l-min", "flow"), 5)).toBe(3.78541));
  it("1 cP = 1 mPa*s", () => expect(convert(1, "cp", "mpa-s", "viscosity-dynamic")).toBeCloseTo(1, 12));
  it("1 cSt = 1 mm2/s", () => expect(convert(1, "cst", "mm2-s", "viscosity-kinematic")).toBeCloseTo(1, 12));
  it("1 fc = 10.7639 lux", () => expect(round(convert(1, "fc", "lux", "illuminance"), 4)).toBe(10.7639));
  it("500 nm = 599.585 THz", () =>
    expect(round(convert(500, "nm", "thz", "frequency-wavelength"), 3)).toBe(599.585));
  it("1 Ci = 3.7e10 Bq", () => expect(convert(1, "ci", "bq", "radiation-activity")).toBe(3.7e10));
  it("1 rem = 10 mSv", () => expect(convert(1, "rem", "msv", "radiation-dose")).toBeCloseTo(10, 12));
  it("1 Gy = 100 rad", () => expect(convert(1, "gy", "rad", "radiation-absorbed-dose")).toBeCloseTo(100, 12));
  it("1 R = 2.58e-4 C/kg", () => expect(convert(1, "r", "c-kg", "radiation-exposure")).toBeCloseTo(2.58e-4, 15));
  it("100 Mbps = 12.5 MB/s", () => expect(convert(100, "mbps", "mb-s", "data-transfer")).toBeCloseTo(12.5, 12));
  it("16 px = 12 pt", () => expect(convert(16, "px", "pt", "typography")).toBeCloseTo(12, 12));
  it("16 px = 1 rem (base 16)", () =>
    expect(convert(16, "px", "rem", "typography", { baseFontPx: 16 })).toBeCloseTo(1, 12));
  it("1 cord = 128 ft3", () => expect(convert(1, "cord", "ft3", "volume-lumber")).toBeCloseTo(128, 10));
  it("1 Np = 8.6859 dB", () => expect(round(convert(1, "np", "db", "sound-level"), 4)).toBe(8.6859));
  it("20 uPa = 0 dB SPL", () => expect(paToDbSpl(20e-6)).toBeCloseTo(0, 10));
  it("1 Pa = 93.98 dB SPL", () => expect(round(paToDbSpl(1), 2)).toBe(93.98));
  it("1 darcy = 9.869233e-13 m2", () => expect(convert(1, "darcy", "m2", "permeability")).toBe(9.869233e-13));
  it("1 kilo = 1000", () => expect(convert(1, "kilo", "one", "prefixes")).toBe(1000));
  it("download time: 1 GB at 100 Mbps = 80 s", () => {
    expect(downloadSeconds(1, "gb", 100, "mbps")).toBeCloseTo(80, 10);
    expect(formatDuration(80)).toBe("1 min 20 s");
  });
});

describe("helpers and options", () => {
  it("em/rem follow the base font size option", () => {
    expect(convert(1, "rem", "px", "typography", { baseFontPx: 10 })).toBeCloseTo(10, 12);
    expect(convert(1, "em", "px", "typography")).toBeCloseTo(16, 12); // default 16 px
  });
  it("dB SPL to Pa is the inverse of Pa to dB SPL", () => expect(dbSplToPa(paToDbSpl(0.5))).toBeCloseTo(0.5, 12));
  it("pressure must be above 0 for dB SPL", () => expect(paToDbSpl(0)).toBeNull());
  it("download time splits into hours, minutes and seconds", () => {
    expect(splitDuration(3725)).toEqual({ hours: 1, minutes: 2, seconds: 5 });
    expect(formatDuration(3725)).toBe("1 h 2 min 5 s");
    expect(downloadSeconds(1, "gb", 0, "mbps")).toBeNull();
  });
  it("frequency <-> wavelength: 0 cannot be converted", () =>
    expect(convert(0, "nm", "hz", "frequency-wavelength")).toBeNull());
  it("radiology and ppm pages carry the information note", () => {
    for (const slug of ["msv-to-rem", "rem-to-msv", "gy-to-rad", "ci-to-bq", "bq-to-ci"])
      expect(getPageBySlug(slug).note, slug).toMatch(/not for medical or safety decisions/);
    for (const slug of ["mg-l-to-ppm", "ppm-to-mg-l"]) expect(getPageBySlug(slug).note, slug).toMatch(/dilute water/);
  });
});

describe("new categories: round trip", () => {
  const groups = ["fluids", "light", "radiology", "other"];
  const cats = UNIT_CATEGORIES.filter((c) => groups.includes(c.group));

  it("has all 24 new categories", () => expect(cats.length).toBe(24));

  it("7.5 -> base -> back = 7.5 for every new unit (and every base font size)", () => {
    for (const c of cats) {
      const optionSets = c.option ? c.option.choices.map((v) => ({ [c.option.key]: v })) : [{}];
      for (const options of optionSets) {
        for (const u of getUnits(c.id, options)) {
          const back = fromBase(toBase(7.5, u), u);
          expect(Math.abs(back - 7.5) / 7.5, `${c.id}/${u.id}`).toBeLessThan(1e-9);
        }
      }
    }
  });
});
