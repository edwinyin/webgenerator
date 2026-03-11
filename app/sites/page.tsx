import Link from "next/link";
import { getAllSites } from "@/lib/sitesStore";
import { WebsiteCard } from "@/components/WebsiteCard";

export const dynamic = "force-dynamic";

export default async function SitesPage() {
  const sites = await getAllSites();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
            Created websites
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Open any card to preview the single-route generated website.
          </p>
        </div>
        <Link
          href="/admin/create"
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Create new
        </Link>
      </div>

      {sites.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-zinc-900">No websites yet</p>
          <p className="mt-2 text-sm text-zinc-600">
            Create your first demo website to see it appear here.
          </p>
          <div className="mt-6">
            <Link
              href="/admin/create"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Create a website
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((s) => (
            <WebsiteCard key={s.id} site={s} />
          ))}
        </div>
      )}
    </main>
  );
}

