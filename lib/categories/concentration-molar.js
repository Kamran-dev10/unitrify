import { linear } from "./helpers.js";

// MOLAR CONCENTRATION (base: mole per cubic meter). 1 mmol/L = 1 mol/m³.
const category = {
  id: "concentration-molar",
  name: "Molar concentration",
  group: "fluids",
  baseUnit: "mol-m3",
  defaultFrom: "mmol-l",
  defaultTo: "umol-l",
  intro:
    "Molar concentration (molarity) is the amount of a substance, in moles, in each liter of solution. Chemists write it as M, and blood tests often report glucose or electrolytes in mmol/L.",
  units: [
    linear("mol-m3", "Mole per cubic meter", "mol/m³", 1, { aliases: ["moles per cubic meter", "mol/m3"] }),
    linear("mol-l", "Mole per liter (molar)", "M", 1000, { aliases: ["molar", "mol/l", "moles per liter"] }),
    linear("mmol-l", "Millimole per liter (millimolar)", "mM", 1, { aliases: ["millimolar", "mmol/l", "millimoles per liter"] }),
    linear("umol-l", "Micromole per liter (micromolar)", "µM", 0.001, { aliases: ["micromolar", "umol/l", "µmol/l"] }),
    linear("nmol-l", "Nanomole per liter (nanomolar)", "nM", 1e-6, { aliases: ["nanomolar", "nmol/l"] }),
  ],
};

export default category;
