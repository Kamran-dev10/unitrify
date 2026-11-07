import { SITE_URL } from "@/lib/config";
import { PAGES, pageUrl } from "@/lib/pages";
import { CATEGORIES } from "@/lib/categories";

export default function sitemap() {
  const paths = [
    "/",
    ...CATEGORIES.map((c) => `/${c.id}`),
    ...PAGES.map(pageUrl),
    "/about",
    "/contact",
    "/privacy-policy",
  ];
  return paths.map((path) => ({ url: path === "/" ? SITE_URL : `${SITE_URL}${path}` }));
}
