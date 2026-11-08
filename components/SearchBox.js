import Search from "@/components/Search";

// The search box. It loads its index (/search-index.json) only when the
// user first focuses it, so the index is not in every page's JavaScript.
export default function SearchBox(props) {
  return <Search {...props} />;
}
