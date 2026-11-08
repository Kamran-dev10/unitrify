// Titles and meta descriptions for the pages that are not converters.
// Kept here (not in the page files) so tests can check them.
import { SITE_NAME } from "./config.js";

export const SITE_PAGES = {
  home: {
    path: "/",
    title: "Free Unit Converter for Every Measurement",
    description:
      "Free worldwide unit converter: length, weight, temperature, currency, engineering and science units, plus Pakistani marla, kanal and acre.",
  },
  about: {
    path: "/about",
    title: "About",
    description: `${SITE_NAME} is a free worldwide unit converter with 80+ categories, from everyday units to engineering and Pakistani land. See how we check results.`,
  },
  contact: {
    path: "/contact",
    title: "Contact",
    description: `Contact ${SITE_NAME} to report a mistake, ask a question or suggest a new unit converter. Find our email address here; we try to reply within a few days.`,
  },
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: `How ${SITE_NAME} handles your data: conversions stay in your browser, analytics is cookie-free, and how any future ads would use cookies.`,
  },
};
