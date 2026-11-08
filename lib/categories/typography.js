import { linear } from "./helpers.js";

// TYPOGRAPHY (base: millimeter). CSS units: 1 in = 96 px = 72 pt = 6 pc.
// em and rem depend on the base font size (option "baseFontPx", default
// 16 px), the same way land units depend on the marla size.
export const DEFAULT_BASE_FONT_PX = 16;
const PX = 25.4 / 96;

function buildUnits({ baseFontPx = DEFAULT_BASE_FONT_PX } = {}) {
  return [
    linear("mm", "Millimeter", "mm", 1, { aliases: ["millimeters", "millimetres"] }),
    linear("cm", "Centimeter", "cm", 10, { aliases: ["centimeters", "centimetres"] }),
    linear("inch", "Inch", "in", 25.4, { aliases: ["inches", "in"] }),
    linear("pt", "Point", "pt", 25.4 / 72, { aliases: ["points", "pt", "dtp point"] }),
    linear("pica", "Pica", "pc", 25.4 / 6, { aliases: ["picas", "pc"] }),
    linear("px", "Pixel (96 dpi)", "px", PX, { aliases: ["pixels", "css pixel"] }),
    linear("twip", "Twip", "twip", 25.4 / 1440, { aliases: ["twips"] }),
    linear("em", "Em", "em", baseFontPx * PX, { aliases: ["ems"] }),
    linear("rem", "Rem (root em)", "rem", baseFontPx * PX, { aliases: ["root em", "rems"] }),
  ];
}

const category = {
  id: "typography",
  name: "Typography",
  group: "other",
  baseUnit: "mm",
  defaultFrom: "px",
  defaultTo: "pt",
  // A setting shown as buttons above the result (see components/UnitOptionPicker.js).
  option: {
    key: "baseFontPx",
    label: "Base font size (for em and rem)",
    choices: [10, 12, 14, 16, 18, 20],
    defaultValue: DEFAULT_BASE_FONT_PX,
    suffix: "px",
  },
  buildUnits,
  intro:
    "Typography units measure text and page layout. Web designers use px and rem, print designers use points and picas, and em and rem depend on the base font size, usually 16 px in browsers.",
  units: buildUnits(),
};

export default category;
