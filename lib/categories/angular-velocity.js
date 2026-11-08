import { linear } from "./helpers.js";

// ANGULAR VELOCITY (base: radian per second)
const category = {
  id: "angular-velocity",
  name: "Angular velocity",
  group: "engineering",
  baseUnit: "rad-s",
  defaultFrom: "rpm",
  defaultTo: "rad-s",
  intro:
    "Angular velocity measures how fast something turns. Mechanics use rpm for engines, drills and fans, while engineers and physics students work in radians per second.",
  units: [
    linear("rad-s", "Radian per second", "rad/s", 1, { aliases: ["radians per second", "rad/sec"] }),
    linear("rpm", "Revolution per minute", "rpm", (2 * Math.PI) / 60, { aliases: ["revolutions per minute", "rev/min", "r/min"] }),
    linear("rev-s", "Revolution per second", "rev/s", 2 * Math.PI, { aliases: ["revolutions per second", "rps"] }),
    linear("rev-h", "Revolution per hour", "rev/h", (2 * Math.PI) / 3600, { aliases: ["revolutions per hour", "rph"] }),
    linear("deg-s", "Degree per second", "°/s", Math.PI / 180, { aliases: ["degrees per second", "deg/s"] }),
    linear("deg-min", "Degree per minute", "°/min", Math.PI / 10800, { aliases: ["degrees per minute", "deg/min"] }),
    linear("rad-min", "Radian per minute", "rad/min", 1 / 60, { aliases: ["radians per minute"] }),
  ],
};

export default category;
