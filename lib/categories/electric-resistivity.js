import { linear } from "./helpers.js";

// ELECTRIC RESISTIVITY (base: ohm meter). Circular mil = π/4 × (0.001 in)²; Ω·cmil/ft ≈ 1.662426e-9 Ω·m.
const category = {
  id: "electric-resistivity",
  name: "Electric resistivity",
  group: "electricity",
  baseUnit: "ohm-m",
  defaultFrom: "ohm-cm",
  defaultTo: "ohm-m",
  intro:
    "Resistivity is a property of a material: how strongly it resists current, whatever its shape. Cable engineers compare metals with it, often in Ω·mm²/m or, in the US, Ω·circular mil per foot.",
  units: [
    linear("ohm-m", "Ohm meter", "Ω·m", 1, { aliases: ["ohm meters", "ohm m"] }),
    linear("ohm-cm", "Ohm centimeter", "Ω·cm", 0.01, { aliases: ["ohm centimeters", "ohm cm"] }),
    linear("ohm-mm2-m", "Ohm square millimeter per meter", "Ω·mm²/m", 1e-6, { aliases: ["ohm mm2/m", "ohm mm²/m"] }),
    linear("uohm-cm", "Microohm centimeter", "µΩ·cm", 1e-8, { aliases: ["microohm centimeters", "microhm cm"] }),
    linear("ohm-cmil-ft", "Ohm circular mil per foot", "Ω·cmil/ft", ((Math.PI / 4) * 0.0000254 ** 2) / 0.3048, { aliases: ["ohm cmil/ft", "ohms per circular mil foot"] }),
  ],
};

export default category;
