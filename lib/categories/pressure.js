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
    linear("hpa", "Hectopascal", "hPa", 100, { aliases: ["hectopascals"] }),
    linear("mpa", "Megapascal", "MPa", 1e6, { aliases: ["megapascals", "n/mm2"] }),
    linear("gpa", "Gigapascal", "GPa", 1e9, { aliases: ["gigapascals"] }),
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
    linear("mh2o", "Meter of water", "mH₂O", 9806.65, { aliases: ["m h2o", "meters of water", "mwc"] }), // conventional: 1 m × 1000 kg/m³ × g (exact)
    linear("fth2o", "Foot of water", "ftH₂O", 0.3048 * 9806.65, { aliases: ["ft h2o", "feet of water", "feet of head"] }), // conventional (exact)
  ],
};

export default category;
