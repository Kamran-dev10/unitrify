import { PAGES, pageUrl } from "@/lib/pages";
import { CATEGORIES } from "@/lib/categories";
import { absoluteUrl } from "@/lib/schema";

// BUILD_DATE is set in next.config.mjs when the site is built.
const lastModified = process.env.BUILD_DATE;

export default function sitemap() {
  const paths = [
    "/",
    ...CATEGORIES.map((c) => `/${c.id}`),
    ...PAGES.map(pageUrl),
    "/about",
    "/contact",
    "/privacy-policy",
  ];
  return paths.map((path) => ({ url: absoluteUrl(path), lastModified }));
}
