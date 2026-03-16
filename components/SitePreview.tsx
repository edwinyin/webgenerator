"use client";

import { useMemo, useState } from "react";
import { WebsiteRecord } from "@/lib/types";
import { SectionTabs } from "@/components/SectionTabs";

const TABS = [
  { id: "home", label: "Utama" },
  { id: "about", label: "Tentang Kami" },
  { id: "services", label: "Perkhidmatan" },
  { id: "contact", label: "Hubungi Kami" },
  { id: "hours", label: "Waktu Operasi" },
];

export function SitePreview({ site }: { site: WebsiteRecord }) {
  const [active, setActive] = useState<string>("home");

  const heroTitle = site.heroTitle || `Welcome to ${site.businessName}`;
  const heroDescription =
    site.heroDescription ||
    "Laman web perniagaan kecil yang moden, dijana daripada input borang anda.";

  const about = site.about || "Ceritakan kepada pelanggan apa yang menjadikan perniagaan anda istimewa.";

  const services = useMemo(() => {
    const list = site.services?.filter(Boolean) ?? [];
    return list.length ? list : ["Tambahkan perkhidmatan anda dalam borang pembina."];
  }, [site.services]);

  const contactBlocks = [
    { label: "Alamat", value: site.address },
    { label: "Telefon", value: site.phone },
    { label: "E-mel", value: site.email },
  ].filter((b) => (b.value || "").trim().length);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            {site.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={site.logoUrl}
                alt={`${site.businessName} logo`}
                className="h-10 w-10 rounded-xl object-cover ring-1 ring-zinc-200"
              />
            ) : (
              <div className="h-10 w-10 rounded-xl bg-zinc-900" />
            )}
            <div>
              <p className="text-base font-bold text-zinc-900">
                {site.businessName}
              </p>
              {site.tagline ? (
                <p className="text-sm text-zinc-600">{site.tagline}</p>
              ) : null}
            </div>
          </div>

          <a
            href="#contact"
            className="hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 sm:inline-flex"
          >
            Hubungi Kami
          </a>
        </div>
      </header>

      <main>
        <section className="relative">
          {site.bannerUrl ? (
            <div className="relative h-72 w-full sm:h-96">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.bannerUrl}
                alt={`${site.businessName} banner`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
            </div>
          ) : (
            <div className="h-72 w-full bg-gradient-to-br from-sky-500 to-zinc-900 sm:h-96" />
          )}

          <div className="mx-auto -mt-28 max-w-6xl px-4 sm:-mt-32 sm:px-6">
            <div className="rounded-3xl border border-zinc-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-10">
              <p className="text-sm font-semibold text-sky-700">
                Laman web perniagaan kecil
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
                {heroDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Dapatkan sebutan harga
                </a>
                <a
                  href="#content"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
                >
                  Ketahui lebih lanjut
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="content" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
            <SectionTabs tabs={TABS} activeId={active} onChange={setActive} />

            <div className="mt-6">
              {active === "home" ? (
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-zinc-900">
                      Apa yang kami lakukan
                    </h2>
                    <p className="mt-2 text-zinc-600">{about}</p>
                  </div>
                  <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-200">
                    <p className="text-sm font-semibold text-zinc-900">
                      Maklumat ringkas
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-zinc-700">
                      {site.phone ? <p>{site.phone}</p> : null}
                      {site.email ? <p>{site.email}</p> : null}
                      {site.address ? <p>{site.address}</p> : null}
                    </div>
                  </div>
                </div>
              ) : null}

              {active === "about" ? (
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">Tentang kami</h2>
                  <p className="mt-2 text-zinc-600">{about}</p>
                </div>
              ) : null}

              {active === "services" ? (
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">Perkhidmatan</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {services.map((s, idx) => (
                      <div
                        key={`${s}-${idx}`}
                        className="rounded-2xl border border-zinc-200 bg-white p-4"
                      >
                        <p className="font-semibold text-zinc-900">{s}</p>
                        <p className="mt-1 text-sm text-zinc-600">
                          Penerangan demo ringkas — sesuaikan mengikut perkhidmatan.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {active === "hours" ? (
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">
                    Waktu operasi
                  </h2>
                  <pre className="mt-3 whitespace-pre-wrap rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700 ring-1 ring-inset ring-zinc-200">
                    {site.operatingHours || "Tambahkan waktu operasi anda dalam borang pembina."}
                  </pre>
                </div>
              ) : null}

              {active === "contact" ? (
                <div id="contact">
                  <h2 className="text-xl font-bold text-zinc-900">Hubungi</h2>
                  {site.contact ? (
                    <p className="mt-2 text-zinc-600">{site.contact}</p>
                  ) : null}

                  {contactBlocks.length ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {contactBlocks.map((b) => (
                        <div
                          key={b.label}
                          className="rounded-2xl border border-zinc-200 bg-white p-4"
                        >
                          <p className="text-sm font-semibold text-zinc-900">
                            {b.label}
                          </p>
                          <p className="mt-1 text-sm text-zinc-700">
                            {b.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-zinc-600">
                      Tambahkan maklumat hubungan anda dalam borang pembina.
                    </p>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {site.galleryUrls?.length ? (
            <div className="mt-10">
              <h3 className="text-lg font-bold text-zinc-900">Galeri</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {site.galleryUrls.map((url) => (
                  <div
                    key={url}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="h-40 w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-zinc-600 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.businessName}
          </p>
          <p className="text-zinc-500">
            Laman web demo yang dijana oleh Pembina Laman Web.
          </p>
        </div>
      </footer>
    </div>
  );
}

