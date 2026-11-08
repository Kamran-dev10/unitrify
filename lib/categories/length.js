import { linear } from "./helpers.js";

// LENGTH (base: meter)
const category = {
  id: "length",
  name: "Length",
  group: "common",
  baseUnit: "m",
  defaultFrom: "m",
  defaultTo: "foot",
  intro:
    "Length measures distance. Convert between metric units (millimeters, centimeters, meters, kilometers) and imperial units (inches, feet, yards, miles).",
  units: [
    linear("mm", "Millimeter", "mm", 0.001, { aliases: ["millimeters", "millimetres", "millimetre"] }),
    linear("cm", "Centimeter", "cm", 0.01, { aliases: ["centimeters", "centimetres", "centimetre"] }),
    linear("m", "Meter", "m", 1, { aliases: ["meters", "metres", "metre"] }),
    linear("km", "Kilometer", "km", 1000, { aliases: ["kilometers", "kilometres", "kilometre"] }),
    linear("inch", "Inch", "in", 0.0254, { aliases: ["inches", '"'] }),
    linear("foot", "Foot", "ft", 0.3048, { aliases: ["feet", "'"] }),
    linear("yard", "Yard", "yd", 0.9144, { aliases: ["yards", "gaz"] }),
    linear("mile", "Mile", "mi", 1609.344, { aliases: ["miles"] }),
  ],
};

export default category;
