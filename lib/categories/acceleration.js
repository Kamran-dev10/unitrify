import { linear } from "./helpers.js";

// ACCELERATION (base: meter per second squared)
const category = {
  id: "acceleration",
  name: "Acceleration",
  group: "engineering",
  baseUnit: "m-s2",
  defaultFrom: "g",
  defaultTo: "m-s2",
  intro:
    "Acceleration measures how quickly speed changes. Car reviews quote 0–100 km/h times, pilots and ride designers talk in g, and engineers and physics students use m/s².",
  units: [
    linear("m-s2", "Meter per second squared", "m/s²", 1, { aliases: ["meters per second squared", "m/s2", "mps2"] }),
    linear("g", "Standard gravity", "g", 9.80665, { aliases: ["g-force", "gravity", "g0"] }),
    linear("ft-s2", "Foot per second squared", "ft/s²", 0.3048, { aliases: ["feet per second squared", "ft/s2"] }),
    linear("in-s2", "Inch per second squared", "in/s²", 0.0254, { aliases: ["inches per second squared", "in/s2"] }),
    linear("gal", "Gal", "Gal", 0.01, { aliases: ["galileo", "cm/s2"] }),
    linear("kmh-s", "Kilometer per hour per second", "km/h/s", 1 / 3.6, { aliases: ["km/h per second", "kph per second"] }),
    linear("mph-s", "Mile per hour per second", "mph/s", 0.44704, { aliases: ["mph per second", "miles per hour per second"] }),
  ],
};

export default category;
