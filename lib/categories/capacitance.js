import { linear } from "./helpers.js";

// CAPACITANCE (base: farad). abfarad = 1e9 F, statfarad = 1 / (c² × 1e-5) F (exact).
const category = {
  id: "capacitance",
  name: "Capacitance",
  group: "electricity",
  baseUnit: "f",
  defaultFrom: "uf",
  defaultTo: "nf",
  intro:
    "Capacitance is how much charge a capacitor stores per volt, measured in farads. Capacitors are marked in µF, nF or pF, so electronics repairers often need to switch between these.",
  units: [
    linear("f", "Farad", "F", 1, { aliases: ["farads"] }),
    linear("mf", "Millifarad", "mF", 1e-3, { aliases: ["millifarads"] }),
    linear("uf", "Microfarad", "µF", 1e-6, { aliases: ["microfarads", "uf", "mfd"] }),
    linear("nf", "Nanofarad", "nF", 1e-9, { aliases: ["nanofarads"] }),
    linear("pf", "Picofarad", "pF", 1e-12, { aliases: ["picofarads", "puff"] }),
    linear("abf", "Abfarad", "abF", 1e9, { aliases: ["abfarads", "emu of capacitance"] }),
    linear("statf", "Statfarad", "statF", 1 / (299792458 ** 2 * 1e-5), { aliases: ["statfarads", "esu of capacitance"] }),
  ],
};

export default category;
