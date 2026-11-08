import { linear } from "./helpers.js";

// FORCE (base: newton)
const category = {
  id: "force",
  name: "Force",
  group: "common",
  baseUnit: "n",
  defaultFrom: "kgf",
  defaultTo: "n",
  intro:
    "Force is a push or pull that changes how something moves. Engineers and physics students use newtons, while kilogram-force and pound-force still appear on scales, load ratings and older machine specifications.",
  units: [
    linear("n", "Newton", "N", 1, { aliases: ["newtons"] }),
    linear("kn", "Kilonewton", "kN", 1e3, { aliases: ["kilonewtons"] }),
    linear("dyne", "Dyne", "dyn", 1e-5, { aliases: ["dynes"] }),
    linear("lbf", "Pound-force", "lbf", 4.4482216152605, { aliases: ["pound force", "pounds force"] }),
    linear("kgf", "Kilogram-force", "kgf", 9.80665, { aliases: ["kilogram force", "kilopond", "kp"] }),
    linear("ozf", "Ounce-force", "ozf", 0.27801385095378, { aliases: ["ounce force"] }),
    linear("poundal", "Poundal", "pdl", 0.138254954376, { aliases: ["poundals"] }),
  ],
};

export default category;
