import Link from "next/link";
import { getSiteBySlug } from "@/lib/sitesStore";
import { SitePreview } from "@/components/SitePreview";

export const dynamic = "force-dynamic";

export default async function SiteBySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);

  if (!site) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-zinc-900">Laman web tidak dijumpai</p>
          <p className="mt-2 text-sm text-zinc-600">
            Tiada laman web yang dijana untuk{" "}
            <span className="font-mono">/{slug}</span>.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/sites"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Kembali ke laman web
            </Link>
            <Link
              href="/admin/create"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
            >
              Cipta laman web baharu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <SitePreview site={site} />;
}
