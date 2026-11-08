import { linear } from "./helpers.js";

// ELECTRIC FIELD STRENGTH (base: volt per meter). statvolt per cm = 29,979.2458 V/m.
const category = {
  id: "electric-field-strength",
  name: "Electric field strength",
  group: "electricity",
  baseUnit: "v-m",
  defaultFrom: "kv-cm",
  defaultTo: "kv-m",
  intro:
    "Electric field strength is the voltage change per unit distance. High-voltage engineers use it to rate insulation (breakdown strength in kV/mm or kV/cm), and physicists use V/m.",
  units: [
    linear("v-m", "Volt per meter", "V/m", 1, { aliases: ["volts per meter", "v/m", "newtons per coulomb"] }),
    linear("kv-m", "Kilovolt per meter", "kV/m", 1000, { aliases: ["kilovolts per meter", "kv/m"] }),
    linear("v-cm", "Volt per centimeter", "V/cm", 100, { aliases: ["volts per centimeter", "v/cm"] }),
    linear("v-mm", "Volt per millimeter", "V/mm", 1000, { aliases: ["volts per millimeter", "v/mm"] }),
    linear("kv-cm", "Kilovolt per centimeter", "kV/cm", 1e5, { aliases: ["kilovolts per centimeter", "kv/cm"] }),
    linear("v-in", "Volt per inch", "V/in", 1 / 0.0254, { aliases: ["volts per inch", "v/in"] }),
    linear("statv-cm", "Statvolt per centimeter", "statV/cm", 29979.2458, { aliases: ["statvolts per centimeter", "statv/cm"] }),
  ],
};

export default category;
