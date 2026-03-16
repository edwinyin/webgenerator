import Link from "next/link";
import { WebsiteForm } from "@/components/WebsiteForm";
import { getSiteById } from "@/lib/sitesStore";

export const dynamic = "force-dynamic";

export default async function EditWebsitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const site = await getSiteById(id);

  if (!site) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-zinc-900">Laman web tidak dijumpai</p>
          <p className="mt-2 text-sm text-zinc-600">
            Laman web ini mungkin telah dipadam.
          </p>
          <div className="mt-6">
            <Link
              href="/sites"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Kembali ke laman web
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <WebsiteForm
        mode="edit"
        siteId={site.id}
        initial={{
          businessName: site.businessName,
          tagline: site.tagline,
          heroTitle: site.heroTitle,
          heroDescription: site.heroDescription,
          about: site.about,
          services: (site.services || []).join("\n"),
          contact: site.contact,
          operatingHours: site.operatingHours,
          address: site.address,
          phone: site.phone,
          email: site.email,
        }}
      />
    </main>
  );
}

