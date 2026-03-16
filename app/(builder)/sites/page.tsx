import Link from "next/link";
import { getAllSites } from "@/lib/sitesStore";
import { SitesGrid } from "@/components/SitesGrid";

export const dynamic = "force-dynamic";

export default async function SitesPage() {
  const sites = await getAllSites();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl bg-zinc-900 px-6 py-6 shadow-sm sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Laman web yang dicipta
            </h1>
            <p className="mt-1 text-sm text-white/80">
              Buka mana-mana kad untuk pratonton laman web yang dijana.
            </p>
          </div>
          <Link
            href="/admin/create"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
          >
            Cipta baharu
          </Link>
        </div>
      </div>

      {sites.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-zinc-900">Tiada laman web lagi</p>
          <p className="mt-2 text-sm text-zinc-600">
            Cipta laman web demo pertama anda untuk melihatnya di sini.
          </p>
          <div className="mt-6">
            <Link
              href="/admin/create"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Cipta laman web
            </Link>
          </div>
        </div>
      ) : (
        <SitesGrid sites={sites} />
      )}
    </main>
  );
}

