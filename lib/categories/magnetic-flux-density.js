import { linear } from "./helpers.js";

// MAGNETIC FLUX DENSITY B (base: tesla). gauss = 1e-4 T, gamma = 1e-9 T, Wb/m² = 1 T.
const category = {
  id: "magnetic-flux-density",
  name: "Magnetic flux density",
  group: "magnetism",
  baseUnit: "t",
  defaultFrom: "gauss",
  defaultTo: "t",
  intro:
    "Magnetic flux density (B) is the strength of a magnetic field, in tesla or gauss. Magnet sellers quote gauss, MRI scanners are rated in tesla, and geophysicists measure the Earth's field in nT or gamma.",
  units: [
    linear("t", "Tesla", "T", 1, { aliases: ["teslas"] }),
    linear("mt", "Millitesla", "mT", 1e-3, { aliases: ["milliteslas"] }),
    linear("ut", "Microtesla", "µT", 1e-6, { aliases: ["microteslas", "ut"] }),
    linear("nt", "Nanotesla", "nT", 1e-9, { aliases: ["nanoteslas"] }),
    linear("gauss", "Gauss", "G", 1e-4, { aliases: ["gs", "gauss units"] }),
    linear("kgauss", "Kilogauss", "kG", 0.1, { aliases: ["kilogauss", "kgs"] }),
    linear("gamma", "Gamma", "γ", 1e-9, { aliases: ["gammas"] }),
    linear("wb-m2", "Weber per square meter", "Wb/m²", 1, { aliases: ["webers per square meter", "wb/m2"] }),
  ],
};

export default category;
