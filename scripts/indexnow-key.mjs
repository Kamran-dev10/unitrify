// Runs before every build ("prebuild"): writes the IndexNow key file
// public/<INDEXNOW_KEY>.txt (IndexNow checks it to confirm we own the site).
// Without INDEXNOW_KEY it only removes old key files and does nothing else.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "public");
const key = (process.env.INDEXNOW_KEY || "").trim();

// Remove old key files (a key file contains exactly its own name).
try {
  for (const f of readdirSync(dir)) {
    if (f.endsWith(".txt") && readFileSync(join(dir, f), "utf8").trim() === f.slice(0, -4)) rmSync(join(dir, f));
  }
} catch {
  // no public folder yet
}

if (!key) {
  console.log("IndexNow: INDEXNOW_KEY not set, no key file written.");
} else if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
  console.log("IndexNow: INDEXNOW_KEY must be 8-128 letters, digits or dashes. No key file written.");
} else {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${key}.txt`), key);
  console.log(`IndexNow: wrote public/${key}.txt`);
}
