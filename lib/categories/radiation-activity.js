import { linear } from "./helpers.js";

// RADIOACTIVITY (base: becquerel). curie = 3.7e10 Bq (exact), rutherford = 1e6 Bq.
const category = {
  id: "radiation-activity",
  name: "Radioactivity",
  group: "radiology",
  baseUnit: "bq",
  defaultFrom: "ci",
  defaultTo: "bq",
  note: "For information only, not for medical or safety decisions.",
  intro:
    "Radioactivity is how many atoms in a sample decay each second, measured in becquerels (Bq) or the older curie (Ci). Nuclear medicine doses and radon levels use these units.",
  units: [
    linear("bq", "Becquerel", "Bq", 1, { aliases: ["becquerels"] }),
    linear("kbq", "Kilobecquerel", "kBq", 1e3, { aliases: ["kilobecquerels"] }),
    linear("mbq", "Megabecquerel", "MBq", 1e6, { aliases: ["megabecquerels"] }),
    linear("gbq", "Gigabecquerel", "GBq", 1e9, { aliases: ["gigabecquerels"] }),
    linear("ci", "Curie", "Ci", 3.7e10, { aliases: ["curies"] }),
    linear("mci", "Millicurie", "mCi", 3.7e7, { aliases: ["millicuries"] }),
    linear("uci", "Microcurie", "µCi", 3.7e4, { aliases: ["microcuries", "uci"] }),
    linear("nci", "Nanocurie", "nCi", 37, { aliases: ["nanocuries"] }),
    linear("pci", "Picocurie", "pCi", 0.037, { aliases: ["picocuries"] }),
    linear("rd", "Rutherford", "Rd", 1e6, { aliases: ["rutherfords"] }),
  ],
};

export default category;
