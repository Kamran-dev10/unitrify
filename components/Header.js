import Link from "next/link";
import { SITE_NAME } from "@/lib/config";
import { menuGroups } from "@/lib/groups";
import SearchBox from "@/components/SearchBox";
import AllConvertersMenu from "@/components/AllConvertersMenu";

// One row: logo, "All converters" menu, search. The header is "relative"
// so the desktop menu panel opens right under it, full width.
export default function Header() {
  return (
    <header className="relative border-b border-line bg-surface">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-3">
        {/* The "Unit Converter" label tells people what the site is; hidden on narrow phones. */}
        <Link href="/" className="group flex shrink-0 items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
            {SITE_NAME}
          </span>
          <span className="hidden text-xs text-muted min-[480px]:inline">Unit Converter</span>
        </Link>
        <AllConvertersMenu groups={menuGroups()} />
        {/* Hidden on the homepage, which has its own big search box (globals.css). */}
        <div data-header-search className="min-w-0 flex-1 sm:ml-auto sm:max-w-xs">
          <SearchBox placeholder="Search" />
        </div>
      </div>
    </header>
  );
}
