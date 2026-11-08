import Link from "next/link";
import { cacheLife } from "next/cache";
import { SITE_NAME } from "@/lib/config";
import { CONVERTER_GROUPS, ALL_CONVERTERS_PAGE } from "@/lib/groups";

// The year is read once at build time and cached, so the footer stays static.
async function getYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

const linkClass = "inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-ink";

export default async function Footer() {
  const year = await getYear();
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold">Converters</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4">
              {CONVERTER_GROUPS.map((g) => (
                <li key={g.id}>
                  <Link href={g.path} className={linkClass}>
                    {g.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ALL_CONVERTERS_PAGE.path} className={`${linkClass} font-medium`}>
                  All converters
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">{SITE_NAME}</h2>
            <ul className="mt-3">
              <li>
                <Link href="/about" className={linkClass}>About</Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkClass}>Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </nav>
        <p className="mt-10 text-sm text-muted">
          © {year} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
