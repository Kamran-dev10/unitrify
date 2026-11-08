import { linear } from "./helpers.js";

// ILLUMINANCE (base: lux). foot-candle = 1 lm/ft².
const category = {
  id: "illuminance",
  name: "Illuminance",
  group: "light",
  baseUnit: "lux",
  defaultFrom: "fc",
  defaultTo: "lux",
  intro:
    "Illuminance is how much light falls on a surface, measured in lux. Lighting designers use lux or foot-candles to plan offices, classrooms and roads, and photographers use light meters in lux.",
  units: [
    linear("lux", "Lux", "lx", 1, { aliases: ["lx", "lumen per square meter"] }),
    linear("klux", "Kilolux", "klx", 1000, { aliases: ["kilolux", "klx"] }),
    linear("lm-m2", "Lumen per square meter", "lm/m²", 1, { aliases: ["lumens per square meter", "lm/m2"] }),
    linear("fc", "Foot-candle", "fc", 1 / 0.09290304, { aliases: ["foot-candles", "foot candles", "lumen per square foot"] }),
    linear("phot", "Phot", "ph", 1e4, { aliases: ["phots"] }),
    linear("nox", "Nox", "nx", 0.001, { aliases: ["noxes"] }),
  ],
};

export default category;
