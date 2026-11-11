import { describe, it, expect } from "vitest";
import {
  organizationSchema,
  websiteSchema,
  webApplicationSchema,
  faqSchema,
  breadcrumbSchema,
  serializeJsonLd,
} from "../lib/schema.js";
import { PAGES, pageUrl } from "../lib/pages.js";
import { lastModifiedOf } from "../lib/site-urls.js";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "../lib/config.js";

// Every block must survive the trip to HTML and back, and have @context + @type.
function checkBlock(data) {
  const parsed = JSON.parse(serializeJsonLd(data));
  expect(parsed["@context"]).toBe("https://schema.org");
  expect(typeof parsed["@type"]).toBe("string");
  return parsed;
}

describe("JSON-LD", () => {
  it("homepage Organization and WebSite", () => {
    const org = checkBlock(organizationSchema());
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe(SITE_NAME);
    expect(org.email).toBe(CONTACT_EMAIL);
    expect(org.url).toBe(SITE_URL);
    expect(org.logo.startsWith(SITE_URL)).toBe(true);

    const site = checkBlock(websiteSchema());
    expect(site["@type"]).toBe("WebSite");
    expect(site.name).toBe(SITE_NAME);
  });

  it("WebApplication carries dateModified from the page data (YYYY-MM-DD)", () => {
    for (const p of PAGES) {
      const date = lastModifiedOf(p);
      expect(date, pageUrl(p)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(checkBlock(webApplicationSchema({ name: p.title, path: pageUrl(p), dateModified: date })).dateModified).toBe(date);
    }
    expect(webApplicationSchema({ name: "x", path: "/x" })).not.toHaveProperty("dateModified");
  });

  it("every converter page has valid WebApplication, FAQ and breadcrumb data", () => {
    for (const p of PAGES) {
      const app = checkBlock(webApplicationSchema({ name: p.title, path: pageUrl(p) }));
      expect(app["@type"]).toBe("WebApplication");
      expect(app.applicationCategory).toBe("UtilitiesApplication");
      expect(app.operatingSystem).toBe("Any");
      expect(app.offers.price).toBe("0");
      expect(app.url).toBe(`${SITE_URL}${pageUrl(p)}`);

      if (p.faqs?.length) checkBlock(faqSchema(p.faqs));
      checkBlock(breadcrumbSchema([{ name: "Home", path: "/" }, { name: p.h1, path: pageUrl(p) }]));
    }
  });

  it('"<" in text cannot close the script tag', () => {
    const out = serializeJsonLd(faqSchema([{ question: "</script>", answer: "a < b" }]));
    expect(out.includes("<")).toBe(false);
    expect(JSON.parse(out).mainEntity[0].name).toBe("</script>");
  });
});
