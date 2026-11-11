import Breadcrumbs from "@/components/Breadcrumbs";

// Shared layout for About, How we verify, Contact and Privacy Policy:
// a short header (h1 + one-line intro), then the content in a readable card.
// Use <SimpleSection> inside for headings with an icon.
export default function SimplePage({ title, intro, path, children }) {
  return (
    <main className="mx-auto w-full max-w-[732px] px-4 py-10 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <header className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {intro && <p className="mt-3 text-lg leading-relaxed text-muted">{intro}</p>}
      </header>
      <div className="mt-8 rounded-card border border-line bg-surface p-5 shadow-card sm:p-8">
        <div className="space-y-8 text-base leading-[1.75] sm:text-[17px]">{children}</div>
      </div>
    </main>
  );
}

// A section with an accent line icon (lucide) beside its heading.
export function SimpleSection({ icon: Icon, title, children }) {
  return (
    <section>
      <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
        {Icon && <Icon aria-hidden="true" focusable="false" strokeWidth={1.75} className="h-5 w-5 shrink-0 text-accent" />}
        {title}
      </h2>
      <div className="mt-3 space-y-4 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">{children}</div>
    </section>
  );
}
