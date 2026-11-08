import { linear } from "./helpers.js";

// PRESSURE (base: pascal)
const category = {
  id: "pressure",
  name: "Pressure",
  group: "common",
  baseUnit: "pa",
  defaultFrom: "bar",
  defaultTo: "psi",
  intro:
    "Pressure is force spread over an area. You see it on tyre gauges (psi or bar), weather reports (millibar, hPa, inHg), blood pressure monitors (mmHg) and in engineering (kPa, MPa, ksi).",
  units: [
    linear("pa", "Pascal", "Pa", 1, { aliases: ["pascals", "n/m2"] }),
    linear("kpa", "Kilopascal", "kPa", 1e3, { aliases: ["kilopascals"] }),
    linear("mpa", "Megapascal", "MPa", 1e6, { aliases: ["megapascals", "n/mm2"] }),
    linear("bar", "Bar", "bar", 1e5, { aliases: ["bars"] }),
    linear("mbar", "Millibar", "mbar", 100, { aliases: ["millibars", "hpa", "hectopascal"] }),
    linear("atm", "Standard atmosphere", "atm", 101325, { aliases: ["atmosphere", "atmospheres"] }),
    linear("psi", "Pound per square inch", "psi", 6894.757293168, { aliases: ["lbf/in2", "pounds per square inch"] }),
    linear("ksi", "Kilopound per square inch", "ksi", 6894757.293168, { aliases: ["kpsi"] }),
    linear("torr", "Torr", "Torr", 101325 / 760, { aliases: ["torrs"] }),
    linear("mmhg", "Millimeter of mercury", "mmHg", 133.322387415, { aliases: ["mm hg", "millimeters of mercury"] }),
    linear("inhg", "Inch of mercury", "inHg", 3386.389, { aliases: ["in hg", "inches of mercury"] }),
    linear("kgf-cm2", "Kilogram-force per square centimeter", "kgf/cm²", 98066.5, { aliases: ["kg/cm2", "at", "technical atmosphere"] }),
    linear("inh2o", "Inch of water", "inH₂O", 249.08891, { aliases: ["in h2o", "inches of water", "inwc"] }),
  ],
};

export default category;
