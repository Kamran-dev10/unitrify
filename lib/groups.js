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
    h1: "Everyday Unit Converters",
    title: "Everyday Unit Converters – Length, Weight, Currency",
    description:
      "Everyday unit converters for length, weight, temperature, area, volume, speed, time, data storage and currency, each with tables and quick answers.",
    intro: "The converters most people need: length, weight, temperature, area, volume, speed, time, data storage and live currency rates.",
  },
  land: {
    name: "Pakistani land",
    h1: "Pakistani Land Converters",
    title: "Pakistani Land Converters – Marla, Kanal, Acre",
    description:
      "Pakistani land converters for marla, kanal, acre and murabba with all three marla standards, a plot size calculator and popular plot size answers.",
    intro: "Marla, kanal, acre and murabba converters for Pakistan. Every land converter lets you pick the 272.25, 250 or 225 sq ft marla, and the plot size calculator turns length × width in feet into marla and kanal.",
    // Longer text shown under the cards. Each paragraph is a list of
    // strings and links ({ href, text }).
    about: [
      [
        "Land in Pakistan, and in parts of northern India, is often measured in marla and kanal rather than square feet [VERIFY: which Indian states]. ",
        "A kanal is always 20 marla (",
        { href: "/zameen/kanal-to-marla", text: "kanal to marla" },
        "), and plot sizes such as 5 marla, 10 marla or 1 kanal are how houses and plots are usually advertised. To check a size in square feet, use ",
        { href: "/zameen/marla-to-sq-ft", text: "marla to sq ft" },
        " or the ",
        { href: "/zameen/plot-size-calculator", text: "plot size calculator" },
        ".",
      ],
      [
        "The marla itself is not one fixed size. The revenue marla is 272.25 sq ft, which is a square 16.5 feet on each side. Many housing schemes use a rounded 250 sq ft marla, and 225 sq ft is also common in some cities [VERIFY: which cities and authorities]. ",
        "Because a kanal is 20 marla, the same \"1 kanal\" can be 5,445, 5,000 or 4,500 sq ft, so always check which marla size a document or listing uses.",
      ],
      [
        "Larger farm land is measured in acres and murabbas. With the 272.25 sq ft marla, 1 acre (43,560 sq ft) is exactly 8 kanal (",
        { href: "/zameen/acre-to-kanal", text: "acre to kanal" },
        "). A murabba is 25 acres (",
        { href: "/zameen/murabba-to-acre", text: "murabba to acre" },
        "); the word means \"square\" and comes from the square blocks used to divide canal-irrigated land in Punjab [VERIFY]. See every land unit on the ",
        { href: "/zameen", text: "Pakistani land converter" },
        ".",
      ],
    ],
  },
  engineering: {
    name: "Engineering",
    h1: "Engineering Unit Converters",
    title: "Engineering Converters – Torque, Density, Acceleration",
    description:
      "Engineering unit converters for torque, density, acceleration, angular velocity, specific volume and moment of inertia, checked against NIST values.",
    intro: "Mechanical engineering units for torque, density, acceleration and rotation, with exact factors from NIST SP 811.",
  },
  heat: {
    name: "Heat and temperature",
    h1: "Heat and Temperature Converters",
    title: "Heat and Temperature Converters – °C, K, BTU, U-value",
    description:
      "Heat converters for temperature, temperature change, thermal conductivity, U-values, specific heat, heat flux and fuel energy, with clear unit tables.",
    intro: "Temperature readings and differences, plus heat transfer, insulation and fuel energy units for HVAC, building and process work.",
  },
  electricity: {
    name: "Electricity",
    h1: "Electricity Unit Converters",
    title: "Electricity Converters – Volts, Amps, Ohms, Farads",
    description:
      "Electricity converters for voltage, current, charge, mAh, resistance, conductance, capacitance, inductance and water EC, using exact SI definitions.",
    intro: "Electrical units for electronics, batteries and power: voltage, current, charge, resistance, capacitance, inductance and conductivity.",
  },
  magnetism: {
    name: "Magnetism",
    h1: "Magnetism Unit Converters",
    title: "Magnetism Converters – Tesla, Gauss, Oersted, Weber",
    description:
      "Magnetism converters for flux density (tesla, gauss), field strength (A/m, oersted), magnetic flux (weber, maxwell) and magnetomotive force.",
    intro: "Magnetic units in SI and the older CGS system: tesla and gauss, A/m and oersted, weber and maxwell, and ampere-turns. Magnet makers, electrical engineers and physics students use them for magnets, coils and sensors.",
  },
  fluids: {
    name: "Fluids",
    h1: "Fluid Unit Converters",
    title: "Fluid Converters – Flow Rate, Viscosity, Concentration",
    description:
      "Fluid converters for flow rate (cusec, GPM, CFM), mass and molar flow, viscosity, concentration, surface tension and permeability, with FAQs.",
    intro: "Units for liquids and gases: flow rates from cusecs to CFM, viscosity, concentration, surface tension and rock permeability.",
  },
  light: {
    name: "Light",
    h1: "Light Unit Converters",
    title: "Light Converters – Lux, Nits, Candela, Wavelength",
    description:
      "Light converters for illuminance (lux, foot-candles), luminance (nits), luminous intensity, image resolution (dpi) and frequency to wavelength.",
    intro: "Lighting, display and optics units: lux and foot-candles, nits, candelas, dpi and the link between frequency and wavelength.",
  },
  radiology: {
    name: "Radiology",
    h1: "Radiation Unit Converters",
    title: "Radiation Converters – Sievert, Rem, Gray, Becquerel",
    description:
      "Radiation converters for dose (sievert, rem), absorbed dose (gray, rad), radioactivity (becquerel, curie) and exposure (roentgen). For information only.",
    intro: "Radiation dose, absorbed dose, activity and exposure units, old and new. For information only, not for medical or safety decisions.",
  },
  other: {
    name: "Other units and tools",
    h1: "Other Converters and Tools",
    title: "Other Converters – Prefixes, Data Rate, px, Case",
    description:
      "More converters and tools: metric prefixes, data transfer rate, decibels, typography (px, pt, rem), lumber volume, text case and number bases.",
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
  return { id, path: groupPath(id), ...GROUP_TEXT[id], items };
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
  title: "All Converters – Every Unit Converter A to Z",
  description:
    "Every converter on the site in one list: all groups, unit categories and pair pages, from length and weight to radiation, magnetism and typography.",
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
