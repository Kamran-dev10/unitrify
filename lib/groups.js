// Groups of converters (Engineering, Light, ...): names, page text, and
// which categories and tools belong to each. Used by the group pages
// (/converters/<group>), the /converters list, the header menu, the
// homepage, breadcrumbs and the footer. Server only.

import { GROUPS } from "./categories/index.js";
import { CATEGORIES, getCategory } from "./categories.js";
import { PAGES, pageUrl, getPageBySlug } from "./pages.js";
import { TOOLS, TOOL_PAGES, toolPageUrl } from "./tools.js";

// Tools are not unit categories, so they are placed in a group here.
const TOOL_GROUP = {
  "currency-converter": "common",
  "case-converter": "other",
  "number-converter": "other",
};

// Hand-picked popular pages where the first pages of a category are not the best ones.
const POPULAR_OVERRIDE = {
  zameen: ["marla-to-sq-ft", "kanal-to-marla", "plot-size-calculator"],
};

const GROUP_TEXT = {
  common: {
    name: "Everyday units",
    keywords: { primary: "everyday unit converter", secondary: ["everyday units","common unit conversions"] },
    h1: "Everyday Unit Converters",
    title: "Everyday Unit Converters – Length, Weight, Currency",
    description:
      "Everyday unit converter pages for length, weight, temperature, area, volume, speed, time, data storage and currency, each with tables and quick answers.",
    intro: "The everyday units most people need, with common unit conversions for length, weight, temperature, area, volume, speed, time, data storage and live currency rates.",
  },
  land: {
    name: "Pakistani land",
    keywords: { primary: "land measurement converter", secondary: ["pakistani land units","marla size"] },
    h1: "Pakistani Land Measurement Converters",
    title: "Land Measurement Converters – Marla, Kanal, Acre",
    description:
      "Land measurement converter pages for Pakistan: marla, kanal, acre and murabba with all three marla standards, a plot size calculator and plot sizes.",
    intro: "Marla, kanal, acre and murabba converters for Pakistan. Every land converter lets you pick the 272.25, 250 or 225 sq ft marla, and the plot size calculator turns length × width in feet into marla and kanal.",
    // Longer text shown under the cards. Each paragraph is a list of
    // strings and links ({ href, text }).
    about: [
      [
        "Marla and kanal are used in Pakistan's Punjab and, in India, in Punjab, Haryana, Himachal Pradesh and Jammu & Kashmir. ",
        "A kanal is always 20 marla (",
        { href: "/zameen/kanal-to-marla", text: "kanal to marla" },
        "), and plot sizes such as 5 marla, 10 marla or 1 kanal are how houses and plots are usually advertised. To check a size in square feet, use ",
        { href: "/zameen/marla-to-sq-ft", text: "marla to sq ft" },
        " or the ",
        { href: "/zameen/plot-size-calculator", text: "plot size calculator" },
        ".",
      ],
      [
        "The marla itself is not one fixed size. Revenue records use 272.25 sq ft, which is a square 16.5 feet on each side. Many urban housing societies and development authorities use 225 or 250 sq ft, and the size can differ from one society to another, so buyers should check the size stated in their allotment or sale documents. ",
        "Because a kanal is 20 marla, the same \"1 kanal\" can be 5,445, 5,000 or 4,500 sq ft, so always check which marla size a document or listing uses.",
      ],
      [
        "Larger farm land is measured in acres and murabbas. With the 272.25 sq ft marla, 1 acre (43,560 sq ft) is exactly 8 kanal (",
        { href: "/zameen/acre-to-kanal", text: "acre to kanal" },
        "). A murabba is 25 acres (",
        { href: "/zameen/murabba-to-acre", text: "murabba to acre" },
        "). The word murabba means \"square\". It comes from the canal colonies of British-era Punjab (created between 1885 and 1940), where farmland was surveyed into rectangles of 25 killas (25 acres) each. In Punjab (Pakistan and India) and Haryana a murabba is 25 acres, but in Rajasthan's Indira Gandhi Canal area a murabba is 15.625 acres, so always check which one a document means. See every land unit on the ",
        { href: "/zameen", text: "Pakistani land converter" },
        ".",
      ],
    ],
  },
  engineering: {
    name: "Engineering",
    keywords: { primary: "engineering unit converter", secondary: ["mechanical engineering units","engineering conversions"] },
    h1: "Engineering Unit Converters",
    title: "Engineering Converters – Torque, Density, Acceleration",
    description:
      "Engineering unit converter pages for torque, density, acceleration, angular velocity, specific volume and moment of inertia, checked against NIST.",
    intro: "Mechanical engineering units for torque, density, acceleration and rotation, with exact factors from NIST SP 811 for quick engineering conversions.",
  },
  heat: {
    name: "Heat and temperature",
    keywords: { primary: "heat and temperature converter", secondary: ["temperature readings","heat transfer units"] },
    h1: "Heat and Temperature Converters",
    title: "Heat and Temperature Converters – °C, K, BTU, U-value",
    description:
      "Heat and temperature converter pages for readings, temperature change, thermal conductivity, U-values, specific heat, heat flux and fuel energy.",
    intro: "Temperature readings and differences, plus heat transfer units for insulation, HVAC and fuel energy, used in building and process work.",
  },
  electricity: {
    name: "Electricity",
    keywords: { primary: "electricity unit converter", secondary: ["electrical units","exact si definitions"] },
    h1: "Electricity Unit Converters",
    title: "Electricity Converters – Volts, Amps, Ohms, Farads",
    description:
      "Electricity unit converter pages for voltage, current, charge, mAh, resistance, conductance, capacitance, inductance and water EC, using exact SI values.",
    intro: "Electrical units for electronics, batteries and power: voltage, current, charge, resistance, capacitance, inductance and conductivity, with exact SI definitions.",
  },
  magnetism: {
    name: "Magnetism",
    keywords: { primary: "magnetism unit converter", secondary: ["magnetic units","tesla and gauss"] },
    h1: "Magnetism Unit Converters",
    title: "Magnetism Converters – Tesla, Gauss, Oersted, Weber",
    description:
      "Magnetism unit converter pages for flux density (tesla, gauss), field strength (A/m, oersted), magnetic flux (weber, maxwell) and ampere-turns.",
    intro: "Magnetic units in SI and the older CGS system: tesla and gauss, A/m and oersted, weber and maxwell, and ampere-turns. Magnet makers, electrical engineers and physics students use them for magnets, coils and sensors.",
  },
  fluids: {
    name: "Fluids",
    keywords: { primary: "fluid unit converter", secondary: ["flow rates","liquids and gases"] },
    h1: "Fluid Unit Converters",
    title: "Fluid Converters – Flow Rate, Viscosity, Concentration",
    description:
      "Fluid unit converter pages for flow rate (cusec, GPM, CFM), mass and molar flow, viscosity, concentration, surface tension and permeability.",
    intro: "Units for liquids and gases: flow rates from cusecs to CFM, viscosity, concentration, surface tension and rock permeability.",
  },
  light: {
    name: "Light",
    keywords: { primary: "light unit converter", secondary: ["optics units","lux and foot-candles"] },
    h1: "Light Unit Converters",
    title: "Light Converters – Lux, Nits, Candela, Wavelength",
    description:
      "Light unit converter pages for illuminance (lux, foot-candles), luminance (nits), luminous intensity, image resolution (dpi) and wavelength.",
    intro: "Lighting, display and optics units: lux and foot-candles, nits, candelas, dpi and the link between frequency and wavelength.",
  },
  radiology: {
    name: "Radiology",
    keywords: { primary: "radiation unit converter", secondary: ["radiation dose","absorbed dose"] },
    h1: "Radiation Unit Converters",
    title: "Radiation Converters – Sievert, Rem, Gray, Becquerel",
    description:
      "Radiation unit converter pages for dose (sievert, rem), absorbed dose (gray, rad), radioactivity (becquerel, curie) and exposure. For information only.",
    intro: "Radiation dose, absorbed dose, activity and exposure units, old and new. For information only, not for medical or safety decisions.",
  },
  other: {
    name: "Other units and tools",
    keywords: { primary: "converters and tools", secondary: ["metric prefixes","internet speeds"] },
    h1: "Other Converters and Tools",
    title: "Other Converters – Prefixes, Data Rate, px, Case",
    description:
      "Other converters and tools: metric prefixes, data transfer rate, decibels, typography (px, pt, rem), lumber volume, text case and number bases.",
    intro: "Handy converters that do not fit elsewhere: metric prefixes, internet speeds, decibels, font sizes, lumber, text case and number systems.",
  },
};

// Order used across the site (menu, homepage, footer, /converters).
const ORDER = ["common", "land", "engineering", "heat", "electricity", "magnetism", "fluids", "light", "radiology", "other"];

function categoryItem(c) {
  const pages = PAGES.filter((p) => p.category === c.id).map((p) => ({ slug: p.slug, h1: p.h1, href: pageUrl(p) }));
  const override = POPULAR_OVERRIDE[c.id]?.map(getPageBySlug).filter(Boolean).map((p) => ({ slug: p.slug, h1: p.h1, href: pageUrl(p) }));
  const nonSize = PAGES.filter((p) => p.category === c.id && p.tool !== "plot-size");
  const popular = override ?? nonSize.slice(0, 3).map((p) => ({ slug: p.slug, h1: p.h1, href: pageUrl(p) }));
  return { id: c.id, name: c.name, h1: c.h1, href: `/${c.id}`, description: c.metaDescription, pages, popular };
}

function toolItem(t) {
  const pages = TOOL_PAGES.filter((p) => p.tool === t.id).map((p) => ({ slug: p.slug, h1: p.h1, href: toolPageUrl(p) }));
  return { id: t.id, name: t.name, h1: t.h1, href: `/${t.id}`, description: t.metaDescription, pages, popular: pages.slice(0, 3) };
}

export const CONVERTER_GROUPS = ORDER.filter((id) => GROUPS.includes(id)).map((id) => {
  const items = [
    ...CATEGORIES.filter((c) => c.group === id).map(categoryItem),
    ...TOOLS.filter((t) => TOOL_GROUP[t.id] === id).map(toolItem),
  ];
  return { id, path: groupPath(id), added: "2026-11-09", ...GROUP_TEXT[id], items };
}).filter((g) => g.items.length > 0);

export function groupPath(id) {
  return `/converters/${id}`;
}

export function getGroup(id) {
  return CONVERTER_GROUPS.find((g) => g.id === id) ?? null;
}

// Breadcrumb item for the group a category or tool belongs to.
export function groupCrumbFor(categoryOrToolId) {
  const groupId = getCategory(categoryOrToolId)?.group ?? TOOL_GROUP[categoryOrToolId];
  const g = getGroup(groupId);
  return g ? { name: g.name, path: g.path } : null;
}

// The /converters page itself.
export const ALL_CONVERTERS_PAGE = {
  path: "/converters",
  h1: "All Unit Converters",
  title: "All Unit Converters – Full List A to Z",
  description:
    "All unit converters on the site in one list: every group, unit category and pair page, from length and weight to radiation, magnetism and typography.",
  intro: "The complete unit converter list, grouped by topic: pick a group, a unit category or a single conversion.",
  keywords: { primary: "all unit converters", secondary: ["unit converter list", "single conversion"] },
  added: "2026-11-09",
};

// Small data for the header menu (names and links only).
export function menuGroups() {
  return CONVERTER_GROUPS.map((g) => ({
    id: g.id,
    name: g.name,
    href: g.path,
    items: g.items.map((i) => ({ id: i.id, name: i.name, href: i.href })),
  }));
}
