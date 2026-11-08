import { linear } from "./helpers.js";

// INTRINSIC PERMEABILITY (base: square meter). darcy = 9.869233e-13 m² (NIST SP 811).
const category = {
  id: "permeability",
  name: "Permeability",
  group: "fluids",
  baseUnit: "m2",
  defaultFrom: "darcy",
  defaultTo: "um2",
  intro:
    "Permeability (intrinsic) measures how easily a fluid can flow through a porous rock or soil. It is used in soil science, groundwater studies and petroleum engineering, where it is usually given in darcies or millidarcies.",
  units: [
    linear("m2", "Square meter", "m²", 1, { aliases: ["square meters", "m2"] }),
    linear("darcy", "Darcy", "D", 9.869233e-13, { aliases: ["darcies", "darcy"] }),
    linear("millidarcy", "Millidarcy", "mD", 9.869233e-16, { aliases: ["millidarcies", "md"] }),
    linear("cm2", "Square centimeter", "cm²", 1e-4, { aliases: ["square centimeters", "cm2"] }),
    linear("um2", "Square micrometer", "µm²", 1e-12, { aliases: ["square micrometers", "um2", "µm2"] }),
  ],
};

export default category;
