// Independent accuracy check. The values below were written from NIST SP 811
// (2008, with the 2019 SI redefinition) and exact SI definitions, NOT copied
// from lib/categories. For every unit: what 1 unit is in the category's base
// unit. The engine must agree to a relative difference of 1e-6 or better.
//
// Number      -> linear: base = value × number
// { inv: k }  -> inverse: base = k ÷ value
// function    -> any other rule (temperature readings)
import { describe, it, expect } from "vitest";
import { convert, getUnits, formatResult } from "../lib/convert.js";
import { UNIT_CATEGORIES, getUnitCategory } from "../lib/categories/index.js";
import { PAGES } from "../lib/pages.js";
import { categoryData } from "../lib/category-data.js";
import { convertWith } from "../lib/engine.js";

// Exact base definitions.
const IN = 0.0254; // m
const FT = 0.3048; // m
const YD = 0.9144; // m
const MI = 1609.344; // m
const FT2 = FT * FT; // m²
const IN2 = IN * IN;
const FT3 = FT ** 3; // m³
const IN3 = IN ** 3;
const LB = 0.45359237; // kg
const OZ = LB / 16;
const GRAIN = 64.79891e-6; // kg
const LBF = LB * 9.80665; // N
const GAL_US = 231 * IN3; // m³
const GAL_UK = 4.54609e-3; // m³
const BTU = 1055.05585262; // J, International Table
const CAL_TH = 4.184; // J, thermochemical
const CAL_IT = 4.1868; // J, International Table
const C = 299792458; // m/s
const PI = Math.PI;
const E = 1.602176634e-19; // C
const NA = 6.02214076e23;
const SLUG = LBF / FT; // kg
const ACRE_FT2 = 43560; // ft²
const YEAR = 365.2425 * 86400; // s, Gregorian average year (convention, see REVIEW.md)
const ROD = 16.5; // ft

const REF = {
  zameen: { // base: sq ft, revenue marla 272.25 sq ft
    "sq-ft": 1, "sq-yd": 9, "sq-m": 1 / FT2, marla: 272.25, kanal: 20 * 272.25, acre: ACRE_FT2,
    hectare: 1e4 / FT2, murabba: 25 * ACRE_FT2,
  },
  length: { // base: m
    nm: 1e-9, um: 1e-6, mm: 1e-3, cm: 1e-2, dm: 0.1, m: 1, km: 1e3, mil: IN / 1000, inch: IN, hand: 4 * IN,
    foot: FT, yard: YD, fathom: 6 * FT, rod: ROD * FT, chain: 66 * FT, furlong: 660 * FT, mile: MI,
    "nautical-mile": 1852, angstrom: 1e-10, au: 149597870700, "light-year": 9460730472580800,
    parsec: (149597870700 * 180 * 3600) / PI, // 1 au ÷ tan(1″), IAU 2015 exact form
  },
  weight: { // base: g
    ug: 1e-6, mg: 1e-3, g: 1, kg: 1e3, quintal: 1e5, tonne: 1e6, carat: 0.2, grain: GRAIN * 1e3,
    pennyweight: 24 * GRAIN * 1e3, ounce: OZ * 1e3, "troy-ounce": 480 * GRAIN * 1e3, pound: LB * 1e3,
    stone: 14 * LB * 1e3, "short-ton": 2000 * LB * 1e3, "long-ton": 2240 * LB * 1e3, slug: SLUG * 1e3,
    tola: 180 * GRAIN * 1e3,
    // No NIST definition. Pakistan uses the metric maund of 40 kg; the old
    // British-India maund (40 seer × 80 tola = 37.3242 kg) is listed in REVIEW.md.
    maund: 40000,
  },
  temperature: { // base: °C
    celsius: (x) => x, fahrenheit: (x) => ((x - 32) * 5) / 9, kelvin: (x) => x - 273.15,
    rankine: (x) => ((x - 491.67) * 5) / 9, reaumur: (x) => x * 1.25,
  },
  area: { // base: sq ft
    "sq-mm": 1e-6 / FT2, "sq-cm": 1e-4 / FT2, "sq-m": 1 / FT2, are: 100 / FT2, hectare: 1e4 / FT2,
    "sq-km": 1e6 / FT2, "sq-in": 1 / 144, "sq-ft": 1, "sq-yd": 9, acre: ACRE_FT2, "sq-mi": 5280 * 5280,
  },
  volume: { // base: litre
    ml: 1e-3, cl: 1e-2, dl: 1e-1, "cubic-cm": 1e-3, litre: 1, "cubic-m": 1e3, "us-teaspoon": (GAL_US * 1e3) / 768,
    "us-tablespoon": (GAL_US * 1e3) / 256, "us-fl-oz": (GAL_US * 1e3) / 128, "uk-fl-oz": (GAL_UK * 1e3) / 160,
    "us-cup": (GAL_US * 1e3) / 16, "metric-cup": 0.25, "us-pint": (GAL_US * 1e3) / 8, "uk-pint": (GAL_UK * 1e3) / 8,
    "us-quart": (GAL_US * 1e3) / 4, "uk-quart": (GAL_UK * 1e3) / 4, "us-gallon": GAL_US * 1e3, "uk-gallon": GAL_UK * 1e3,
    "cubic-inch": IN3 * 1e3, "cubic-foot": FT3 * 1e3, "cubic-yard": YD ** 3 * 1e3, "oil-barrel": 42 * GAL_US * 1e3,
  },
  "volume-dry": { // base: litre; US bushel = 2150.42 in³, UK bushel = 8 UK gallons
    litre: 1, "cubic-m": 1e3, "us-dry-pint": (2150.42 * IN3 * 1e3) / 64, "us-dry-quart": (2150.42 * IN3 * 1e3) / 32,
    "us-peck": (2150.42 * IN3 * 1e3) / 4, "us-bushel": 2150.42 * IN3 * 1e3, "uk-peck": 2 * GAL_UK * 1e3,
    "uk-bushel": 8 * GAL_UK * 1e3, "us-dry-barrel": 7056 * IN3 * 1e3,
  },
  pressure: { // base: Pa
    pa: 1, hpa: 100, kpa: 1e3, mpa: 1e6, gpa: 1e9, mh2o: 1000 * 9.80665, fth2o: FT * 1000 * 9.80665, bar: 1e5, mbar: 100, atm: 101325, psi: LBF / IN2, ksi: (1000 * LBF) / IN2,
    torr: 101325 / 760, mmhg: 133.322387415, inhg: 3386.389, "kgf-cm2": 98066.5, inh2o: 249.08891, // conventional mmHg, inHg, inH2O
  },
  energy: { // base: J
    j: 1, kj: 1e3, mj: 1e6, gj: 1e9, wh: 3600, kwh: 3.6e6, mwh: 3.6e9, cal: CAL_TH, kcal: 1e3 * CAL_TH, btu: BTU, therm: 105480400,
    ev: E, "ft-lbf": LBF * FT, erg: 1e-7,
  },
  power: { // base: W
    w: 1, kw: 1e3, mw: 1e6, gw: 1e9, hp: 550 * LBF * FT, "hp-electric": 746, "hp-metric": 75 * 9.80665, "btu-h": BTU / 3600,
    "ft-lbf-s": LBF * FT,
    // Thermochemical kcal (4,184 J) per hour, as the site uses. The heat categories use the
    // International Table kcal/h (1.163 W); the difference is listed in REVIEW.md.
    "kcal-h": (1e3 * CAL_TH) / 3600, "ton-refrigeration": (12000 * BTU) / 3600,
  },
  force: { n: 1, kn: 1e3, kip: 1000 * LBF, dyne: 1e-5, lbf: LBF, kgf: 9.80665, ozf: LBF / 16, poundal: LB * FT },
  time: {
    ns: 1e-9, us: 1e-6, ms: 1e-3, s: 1, min: 60, h: 3600, day: 86400, week: 604800, month: YEAR / 12,
    year: YEAR, decade: 10 * YEAR, century: 100 * YEAR,
  },
  speed: { "m-s": 1, "km-h": 1 / 3.6, mph: MI / 3600, knot: 1852 / 3600, "ft-s": FT, light: C },
  angle: {
    rad: 1, deg: PI / 180, grad: PI / 200, arcmin: PI / 10800, arcsec: PI / 648000, turn: 2 * PI, mrad: 1e-3,
    "nato-mil": (2 * PI) / 6400,
  },
  "fuel-consumption": { // base: L/100 km
    "l-100km": 1, "km-l": { inv: 100 }, "mpg-us": { inv: (100 * GAL_US * 1e3) / (MI / 1000) },
    "mpg-uk": { inv: (100 * GAL_UK * 1e3) / (MI / 1000) },
  },
  "data-storage": { // base: bit
    bit: 1, byte: 8, kb: 8e3, mb: 8e6, gb: 8e9, tb: 8e12, pb: 8e15, kib: 8 * 2 ** 10, mib: 8 * 2 ** 20,
    gib: 8 * 2 ** 30, tib: 8 * 2 ** 40, pib: 8 * 2 ** 50,
  },
  "angular-velocity": {
    "rad-s": 1, rpm: (2 * PI) / 60, "rev-s": 2 * PI, "rev-h": (2 * PI) / 3600, "deg-s": PI / 180,
    "deg-min": PI / 180 / 60, "rad-min": 1 / 60,
  },
  acceleration: { "m-s2": 1, g: 9.80665, "ft-s2": FT, "in-s2": IN, gal: 0.01, "kmh-s": 1 / 3.6, "mph-s": MI / 3600 },
  "angular-acceleration": { "rad-s2": 1, "deg-s2": PI / 180, "rev-s2": 2 * PI, "rpm-s": (2 * PI) / 60, "rad-min2": 1 / 3600 },
  density: { // base: kg/m³
    "kg-m3": 1, "g-cm3": 1e3, "g-ml": 1e3, "kg-l": 1e3, "g-l": 1, "mg-l": 1e-3, "lb-ft3": LB / FT3,
    "lb-in3": LB / IN3, "lb-gal": LB / GAL_US, "oz-in3": OZ / IN3, "slug-ft3": SLUG / FT3,
  },
  "specific-volume": { "m3-kg": 1, "l-kg": 1e-3, "cm3-g": 1e-3, "ft3-lb": FT3 / LB, "gal-lb": GAL_US / LB },
  "moment-of-inertia": {
    "kg-m2": 1, "kg-cm2": 1e-4, "g-cm2": 1e-7, "lb-ft2": LB * FT2, "lb-in2": LB * IN2, "slug-ft2": SLUG * FT2,
  },
  torque: {
    "n-m": 1, "kn-m": 1e3, "n-cm": 0.01, "kgf-m": 9.80665, "kgf-cm": 9.80665 / 100, "lbf-ft": LBF * FT, "lbf-in": LBF * IN,
    "ozf-in": (LBF / 16) * IN, "dyn-cm": 1e-7,
  },
  "fuel-efficiency-mass": {
    "j-kg": 1, "kj-kg": 1e3, "mj-kg": 1e6, "cal-g": CAL_TH * 1e3, "kcal-kg": CAL_TH * 1e3, "btu-lb": BTU / LB,
  },
  "fuel-efficiency-volume": {
    "j-m3": 1, "j-l": 1e3, "kj-l": 1e6, "mj-m3": 1e6, "kcal-m3": 1e3 * CAL_TH, "btu-ft3": BTU / FT3, "btu-gal": BTU / GAL_US,
  },
  "temperature-interval": { "delta-k": 1, "delta-c": 1, "delta-f": 5 / 9, "delta-r": 5 / 9, "delta-re": 1.25 },
  "thermal-expansion": { "per-k": 1, "per-c": 1, "per-f": 1.8, "per-r": 1.8, "ppm-k": 1e-6 },
  "thermal-resistance": { "k-w": 1, "c-w": 1, "f-h-btu": ((5 / 9) * 3600) / BTU },
  "thermal-conductivity": {
    "w-mk": 1, "w-cmk": 100, "btu-hftf": BTU / 3600 / FT / (5 / 9), "btu-in-hft2f": (BTU * IN) / (3600 * FT2 * (5 / 9)),
    "kcal-hmc": (1e3 * CAL_IT) / 3600, "cal-scmc": CAL_TH * 100,
  },
  "specific-heat-capacity": {
    "j-kgk": 1, "kj-kgk": 1e3, "j-gc": 1e3, "cal-gc": CAL_TH * 1e3, "kcal-kgc": CAL_TH * 1e3, "btu-lbf": CAL_IT * 1e3,
  },
  "heat-density": {
    "j-m2": 1, "kj-m2": 1e3, "wh-m2": 3600, "kcal-m2": 1e3 * CAL_TH, "cal-cm2": CAL_TH * 1e4, langley: CAL_TH * 1e4,
    "btu-ft2": BTU / FT2,
  },
  "heat-flux-density": {
    "w-m2": 1, "kw-m2": 1e3, "w-cm2": 1e4, "btu-hft2": BTU / 3600 / FT2, "kcal-hm2": (1e3 * CAL_IT) / 3600,
    "cal-scm2": CAL_TH * 1e4,
  },
  "heat-transfer-coefficient": {
    "w-m2k": 1, "w-cm2k": 1e4, "btu-hft2f": BTU / 3600 / FT2 / (5 / 9), "kcal-hm2c": (1e3 * CAL_IT) / 3600,
    "cal-scm2c": CAL_TH * 1e4,
  },
  charge: {
    c: 1, mc: 1e-3, uc: 1e-6, nc: 1e-9, ah: 3600, mah: 3.6, abc: 10, statc: 1 / (10 * C), faraday: NA * E, e: E,
  },
  "linear-charge-density": { "c-m": 1, "c-cm": 100, "c-in": 1 / IN, "uc-m": 1e-6, "abc-cm": 10 / 0.01 },
  "surface-charge-density": { "c-m2": 1, "c-cm2": 1e4, "c-in2": 1 / IN2, "uc-cm2": 1e-6 / 1e-4, "abc-cm2": 10 / 1e-4 },
  "volume-charge-density": { "c-m3": 1, "c-cm3": 1e6, "c-in3": 1 / IN3, "uc-cm3": 1 },
  current: { a: 1, ma: 1e-3, ua: 1e-6, ka: 1e3, aba: 10, stata: 1 / (10 * C) },
  "linear-current-density": { "a-m": 1, "a-cm": 100, "a-in": 1 / IN, "a-mm": 1e3 },
  "surface-current-density": { "a-m2": 1, "a-cm2": 1e4, "a-in2": 1 / IN2, "ma-cm2": 1e-3 / 1e-4 },
  "electric-field-strength": {
    "v-m": 1, "kv-m": 1e3, "v-cm": 100, "v-mm": 1e3, "kv-cm": 1e5, "v-in": 1 / IN, "statv-cm": (C / 1e6) / 0.01,
  },
  "electric-potential": { v: 1, uv: 1e-6, mv: 1e-3, kv: 1e3, megav: 1e6, abv: 1e-8, statv: C / 1e6 },
  "electric-resistance": { ohm: 1, uohm: 1e-6, milliohm: 1e-3, kohm: 1e3, megohm: 1e6, gigohm: 1e9, abohm: 1e-9, statohm: C * C * 1e-5 },
  "electric-resistivity": {
    "ohm-m": 1, "ohm-cm": 0.01, "ohm-mm2-m": 1e-6, "uohm-cm": 1e-8, "ohm-cmil-ft": ((PI / 4) * (IN / 1000) ** 2) / FT,
  },
  "electric-conductance": { s: 1, us: 1e-6, ms: 1e-3, ks: 1e3, mho: 1, abmho: 1e9, statmho: 1 / (C * C * 1e-5) },
  "electric-conductivity": { "s-m": 1, "s-cm": 100, "ms-cm": 0.1, "us-cm": 1e-4, "mho-m": 1 },
  capacitance: { f: 1, mf: 1e-3, uf: 1e-6, nf: 1e-9, pf: 1e-12, abf: 1e9, statf: 1 / (C * C * 1e-5) },
  inductance: { h: 1, mh: 1e-3, uh: 1e-6, nh: 1e-9, abh: 1e-9, stath: C * C * 1e-5 },
  "magnetomotive-force": { at: 1, kat: 1e3, gilbert: 10 / (4 * PI) },
  "magnetic-field-strength": { "a-m": 1, "ka-m": 1e3, oersted: 1000 / (4 * PI), koe: 1e6 / (4 * PI), "at-in": 1 / IN },
  "magnetic-flux": { wb: 1, mwb: 1e-3, uwb: 1e-6, maxwell: 1e-8, "v-s": 1 },
  "magnetic-flux-density": { t: 1, mt: 1e-3, ut: 1e-6, nt: 1e-9, gauss: 1e-4, kgauss: 1e3 * 1e-4, gamma: 1e-9, "wb-m2": 1 },
  flow: { // base: m³/s
    "m3-s": 1, "l-s": 1e-3, "l-min": 1e-3 / 60, "ml-min": 1e-6 / 60, "l-h": 1e-3 / 3600, "m3-h": 1 / 3600, "m3-day": 1 / 86400,
    gpm: GAL_US / 60, gph: GAL_US / 3600, "uk-gpm": GAL_UK / 60, "ft3-s": FT3, cusec: FT3, cfm: FT3 / 60,
    mgd: (1e6 * GAL_US) / 86400, "bbl-day": (42 * GAL_US) / 86400, "acre-ft-day": (ACRE_FT2 * FT3) / 86400,
  },
  "flow-mass": {
    "kg-s": 1, "g-s": 1e-3, "kg-min": 1 / 60, "kg-h": 1 / 3600, "t-h": 1e3 / 3600, "lb-s": LB, "lb-min": LB / 60, "lb-h": LB / 3600,
  },
  "flow-molar": { "mol-s": 1, "mmol-s": 1e-3, "kmol-s": 1e3, "mol-min": 1 / 60, "mol-h": 1 / 3600, "kmol-h": 1e3 / 3600 },
  "mass-flux-density": { "kg-m2s": 1, "g-cm2s": 1e-3 / 1e-4, "kg-m2h": 1 / 3600, "lb-ft2s": LB / FT2, "lb-ft2h": LB / FT2 / 3600 },
  "concentration-molar": { "mol-m3": 1, "mol-l": 1e3, "mmol-l": 1, "umol-l": 1e-3, "nmol-l": 1e-6 },
  "concentration-solution": { // base: g/L
    "g-l": 1, "mg-l": 1e-3, "ug-l": 1e-6, "g-ml": 1e3, "mg-ml": 1, "g-dl": 10, "mg-dl": 0.01, ppm: 1e-3,
    "lb-gal": (LB * 1e3) / (GAL_US * 1e3), "gr-gal": (GRAIN * 1e3) / (GAL_US * 1e3),
  },
  "viscosity-dynamic": {
    "pa-s": 1, "mpa-s": 1e-3, poise: 0.1, cp: 1e-3, "lbf-s-ft2": LBF / FT2, "lb-ft-s": LB / FT, "kgf-s-m2": 9.80665,
  },
  "viscosity-kinematic": { "m2-s": 1, "mm2-s": 1e-6, "cm2-s": 1e-4, stokes: 1e-4, cst: 1e-6, "ft2-s": FT2, "in2-s": IN2 },
  "surface-tension": {
    "n-m": 1, "mn-m": 1e-3, "dyn-cm": 1e-5 / 1e-2, "erg-cm2": 1e-7 / 1e-4, "lbf-in": LBF / IN, "lbf-ft": LBF / FT,
    "gf-cm": (9.80665e-3) / 0.01,
  },
  permeability: { m2: 1, darcy: 9.869233e-13, millidarcy: 9.869233e-16, cm2: 1e-4, um2: 1e-12 },
  luminance: {
    "cd-m2": 1, nit: 1, "cd-cm2": 1e4, stilb: 1e4, fl: 1 / PI / FT2, lambert: 1e4 / PI, apostilb: 1 / PI,
  },
  "luminous-intensity": { cd: 1, mcd: 1e-3, kcd: 1e3, candlepower: 1 },
  illuminance: { lux: 1, klux: 1e3, "lm-m2": 1, fc: 1 / FT2, phot: 1e4, nox: 1e-3 },
  "image-resolution": { dpm: 1, dpi: 1 / IN, ppi: 1 / IN, dpcm: 100, ppcm: 100 },
  "frequency-wavelength": {
    hz: 1, khz: 1e3, mhz: 1e6, ghz: 1e9, thz: 1e12, m: { inv: C }, cm: { inv: C * 100 }, mm: { inv: C * 1e3 },
    um: { inv: C * 1e6 }, nm: { inv: C * 1e9 },
  },
  "radiation-dose": { sv: 1, msv: 1e-3, usv: 1e-6, rem: 0.01, mrem: 1e-5 },
  "radiation-activity": {
    bq: 1, kbq: 1e3, mbq: 1e6, gbq: 1e9, ci: 3.7e10, mci: 3.7e7, uci: 3.7e4, nci: 37, pci: 0.037, rd: 1e6,
  },
  "radiation-exposure": { "c-kg": 1, "mc-kg": 1e-3, r: 2.58e-4, mr: 2.58e-7 },
  "radiation-absorbed-dose": { gy: 1, mgy: 1e-3, ugy: 1e-6, rad: 0.01, "j-kg": 1, "erg-g": 1e-7 / 1e-3 },
  prefixes: {
    quetta: 1e30, ronna: 1e27, yotta: 1e24, zetta: 1e21, exa: 1e18, peta: 1e15, tera: 1e12, giga: 1e9, mega: 1e6,
    kilo: 1e3, hecto: 1e2, deca: 10, one: 1, deci: 0.1, centi: 0.01, milli: 1e-3, micro: 1e-6, nano: 1e-9,
    pico: 1e-12, femto: 1e-15, atto: 1e-18, zepto: 1e-21, yocto: 1e-24, ronto: 1e-27, quecto: 1e-30,
  },
  "data-transfer": {
    bps: 1, kbps: 1e3, mbps: 1e6, gbps: 1e9, tbps: 1e12, "byte-s": 8, "kb-s": 8e3, "mb-s": 8e6, "gb-s": 8e9,
    "kib-s": 8 * 1024, "mib-s": 8 * 1024 ** 2,
  },
  "sound-level": { db: 1, bel: 10, np: 20 / Math.log(10) },
  typography: { // base: mm, CSS 96 px per inch, em/rem at the default 16 px
    mm: 1, cm: 10, inch: 25.4, pt: 25.4 / 72, pica: 25.4 / 6, px: 25.4 / 96, twip: 25.4 / 1440,
    em: (16 * 25.4) / 96, rem: (16 * 25.4) / 96,
  },
  "volume-lumber": {
    m3: 1, ft3: FT3, "board-foot": FT3 / 12, mbf: (1000 * FT3) / 12, cord: 128 * FT3, "hoppus-ft": (4 / PI) * FT3,
  },
};

const refBase = (ref, x) => (typeof ref === "function" ? ref(x) : typeof ref === "number" ? x * ref : ref.inv / x);
const relDiff = (a, b) => (a === b ? 0 : Math.abs(a - b) / Math.max(Math.abs(a), Math.abs(b)));

describe("independent reference table (NIST SP 811 / exact SI)", () => {
  it("covers every category and every unit", () => {
    for (const c of UNIT_CATEGORIES) {
      expect(REF[c.id], `no reference for ${c.id}`).toBeTruthy();
      const ids = getUnits(c.id).map((u) => u.id).sort();
      expect(Object.keys(REF[c.id]).sort(), c.id).toEqual(ids);
    }
  });

  it("the engine agrees with the reference for every unit (relative difference ≤ 1e-6)", () => {
    const findings = [];
    for (const c of UNIT_CATEGORIES) {
      for (const [id, ref] of Object.entries(REF[c.id] ?? {})) {
        for (const x of [1, 2.5]) {
          const engine = convert(x, id, c.baseUnit, c.id);
          const want = refBase(ref, x);
          const d = relDiff(engine, want);
          if (!(d <= 1e-6)) findings.push(`${c.id}/${id} at ${x}: engine ${engine}, reference ${want} (diff ${d.toExponential(2)})`);
        }
      }
    }
    expect(findings).toEqual([]);
  });

  it("land: marla and kanal follow all three marla standards", () => {
    for (const size of [272.25, 250, 225]) {
      expect(convert(1, "marla", "sq-ft", "zameen", { marlaSize: size })).toBeCloseTo(size, 9);
      expect(convert(1, "kanal", "sq-ft", "zameen", { marlaSize: size })).toBeCloseTo(20 * size, 9);
    }
  });
});

// "1,234.5" -> 1234.5
const num = (s) => Number(s.replace(/,/g, ""));
// Finds a unit of the category by its symbol (or name/alias) as written in page text.
function unitBySymbol(category, text) {
  const exact = text.trim();
  const t = exact.toLowerCase();
  const units = getUnits(category);
  return (
    units.find((u) => u.symbol === exact) ??
    units.find((u) => u.symbol.toLowerCase() === t) ??
    units.find((u) => u.name.toLowerCase() === t || u.name.toLowerCase() + "s" === t) ??
    units.find((u) => (u.aliases ?? []).some((a) => a.toLowerCase() === t)) ??
    null
  );
}

// Every "A x = B y" statement in a quick answer (or a title in brackets).
function statements(text) {
  const out = [];
  const re = /(-?[\d,]*\.?\d+)\s+([^=()0-9][^=()]*?)\s*=\s*(-?[\d,]*\.?\d+)\s+([^=(),]+?)(?=\s*(?:=|\(|\)|$|,| for | –|\s-\s))/g;
  for (const m of text.matchAll(re)) out.push({ a: m[1], from: m[2], b: m[3], to: m[4] });
  return out;
}

describe("pair pages agree with the engine", () => {
  it("every quick answer and every answer in a title equals the engine result", () => {
    const findings = [];
    const unchecked = [];
    for (const p of PAGES) {
      if (p.tool === "plot" || p.tool === "plot-size") continue;
      const texts = [p.quickAnswer, p.title.match(/\(([^()]*=[^()]*)\)/)?.[1], p.title.split(/\s[–-]\s/)[1]].filter((t) => t && t.includes("="));
      for (const text of texts) {
        const found = statements(text);
        if (found.length === 0) unchecked.push(`${p.slug}: "${text}"`);
        for (const s of found) {
          const from = unitBySymbol(p.unitCategory, s.from);
          const to = unitBySymbol(p.unitCategory, s.to.replace(/\s*\((US|UK|water|dilute water only)\)$/i, "").replace(/^(US|UK) /, (m) => m));
          if (!from || !to) {
            unchecked.push(`${p.slug}: "${s.a} ${s.from} = ${s.b} ${s.to}"`);
            continue;
          }
          const engine = formatResult(convert(num(s.a), from.id, to.id, p.unitCategory));
          if (engine !== s.b && relDiff(num(engine), num(s.b)) > 1e-4) findings.push(`${p.slug}: "${text}" but the engine gives ${engine} ${to.symbol}`);
        }
      }
    }
    expect(findings).toEqual([]);
    if (process.env.DUMP_UNCHECKED) console.log(["UNCHECKED " + unchecked.length, ...unchecked].join("\n"));
    // Statements this parser cannot read are listed in REVIEW.md; keep them few.
    expect(unchecked.length, unchecked.join("\n")).toBeLessThan(15);
  });

  it("every conversion table row equals the engine result", () => {
    const ROWS = [...Array.from({ length: 20 }, (_, i) => i + 1), 25, 30, 40, 50, 75, 100];
    for (const p of PAGES) {
      if (p.tool === "plot" || p.tool === "plot-size") continue;
      const data = categoryData(p.unitCategory);
      for (const n of ROWS) {
        expect(convertWith(data, n, p.from, p.to), `${p.slug} row ${n}`).toBe(convert(n, p.from, p.to, p.unitCategory));
      }
    }
  });

  it("every reverse pair is the exact inverse", () => {
    for (const p of PAGES) {
      if (p.tool || p.from === p.to) continue;
      const rev = PAGES.find((q) => q !== p && !q.tool && q.unitCategory === p.unitCategory && q.from === p.to && q.to === p.from);
      if (!rev) continue;
      for (const x of [1, 7.5, 123.456]) {
        const back = convert(convert(x, p.from, p.to, p.unitCategory), rev.from, rev.to, rev.unitCategory);
        expect(relDiff(back, x), `${p.slug} <-> ${rev.slug} at ${x}`).toBeLessThan(1e-12);
      }
      const cat = getUnitCategory(p.unitCategory);
      const kindOf = (id) => getUnits(cat.id).find((u) => u.id === id)?.kind;
      if (cat && kindOf(p.from) === "linear" && kindOf(p.to) === "linear") {
        const product = convert(1, p.from, p.to, p.unitCategory) * convert(1, rev.from, rev.to, rev.unitCategory);
        expect(relDiff(product, 1), `${p.slug} × ${rev.slug}`).toBeLessThan(1e-12);
      }
    }
  });
});
