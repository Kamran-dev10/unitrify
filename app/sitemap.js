import { siteEntries } from "@/lib/site-urls";
import { absoluteUrl } from "@/lib/schema";

// One entry per indexable page. lastModified is the page's real "updated"
// date (or the day it was added), so it does not change on every deploy.
export default function sitemap() {
  return siteEntries().map((e) => ({ url: absoluteUrl(e.path), lastModified: e.lastModified }));
}
