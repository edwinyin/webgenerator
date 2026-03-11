import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold text-sky-700">
          Demo: small business website builder
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
          Create a business website in minutes
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
          This MVP stores everything locally (JSON + uploaded images). Each generated
          website renders on a single route and uses front-end tabs to simulate a
          multi-page site.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/admin/create"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Create a website
          </Link>
          <Link
            href="/sites"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
          >
            View created websites
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-200">
            <p className="text-sm font-semibold text-zinc-900">No auth</p>
            <p className="mt-1 text-sm text-zinc-600">Purely a demo.</p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-200">
            <p className="text-sm font-semibold text-zinc-900">No database</p>
            <p className="mt-1 text-sm text-zinc-600">
              Stored in <span className="font-mono">data/sites.json</span>.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-200">
            <p className="text-sm font-semibold text-zinc-900">Local uploads</p>
            <p className="mt-1 text-sm text-zinc-600">
              Images saved to <span className="font-mono">public/uploads</span>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
