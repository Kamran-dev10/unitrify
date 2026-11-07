// Titles and meta descriptions for the pages that are not converters.
// Kept here (not in the page files) so tests can check them.
import { SITE_NAME } from "./config.js";

export const SITE_PAGES = {
  home: {
    path: "/",
    title: "Marla, Kanal & Unit Converter for Pakistan",
    description:
      "Convert marla, kanal, acre and murabba to sq ft with all three marla standards, plus kg to lbs, cm to inches, °C to °F and other everyday units.",
  },
  about: {
    path: "/about",
    title: "About",
    description: `${SITE_NAME} is a free unit converter for Pakistani land units like marla and kanal, plus everyday units. Learn how we keep conversions accurate.`,
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
