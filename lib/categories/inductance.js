import { linear } from "./helpers.js";

// INDUCTANCE (base: henry). abhenry = 1e-9 H, stathenry = c² × 1e-5 H (exact).
const category = {
  id: "inductance",
  name: "Inductance",
  group: "electricity",
  baseUnit: "h",
  defaultFrom: "mh",
  defaultTo: "uh",
  intro:
    "Inductance is how strongly a coil resists a change in current, measured in henries. Inductors in power supplies, filters and radios are marked in mH, µH or nH.",
  units: [
    linear("h", "Henry", "H", 1, { aliases: ["henries", "henrys"] }),
    linear("mh", "Millihenry", "mH", 1e-3, { aliases: ["millihenries", "millihenrys"] }),
    linear("uh", "Microhenry", "µH", 1e-6, { aliases: ["microhenries", "microhenrys", "uh"] }),
    linear("nh", "Nanohenry", "nH", 1e-9, { aliases: ["nanohenries", "nanohenrys"] }),
    linear("abh", "Abhenry", "abH", 1e-9, { aliases: ["abhenries", "emu of inductance"] }),
    linear("stath", "Stathenry", "statH", 299792458 ** 2 * 1e-5, { aliases: ["stathenries", "esu of inductance"] }),
  ],
};

export default category;
