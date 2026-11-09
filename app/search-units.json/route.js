import { buildSearchUnits } from "@/lib/search/units-data";

// Compact unit data for the search box's instant answers, as a static JSON
// file built once at build time. Loaded only when the search box is focused.
export function GET() {
  return Response.json(buildSearchUnits());
}
