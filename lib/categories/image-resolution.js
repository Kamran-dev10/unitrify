import { linear } from "./helpers.js";

// IMAGE RESOLUTION (base: dots per meter).
const category = {
  id: "image-resolution",
  name: "Image resolution",
  group: "light",
  baseUnit: "dpm",
  defaultFrom: "dpi",
  defaultTo: "dpcm",
  intro:
    "Image resolution is how many dots or pixels fit in an inch or centimeter. Printers are rated in dpi, screens in ppi, and 300 dpi is the usual standard for sharp photo prints.",
  units: [
    linear("dpm", "Dot per meter", "dot/m", 1, { aliases: ["dots per meter", "dpm"] }),
    linear("dpi", "Dot per inch", "dpi", 1 / 0.0254, { aliases: ["dots per inch", "dpi"] }),
    linear("ppi", "Pixel per inch", "ppi", 1 / 0.0254, { aliases: ["pixels per inch", "ppi"] }),
    linear("dpcm", "Dot per centimeter", "dot/cm", 100, { aliases: ["dots per centimeter", "dpcm"] }),
    linear("ppcm", "Pixel per centimeter", "px/cm", 100, { aliases: ["pixels per centimeter", "ppcm"] }),
  ],
};

export default category;
