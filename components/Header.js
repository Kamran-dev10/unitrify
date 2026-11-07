import Link from "next/link";
import { SITE_NAME } from "@/lib/config";
import SearchBox from "@/components/SearchBox";

export default function Header() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 py-3">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-ink transition-colors hover:text-accent"
        >
          {SITE_NAME}
        </Link>
        <div className="min-w-0 flex-1 sm:ml-auto sm:max-w-xs">
          <SearchBox placeholder="Search" />
        </div>
      </div>
    </header>
  );
}
