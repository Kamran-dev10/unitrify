import Breadcrumbs from "@/components/Breadcrumbs";

// Layout for text pages like About and Privacy Policy.
export default function SimplePage({ title, path, children }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </main>
  );
}
