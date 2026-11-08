import { PAGES, pageUrl } from "@/lib/pages";
import { CATEGORIES } from "@/lib/categories";
import { TOOLS, TOOL_PAGES, toolPageUrl } from "@/lib/tools";
import { absoluteUrl } from "@/lib/schema";
import { CONVERTER_GROUPS, ALL_CONVERTERS_PAGE } from "@/lib/groups";

// BUILD_DATE is set in next.config.mjs when the site is built.
const lastModified = process.env.BUILD_DATE;

export default function sitemap() {
  const paths = [
    "/",
    ALL_CONVERTERS_PAGE.path,
    ...CONVERTER_GROUPS.map((g) => g.path),
    ...CATEGORIES.map((c) => `/${c.id}`),
    ...PAGES.map(pageUrl),
    ...TOOLS.map((t) => `/${t.id}`),
    ...TOOL_PAGES.map(toolPageUrl),
    "/about",
    "/contact",
    "/privacy-policy",
  ];
  return paths.map((path) => ({ url: absoluteUrl(path), lastModified }));
}
