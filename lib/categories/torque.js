import { linear } from "./helpers.js";

// TORQUE (base: newton meter). "Moment of force" uses the same units; /moment-of-force redirects here.
const category = {
  id: "torque",
  name: "Torque",
  group: "engineering",
  baseUnit: "n-m",
  defaultFrom: "n-m",
  defaultTo: "lbf-ft",
  searchAliases: ["moment of force"],
  intro:
    "Torque is a turning force, also called moment of force. Mechanics use it to tighten bolts and wheel nuts to the right setting, and engine specifications list it in N·m or lb·ft.",
  units: [
    linear("n-m", "Newton meter", "N·m", 1, { aliases: ["newton meters", "nm", "n·m"] }),
    linear("kn-m", "Kilonewton meter", "kN·m", 1000, { aliases: ["kilonewton meters", "knm"] }),
    linear("n-cm", "Newton centimeter", "N·cm", 0.01, { aliases: ["newton centimeters", "ncm"] }),
    linear("kgf-m", "Kilogram-force meter", "kgf·m", 9.80665, { aliases: ["kilogram-force meters", "kgm", "kg·m"] }),
    linear("kgf-cm", "Kilogram-force centimeter", "kgf·cm", 0.0980665, { aliases: ["kilogram-force centimeters", "kg·cm", "kgcm"] }),
    linear("lbf-ft", "Pound-force foot", "lbf·ft", 1.3558179483314004, { aliases: ["foot-pounds", "ft-lbs", "lb-ft", "ft lb"] }),
    linear("lbf-in", "Pound-force inch", "lbf·in", 0.1129848290276167, { aliases: ["inch-pounds", "in-lbs", "lb-in"] }),
    linear("ozf-in", "Ounce-force inch", "ozf·in", 0.00706155181422604, { aliases: ["ounce-inches", "oz-in"] }),
    linear("dyn-cm", "Dyne centimeter", "dyn·cm", 1e-7, { aliases: ["dyne centimeters", "dyn cm"] }),
  ],
};

export default category;
