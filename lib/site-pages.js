// Titles and meta descriptions for the pages that are not converters.
// Kept here (not in the page files) so tests can check them.
import { SITE_NAME } from "./config.js";

export const SITE_PAGES = {
  home: {
    path: "/",
    title: "Free Unit Converter for Every Measurement",
    keywords: { primary: "unit converter", secondary: ["free unit converter", "common conversions"] },
    added: "2026-11-08",
    updated: "2026-11-09",
    description:
      "Free worldwide unit converter: length, weight, temperature, currency, engineering and science units, plus Pakistani marla, kanal and acre.",
  },
  about: {
    path: "/about",
    title: "About",
    keywords: { primary: `about ${SITE_NAME.toLowerCase()}`, secondary: ["pakistani land units", "conversion factors"] },
    added: "2026-11-08",
    updated: "2026-11-11",
    description: `About ${SITE_NAME}: a free worldwide unit converter with 76 unit categories, from everyday units to engineering and Pakistani land, and how we check results.`,
  },
  contact: {
    path: "/contact",
    title: `Contact ${SITE_NAME}`,
    keywords: { primary: `contact ${SITE_NAME.toLowerCase()}`, secondary: ["report a mistake", "suggest a converter"] },
    added: "2026-11-08",
    updated: "2026-11-09",
    description: `Contact ${SITE_NAME} to report a mistake, ask a question or suggest a new unit converter. Find our email address here; we try to reply within a few days.`,
  },
  howWeVerify: {
    path: "/how-we-verify",
    title: "How We Verify Conversions",
    keywords: { primary: "how we verify conversions", secondary: ["nist sp 811", "independent reference table", "automated tests"] },
    added: "2026-11-11",
    description: `How we verify conversions on ${SITE_NAME}: exact SI and NIST SP 811 definitions, an independent reference table and automated tests for every unit.`,
  },
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy",
    keywords: { primary: "privacy policy", secondary: ["analytics", "cookies"] },
    added: "2026-11-08",
    updated: "2026-11-09",
    description: `The ${SITE_NAME} privacy policy: conversions stay in your browser, analytics is cookie-free, and how any future ads would use cookies.`,
  },
};
