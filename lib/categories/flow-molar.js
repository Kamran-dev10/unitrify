import { linear } from "./helpers.js";

// MOLAR FLOW RATE (base: mole per second).
const category = {
  id: "flow-molar",
  name: "Molar flow rate",
  group: "fluids",
  baseUnit: "mol-s",
  defaultFrom: "kmol-h",
  defaultTo: "mol-s",
  intro:
    "Molar flow rate is the amount of substance, in moles, that flows each second or hour. Chemical engineers use it for reactor feeds and gas streams, where reactions are balanced in moles.",
  units: [
    linear("mol-s", "Mole per second", "mol/s", 1, { aliases: ["moles per second", "mol/s"] }),
    linear("mmol-s", "Millimole per second", "mmol/s", 0.001, { aliases: ["millimoles per second", "mmol/s"] }),
    linear("kmol-s", "Kilomole per second", "kmol/s", 1000, { aliases: ["kilomoles per second", "kmol/s"] }),
    linear("mol-min", "Mole per minute", "mol/min", 1 / 60, { aliases: ["moles per minute", "mol/min"] }),
    linear("mol-h", "Mole per hour", "mol/h", 1 / 3600, { aliases: ["moles per hour", "mol/h"] }),
    linear("kmol-h", "Kilomole per hour", "kmol/h", 1000 / 3600, { aliases: ["kilomoles per hour", "kmol/h", "kmol/hr"] }),
  ],
};

export default category;
