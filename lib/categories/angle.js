import { linear } from "./helpers.js";

// ANGLE (base: radian)
const category = {
  id: "angle",
  name: "Angle",
  group: "common",
  baseUnit: "rad",
  defaultFrom: "deg",
  defaultTo: "rad",
  allowNegative: true,
  intro:
    "Angles measure turning or the opening between two lines. Degrees are used in everyday life and navigation, radians in maths and programming, gradians in surveying, and mils in military and shooting sights.",
  units: [
    linear("rad", "Radian", "rad", 1, { aliases: ["radians"] }),
    linear("deg", "Degree", "°", Math.PI / 180, { aliases: ["degrees", "deg"] }),
    linear("grad", "Gradian", "grad", Math.PI / 200, { aliases: ["gradians", "gon", "grade"] }),
    linear("arcmin", "Arcminute", "′", Math.PI / 10800, { aliases: ["arcminutes", "minute of arc"] }),
    linear("arcsec", "Arcsecond", "″", Math.PI / 648000, { aliases: ["arcseconds", "second of arc"] }),
    linear("turn", "Turn", "tr", 2 * Math.PI, { aliases: ["turns", "revolution", "rev"] }),
    linear("mrad", "Milliradian", "mrad", 0.001, { aliases: ["milliradians"] }),
    linear("nato-mil", "Mil (NATO)", "mil", (2 * Math.PI) / 6400, { aliases: ["mils", "nato mil"] }),
  ],
};

export default category;
