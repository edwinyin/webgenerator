import Link from "next/link";
import { WebsiteRecord } from "@/lib/types";

export function WebsiteCard({ site }: { site: WebsiteRecord }) {
  const previewImg = site.logoUrl || site.bannerUrl;
  const aboutShort = (site.about || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative h-40 w-full bg-zinc-900">
        {site.bannerUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.bannerUrl}
            alt={`${site.businessName} banner`}
            className="h-full w-full object-cover opacity-95"
          />
        ) : previewImg ? (
          <div className="flex h-full items-center justify-center bg-zinc-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImg}
              alt={`${site.businessName} preview`}
              className="h-16 w-16 rounded-2xl object-cover ring-1 ring-zinc-200"
            />
          </div>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-sky-500 to-zinc-900" />
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start gap-3">
          {site.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.logoUrl}
              alt={`${site.businessName} logo`}
              className="h-12 w-12 rounded-2xl object-cover ring-1 ring-zinc-200"
            />
          ) : (
            <div className="h-12 w-12 rounded-2xl bg-zinc-900" />
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-zinc-900">
              {site.businessName}
            </p>
            {site.tagline ? (
              <p className="truncate text-sm text-zinc-600">{site.tagline}</p>
            ) : (
              <p className="text-sm text-zinc-500">Tiada tagline</p>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-zinc-600">
          {aboutShort || "Tiada maklumat tentang perniagaan lagi."}
          {aboutShort.length >= 140 ? "…" : ""}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">/{site.slug}</p>
          <Link
            href={`/site/${site.slug}`}
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Pratonton
          </Link>
        </div>
      </div>
    </div>
  );
}

