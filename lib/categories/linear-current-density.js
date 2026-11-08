import { linear } from "./helpers.js";

// LINEAR CURRENT DENSITY (base: ampere per meter).
const category = {
  id: "linear-current-density",
  name: "Linear current density",
  group: "electricity",
  baseUnit: "a-m",
  defaultFrom: "a-cm",
  defaultTo: "a-m",
  intro:
    "Linear current density is the current per unit width of a conductor, such as a thin sheet or a coil winding. Motor and transformer designers use it to judge how hard a winding is loaded.",
  units: [
    linear("a-m", "Ampere per meter", "A/m", 1, { aliases: ["amperes per meter", "a/m"] }),
    linear("a-cm", "Ampere per centimeter", "A/cm", 100, { aliases: ["amperes per centimeter", "a/cm"] }),
    linear("a-in", "Ampere per inch", "A/in", 1 / 0.0254, { aliases: ["amperes per inch", "a/in"] }),
    linear("a-mm", "Ampere per millimeter", "A/mm", 1000, { aliases: ["amperes per millimeter", "a/mm"] }),
  ],
};

export default category;
