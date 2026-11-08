import { linear } from "./helpers.js";

// LUMINANCE (base: candela per square meter = nit). foot-lambert = (1/π) cd/ft².
const category = {
  id: "luminance",
  name: "Luminance",
  group: "light",
  baseUnit: "cd-m2",
  defaultFrom: "fl",
  defaultTo: "cd-m2",
  intro:
    "Luminance is how bright a surface or screen looks, measured in candelas per square meter, also called nits. Screen makers quote nits, and cinema projection uses foot-lamberts.",
  units: [
    linear("cd-m2", "Candela per square meter", "cd/m²", 1, { aliases: ["candelas per square meter", "cd/m2"] }),
    linear("nit", "Nit", "nt", 1, { aliases: ["nits"] }),
    linear("cd-cm2", "Candela per square centimeter", "cd/cm²", 1e4, { aliases: ["candelas per square centimeter", "cd/cm2"] }),
    linear("stilb", "Stilb", "sb", 1e4, { aliases: ["stilbs"] }),
    linear("fl", "Foot-lambert", "fL", 1 / Math.PI / 0.09290304, { aliases: ["foot-lamberts", "foot lambert", "ftl"] }),
    linear("lambert", "Lambert", "L", 1e4 / Math.PI, { aliases: ["lamberts"] }),
    linear("apostilb", "Apostilb", "asb", 1 / Math.PI, { aliases: ["apostilbs", "blondel"] }),
  ],
};

export default category;
