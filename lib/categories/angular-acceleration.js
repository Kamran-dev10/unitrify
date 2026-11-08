import { linear } from "./helpers.js";

// ANGULAR ACCELERATION (base: radian per second squared)
const category = {
  id: "angular-acceleration",
  name: "Angular acceleration",
  group: "engineering",
  baseUnit: "rad-s2",
  defaultFrom: "rpm-s",
  defaultTo: "rad-s2",
  intro:
    "Angular acceleration measures how quickly a spinning speed changes. It is used for motors, wheels, turbines and robot joints, and in physics and mechanical engineering courses.",
  units: [
    linear("rad-s2", "Radian per second squared", "rad/s²", 1, { aliases: ["radians per second squared", "rad/s2"] }),
    linear("deg-s2", "Degree per second squared", "°/s²", Math.PI / 180, { aliases: ["degrees per second squared", "deg/s2"] }),
    linear("rev-s2", "Revolution per second squared", "rev/s²", 2 * Math.PI, { aliases: ["revolutions per second squared"] }),
    linear("rpm-s", "RPM per second", "rpm/s", (2 * Math.PI) / 60, { aliases: ["rpm per second", "rev/min/s"] }),
    linear("rad-min2", "Radian per minute squared", "rad/min²", 1 / 3600, { aliases: ["radians per minute squared"] }),
  ],
};

export default category;
