import { linear } from "./helpers.js";

// MAGNETIC FIELD STRENGTH H (base: ampere per meter). oersted = 1000/(4π) A/m.
const category = {
  id: "magnetic-field-strength",
  name: "Magnetic field strength",
  group: "magnetism",
  baseUnit: "a-m",
  defaultFrom: "oersted",
  defaultTo: "a-m",
  intro:
    "Magnetic field strength (H) is the magnetising field made by currents, in A/m or the older oersted. Magnet makers use it to rate coercivity, and engineers use it in coil design.",
  units: [
    linear("a-m", "Ampere per meter", "A/m", 1, { aliases: ["amperes per meter", "a/m", "ampere-turns per meter"] }),
    linear("ka-m", "Kiloampere per meter", "kA/m", 1000, { aliases: ["kiloamperes per meter", "ka/m"] }),
    linear("oersted", "Oersted", "Oe", 1000 / (4 * Math.PI), { aliases: ["oersteds", "oe"] }),
    linear("koe", "Kilooersted", "kOe", 1e6 / (4 * Math.PI), { aliases: ["kilooersteds", "koe"] }),
    linear("at-in", "Ampere-turn per inch", "A·t/in", 1 / 0.0254, { aliases: ["ampere turns per inch", "at/in"] }),
  ],
};

export default category;
