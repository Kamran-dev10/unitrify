// JSON-LD (structured data) builders. Each returns a plain object;
// components/JsonLd.js turns it into a <script type="application/ld+json">.
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "./config.js";

const CONTEXT = "https://schema.org";

// Absolute URL for a path like "/zameen/marla-to-sq-ft" ("/" -> SITE_URL).
export function absoluteUrl(path = "/") {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

// The 512 px favicon (app/icon.js) is used as the logo.
export const LOGO_PATH = "/icon/512";

export function organizationSchema() {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(LOGO_PATH),
    email: CONTACT_EMAIL,
  };
}

export function websiteSchema() {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

// page: an entry from lib/pages.js; path: its URL path.
// dateModified (YYYY-MM-DD, optional): when the page content last changed.
export function webApplicationSchema({ name, path, dateModified }) {
  return {
    "@context": CONTEXT,
    "@type": "WebApplication",
    name,
    url: absoluteUrl(path),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    ...(dateModified ? { dateModified } : {}),
  };
}

export function faqSchema(faqs) {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

// A list page (group pages, /converters): name, its path, and items [{ name, path }].
export function itemListSchema({ name, path, items }) {
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

// items: [{ name, path }]
export function breadcrumbSchema(items) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// Safe text for a <script type="application/ld+json"> tag.
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
