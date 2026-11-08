import { buildSearchIndex } from "@/lib/search";

// The search index as a static JSON file (/search-index.json), built once
// at build time. The search box fetches it only when it is first focused,
// so it is not part of every page's JavaScript.
export function GET() {
  return Response.json(buildSearchIndex());
}
