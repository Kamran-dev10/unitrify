import { linear } from "./helpers.js";

// DYNAMIC VISCOSITY (base: pascal second). 1 cP = 1 mPa·s.
const category = {
  id: "viscosity-dynamic",
  name: "Dynamic viscosity",
  group: "fluids",
  baseUnit: "pa-s",
  defaultFrom: "cp",
  defaultTo: "pa-s",
  intro:
    "Dynamic viscosity is how thick a fluid is, or how strongly it resists flowing. Oils, paints and foods are rated in centipoise (cP) or mPa·s; water at 20 °C is about 1 cP.",
  units: [
    linear("pa-s", "Pascal second", "Pa·s", 1, { aliases: ["pascal seconds", "pa s", "pa·s"] }),
    linear("mpa-s", "Millipascal second", "mPa·s", 0.001, { aliases: ["millipascal seconds", "mpa s", "mpa·s"] }),
    linear("poise", "Poise", "P", 0.1, { aliases: ["poises"] }),
    linear("cp", "Centipoise", "cP", 0.001, { aliases: ["centipoises", "cps"] }),
    linear("lbf-s-ft2", "Pound-force second per square foot", "lbf·s/ft²", 4.4482216152605 / 0.09290304, { aliases: ["lbf s/ft2", "slug per foot second"] }),
    linear("lb-ft-s", "Pound per foot second", "lb/(ft·s)", 0.45359237 / 0.3048, { aliases: ["lb/ft/s", "pounds per foot second"] }),
    linear("kgf-s-m2", "Kilogram-force second per square meter", "kgf·s/m²", 9.80665, { aliases: ["kgf s/m2"] }),
  ],
};

export default category;
