import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { siteEntries } from "../lib/site-urls.js";
import { PAGES } from "../lib/pages.js";
import { CATEGORIES, categoryHeadings } from "../lib/categories.js";
import { TOOLS, TOOL_PAGES } from "../lib/tools.js";
import { CONVERTER_GROUPS, ALL_CONVERTERS_PAGE, menuGroups } from "../lib/groups.js";
import { SITE_PAGES } from "../lib/site-pages.js";
import { SITE_NAME } from "../lib/config.js";
import nextConfig from "../next.config.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const entries = siteEntries();

// h1 of the pages whose data has no h1 field.
const SITE_H1 = {
  "/": "Every measurement, one place.",
  "/about": `About ${SITE_NAME}`,
  "/contact": `Contact ${SITE_NAME}`,
  "/privacy-policy": "Privacy Policy",
  "/how-we-verify": "How We Verify Conversions",
};

describe("no [VERIFY] marks", () => {
  it("no page data contains [VERIFY]", () => {
    const data = JSON.stringify([PAGES, CATEGORIES, TOOLS, TOOL_PAGES, CONVERTER_GROUPS, ALL_CONVERTERS_PAGE, SITE_PAGES]);
    expect(data.includes("[VERIFY]")).toBe(false);
  });

  it("no page or component file contains [VERIFY]", () => {
    const files = [];
    const walk = (d) => {
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) walk(p);
        else if (p.endsWith(".js")) files.push(p);
      }
    };
    for (const d of ["app", "components", "lib"]) walk(join(ROOT, d));
    for (const f of files) expect(readFileSync(f, "utf8").includes("[VERIFY]"), f).toBe(false);
  });
});

describe("keywords on every sitemap page", () => {
  it("every page has a primary and 2-4 secondary keywords", () => {
    for (const { path, page } of entries) {
      expect(page.keywords, `${path}: no keywords`).toBeTruthy();
      expect(page.keywords.primary, path).toBeTruthy();
      expect(page.keywords.secondary.length, path).toBeGreaterThanOrEqual(2);
      expect(page.keywords.secondary.length, path).toBeLessThanOrEqual(4);
    }
  });

  it("primary keywords are unique across the whole site", () => {
    const seen = new Map();
    for (const { path, page } of entries) {
      const k = page.keywords.primary.toLowerCase();
      expect(seen.get(k), `"${k}" on ${path} and ${seen.get(k)}`).toBeUndefined();
      seen.set(k, path);
    }
  });

  it("the primary keyword is in the title or h1, and exactly once in the description", () => {
    for (const { path, page } of entries) {
      const k = page.keywords.primary.toLowerCase();
      const h1 = (page.h1 ?? SITE_H1[path] ?? "").toLowerCase();
      expect(page.title.toLowerCase().includes(k) || h1.includes(k), `${path}: "${k}" not in title or h1`).toBe(true);
      const description = (page.metaDescription ?? page.description).toLowerCase();
      expect(description.split(k).length - 1, `${path}: "${k}" in description`).toBe(1);
    }
  });

  it("category, group, /converters and site page secondary keywords appear in their headings or text", () => {
    const check = (path, text, secondary) => {
      for (const s of secondary) expect(text.toLowerCase().includes(s.toLowerCase()), `${path}: "${s}"`).toBe(true);
    };
    for (const c of CATEGORIES) {
      const h = categoryHeadings(c);
      check(`/${c.id}`, [h.allUnits, h.units, h.pairs, c.intro, ...c.faqs.flatMap((f) => [f.question, f.answer])].join(" "), c.keywords.secondary);
    }
    for (const g of CONVERTER_GROUPS) {
      const about = (g.about ?? []).flat().map((x) => (typeof x === "string" ? x : x.text)).join(" ");
      check(g.path, [g.intro, `About ${g.name} units`, about].join(" "), g.keywords.secondary);
    }
    check(ALL_CONVERTERS_PAGE.path, ALL_CONVERTERS_PAGE.intro, ALL_CONVERTERS_PAGE.keywords.secondary);
    const source = { "/": "app/page.js", "/about": "app/about/page.js", "/contact": "app/contact/page.js", "/privacy-policy": "app/privacy-policy/page.js", "/how-we-verify": "app/how-we-verify/page.js" };
    for (const p of Object.values(SITE_PAGES)) check(p.path, readFileSync(join(ROOT, source[p.path]), "utf8"), p.keywords.secondary);
  });

  it("category titles show the unit count and stay under 60 characters", () => {
    for (const c of CATEGORIES) {
      expect(c.title, c.id).toMatch(/– \d+ Units/);
      expect(c.title.length, c.id).toBeLessThan(60);
    }
  });
});

describe("sitemap", () => {
  it("lists each page once with a real YYYY-MM-DD date, not the build time", () => {
    const paths = entries.map((e) => e.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const e of entries) expect(e.lastModified, e.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  // Every page in the sitemap is linked from at least one other page:
  // the footer (on every page) links to /converters and every group page,
  // /converters lists every category, tool and pair page, the menu and logo
  // link to the rest.
  it("no page is an orphan", () => {
    const linked = new Set(["/", "/about", "/contact", "/privacy-policy", "/how-we-verify", ALL_CONVERTERS_PAGE.path]);
    for (const g of CONVERTER_GROUPS) {
      linked.add(g.path);
      for (const i of g.items) {
        linked.add(i.href);
        for (const p of i.pages) linked.add(p.href);
      }
    }
    for (const g of menuGroups()) for (const i of g.items) linked.add(i.href);
    for (const e of entries) expect(linked.has(e.path), `${e.path} is not linked from any page`).toBe(true);
  });
});

describe("preview protection", () => {
  it("noindex is sent on every host except the real domain", async () => {
    const before = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.example.com";
    const rules = await nextConfig.headers();
    process.env.NEXT_PUBLIC_SITE_URL = before;
    const noindex = rules.filter((r) => r.headers.some((h) => h.key === "X-Robots-Tag"));
    expect(noindex).toHaveLength(1);
    expect(noindex[0].missing).toEqual([{ type: "host", value: "www\\.example\\.com" }]);
    expect(noindex[0].headers).toContainEqual({ key: "X-Robots-Tag", value: "noindex, nofollow" });
  });
});

describe("security headers", () => {
  it("every page gets the security headers and a CSP without nonces", async () => {
    const rules = await nextConfig.headers();
    const all = rules.find((r) => r.source === "/:path*" && !r.missing && r.headers.some((h) => h.key === "Content-Security-Policy"));
    const get = (k) => all.headers.find((h) => h.key === k)?.value;
    expect(get("X-Content-Type-Options")).toBe("nosniff");
    expect(get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(get("X-Frame-Options")).toBe("SAMEORIGIN");
    expect(get("Cross-Origin-Opener-Policy")).toBe("same-origin");
    expect(get("Permissions-Policy")).toBe("camera=(), microphone=(), geolocation=(), payment=(), usb=()");
    const csp = get("Content-Security-Policy");
    for (const d of ["default-src 'self'", "frame-ancestors 'self'", "object-src 'none'", "upgrade-insecure-requests"]) expect(csp).toContain(d);
    expect(csp).not.toMatch(/nonce-/);
    expect(csp).not.toContain("unsafe-eval"); // only added under `next dev`
    // Vercel sends HSTS; we must not set it.
    expect(all.headers.some((h) => h.key === "Strict-Transport-Security")).toBe(false);
  });
});
