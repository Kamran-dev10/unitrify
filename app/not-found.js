import Link from "next/link";
import SearchBox from "@/components/SearchBox";

export const metadata = {
  title: { absolute: "Page not found" },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-24">
      <p className="text-sm font-medium text-muted">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">We couldn’t find that page</h1>
      <p className="mt-4 text-lg text-muted">
        The link may be old or mistyped. Try searching for the converter you need.
      </p>
      <div className="mt-8">
        <SearchBox size="lg" placeholder="Try “marla” or “kg to lbs”" />
      </div>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-control bg-accent px-6 font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Go to the homepage
      </Link>
    </main>
  );
}
