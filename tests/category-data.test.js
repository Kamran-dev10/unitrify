import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { categoryData } from "../lib/category-data.js";
import { UNIT_CATEGORIES } from "../lib/categories/index.js";
import { convert } from "../lib/convert.js";
import { convertWith } from "../lib/engine.js";

const ROOT = resolve(import.meta.dirname, "..");

describe("per-category data for pages", () => {
  it("a category page's data contains only its own category", () => {
    for (const c of UNIT_CATEGORIES) {
      const data = categoryData(c.id);
      const json = JSON.stringify(data);
      const own = new Set(c.units.map((u) => u.id));
      for (const u of data.units) expect(own.has(u.id), `${c.id}: ${u.id}`).toBe(true);
      // No unit name that exists only in another category may appear.
      for (const other of UNIT_CATEGORIES) {
        if (other.id === c.id) continue;
        for (const u of other.units) {
          if (c.units.some((x) => x.name === u.name)) continue;
          expect(json.includes(`"${u.name}"`), `${c.id} data contains ${other.id}/${u.name}`).toBe(false);
        }
      }
    }
  });

  it("/length data is small and has only length units", () => {
    const data = categoryData("length");
    expect(data.units.map((u) => u.id)).toEqual(UNIT_CATEGORIES.find((c) => c.id === "length").units.map((u) => u.id));
    expect(JSON.stringify(data).length).toBeLessThan(5000);
  });

  it("gives the same results as the registry engine, for every option", () => {
    for (const c of UNIT_CATEGORIES) {
      const data = categoryData(c.id);
      const choices = data.option ? data.option.choices : [undefined];
      for (const v of choices) {
        const options = data.option ? { [data.option.key]: v } : {};
        const from = data.defaultFrom;
        for (const u of data.units) {
          expect(convertWith(data, 7.5, from, u.id, options), `${c.id} ${from}->${u.id}`).toBe(convert(7.5, from, u.id, c.id, options));
        }
      }
    }
  });
});

// Follows the imports of every "use client" component and checks that none
// of them reaches the unit registry (all categories) or lib/convert.js.
describe("client components do not import the unit registry", () => {
  const resolveImport = (from, spec) => {
    const base = spec.startsWith("@/") ? join(ROOT, spec.slice(2)) : spec.startsWith(".") ? resolve(dirname(from), spec) : null;
    if (!base) return null; // a package (react, next, ...)
    for (const p of [base, `${base}.js`, join(base, "index.js")]) if (existsSync(p) && p.endsWith(".js")) return p;
    return null;
  };
  const graph = (file, seen = new Set()) => {
    if (seen.has(file)) return seen;
    seen.add(file);
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(/^\s*(?:import|export)\s[^;]*?from\s+"([^"]+)"/gm)) {
      const next = resolveImport(file, m[1]);
      if (next) graph(next, seen);
    }
    return seen;
  };

  const clientFiles = readdirSync(join(ROOT, "components"))
    .map((f) => join(ROOT, "components", f))
    .filter((f) => readFileSync(f, "utf8").startsWith('"use client"'));

  it("finds the client components", () => expect(clientFiles.length).toBeGreaterThan(5));

  for (const f of clientFiles) {
    it(f.split(/[\\/]/).pop(), () => {
      const files = [...graph(f)].map((p) => p.replace(ROOT, "").replace(/\\/g, "/"));
      expect(files.filter((p) => p.startsWith("/lib/categories/") || p === "/lib/convert.js")).toEqual([]);
    });
  }
});
