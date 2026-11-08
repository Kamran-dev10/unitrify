import { linear } from "./helpers.js";

// MAGNETIC FLUX (base: weber). maxwell = 1e-8 Wb; 1 volt-second = 1 Wb.
const category = {
  id: "magnetic-flux",
  name: "Magnetic flux",
  group: "magnetism",
  baseUnit: "wb",
  defaultFrom: "maxwell",
  defaultTo: "uwb",
  intro:
    "Magnetic flux is the total magnetic field passing through an area, measured in webers. It is used for transformer cores, generators and magnetic sensors; the older CGS unit is the maxwell.",
  units: [
    linear("wb", "Weber", "Wb", 1, { aliases: ["webers"] }),
    linear("mwb", "Milliweber", "mWb", 1e-3, { aliases: ["milliwebers"] }),
    linear("uwb", "Microweber", "µWb", 1e-6, { aliases: ["microwebers", "uwb"] }),
    linear("maxwell", "Maxwell", "Mx", 1e-8, { aliases: ["maxwells", "line"] }),
    linear("v-s", "Volt-second", "V·s", 1, { aliases: ["volt seconds", "v s"] }),
  ],
};

export default category;
