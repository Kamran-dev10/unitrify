import { linear } from "./helpers.js";

// ELECTRIC RESISTANCE (base: ohm). abohm = 1e-9 Ω, statohm = c² × 1e-5 Ω (exact).
const category = {
  id: "electric-resistance",
  name: "Electric resistance",
  group: "electricity",
  baseUnit: "ohm",
  defaultFrom: "kohm",
  defaultTo: "ohm",
  intro:
    "Electric resistance is how strongly something opposes current, measured in ohms (Ω). Electronics makers read resistor values in Ω, kΩ and MΩ, and electricians test wiring and insulation with it.",
  units: [
    linear("ohm", "Ohm", "Ω", 1, { aliases: ["ohms"] }),
    linear("uohm", "Microohm", "µΩ", 1e-6, { aliases: ["microohms", "micro ohm"] }),
    linear("milliohm", "Milliohm", "mΩ", 1e-3, { aliases: ["milliohms", "milli ohm"] }),
    linear("kohm", "Kiloohm", "kΩ", 1000, { aliases: ["kilohms", "kiloohms", "k ohm"] }),
    linear("megohm", "Megaohm", "MΩ", 1e6, { aliases: ["megohms", "megaohms", "mega ohm"] }),
    linear("abohm", "Abohm", "abΩ", 1e-9, { aliases: ["abohms", "emu of resistance"] }),
    linear("statohm", "Statohm", "statΩ", 299792458 ** 2 * 1e-5, { aliases: ["statohms", "esu of resistance"] }),
  ],
};

export default category;
