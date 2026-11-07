import Search from "@/components/Search";
import { buildSearchIndex } from "@/lib/search";

// Server wrapper: builds the small search index at build time and hands
// it to the client-side Search box.
export default function SearchBox(props) {
  return <Search index={buildSearchIndex()} {...props} />;
}
