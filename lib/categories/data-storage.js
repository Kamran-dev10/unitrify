import { linear } from "./helpers.js";

// DATA STORAGE (base: bit). Decimal units use powers of 1000,
// binary units (KiB, MiB, ...) use powers of 1024.
const BYTE = 8;

const category = {
  id: "data-storage",
  name: "Data storage",
  group: "common",
  baseUnit: "bit",
  defaultFrom: "tb",
  defaultTo: "gib",
  intro:
    "Data storage measures how much digital information a file, phone or drive can hold. Drive makers use decimal units (1 TB = 1,000,000,000,000 bytes), but many computers count in binary units (1 GiB = 1,073,741,824 bytes), so a \"1 TB\" drive shows up as about 931 GiB, often labelled \"931 GB\". No space is missing; it is the same amount counted two ways.",
  units: [
    linear("bit", "Bit", "bit", 1, { aliases: ["bits", "b"] }),
    linear("byte", "Byte", "B", BYTE, { aliases: ["bytes", "octet"] }),
    linear("kb", "Kilobyte", "kB", BYTE * 1e3, { aliases: ["kilobytes", "kb"] }),
    linear("mb", "Megabyte", "MB", BYTE * 1e6, { aliases: ["megabytes", "mb"] }),
    linear("gb", "Gigabyte", "GB", BYTE * 1e9, { aliases: ["gigabytes", "gigs"] }),
    linear("tb", "Terabyte", "TB", BYTE * 1e12, { aliases: ["terabytes"] }),
    linear("pb", "Petabyte", "PB", BYTE * 1e15, { aliases: ["petabytes"] }),
    linear("kib", "Kibibyte", "KiB", BYTE * 1024, { aliases: ["kibibytes"] }),
    linear("mib", "Mebibyte", "MiB", BYTE * 1024 ** 2, { aliases: ["mebibytes"] }),
    linear("gib", "Gibibyte", "GiB", BYTE * 1024 ** 3, { aliases: ["gibibytes"] }),
    linear("tib", "Tebibyte", "TiB", BYTE * 1024 ** 4, { aliases: ["tebibytes"] }),
    linear("pib", "Pebibyte", "PiB", BYTE * 1024 ** 5, { aliases: ["pebibytes"] }),
  ],
};

export default category;
