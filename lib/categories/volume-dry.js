import { linear } from "./helpers.js";

// DRY VOLUME (base: litre). For grain, fruit and other loose goods.
const category = {
  id: "volume-dry",
  name: "Dry volume",
  group: "common",
  baseUnit: "litre",
  defaultFrom: "us-bushel",
  defaultTo: "litre",
  intro:
    "Dry volume units measure loose goods such as grain, fruit and vegetables. US and UK bushels and pecks have different sizes, and a US dry pint is larger than a US liquid pint.",
  units: [
    linear("litre", "Liter", "L", 1, { aliases: ["litre", "litres", "liters", "liter", "ltr"] }),
    linear("cubic-m", "Cubic meter", "m³", 1000, { aliases: ["cubic meters", "m3"] }),
    linear("us-dry-pint", "US dry pint", "dry pt", 0.5506104713575, { aliases: ["dry pint"] }),
    linear("us-dry-quart", "US dry quart", "dry qt", 1.101220942715, { aliases: ["dry quart"] }),
    linear("us-peck", "US peck", "pk (US)", 8.80976754172, { aliases: ["peck", "pecks"] }),
    linear("us-bushel", "US bushel", "bu (US)", 35.23907016688, { aliases: ["bushel", "bushels"] }),
    linear("uk-peck", "UK peck", "pk (UK)", 9.09218, { aliases: ["imperial peck"] }),
    linear("uk-bushel", "UK bushel", "bu (UK)", 36.36872, { aliases: ["imperial bushel"] }),
    linear("us-dry-barrel", "US dry barrel", "bbl (dry)", 115.627123584, { aliases: ["dry barrel"] }),
  ],
};

export default category;
