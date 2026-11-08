import { linear } from "./helpers.js";

// SURFACE TENSION (base: newton per meter). 1 dyn/cm = 1 mN/m.
const category = {
  id: "surface-tension",
  name: "Surface tension",
  group: "fluids",
  baseUnit: "n-m",
  defaultFrom: "dyn-cm",
  defaultTo: "mn-m",
  intro:
    "Surface tension is the pull along a liquid's surface that makes drops round and lets insects stand on water. Chemists and coating makers measure it in mN/m or dyn/cm; water is about 72 mN/m.",
  units: [
    linear("n-m", "Newton per meter", "N/m", 1, { aliases: ["newtons per meter", "n/m"] }),
    linear("mn-m", "Millinewton per meter", "mN/m", 0.001, { aliases: ["millinewtons per meter", "mn/m"] }),
    linear("dyn-cm", "Dyne per centimeter", "dyn/cm", 0.001, { aliases: ["dynes per centimeter", "dyn/cm"] }),
    linear("erg-cm2", "Erg per square centimeter", "erg/cm²", 0.001, { aliases: ["ergs per square centimeter", "erg/cm2"] }),
    linear("lbf-in", "Pound-force per inch", "lbf/in", 4.4482216152605 / 0.0254, { aliases: ["pounds-force per inch", "lbf/in"] }),
    linear("lbf-ft", "Pound-force per foot", "lbf/ft", 4.4482216152605 / 0.3048, { aliases: ["pounds-force per foot", "lbf/ft"] }),
    linear("gf-cm", "Gram-force per centimeter", "gf/cm", 0.980665, { aliases: ["grams-force per centimeter", "gf/cm"] }),
  ],
};

export default category;
