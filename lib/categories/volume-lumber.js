import { linear } from "./helpers.js";

// LUMBER VOLUME (base: cubic meter). board foot = 144 in³, cord = 128 ft³, hoppus foot = 4/π ft³ (exact).
const category = {
  id: "volume-lumber",
  name: "Lumber volume",
  group: "other",
  baseUnit: "m3",
  defaultFrom: "board-foot",
  defaultTo: "ft3",
  intro:
    "Lumber volume is used to buy and sell timber. Sawn wood in the US is sold by the board foot, firewood by the cord, and round logs in some countries by the hoppus foot.",
  units: [
    linear("m3", "Cubic meter", "m³", 1, { aliases: ["cubic meters", "m3", "cbm"] }),
    linear("ft3", "Cubic foot", "ft³", 0.028316846592, { aliases: ["cubic feet", "cft", "ft3"] }),
    linear("board-foot", "Board foot", "FBM", 0.028316846592 / 12, { aliases: ["board feet", "bf", "bd ft"] }),
    linear("mbf", "Thousand board feet", "MBF", 0.028316846592 / 12 * 1000, { aliases: ["thousand board feet", "mbf"] }),
    linear("cord", "Cord", "cd", 0.028316846592 * 128, { aliases: ["cords", "full cord"] }),
    linear("hoppus-ft", "Hoppus foot", "h ft", 0.028316846592 * 4 / Math.PI, { aliases: ["hoppus feet", "hoppus cubic foot"] }),
  ],
};

export default category;
