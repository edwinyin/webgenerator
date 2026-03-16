import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold text-sky-700">
          Demo: pembina laman web perniagaan kecil
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
          Cipta laman web perniagaan dalam minit
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
          Platform ini menyimpan data dalam pangkalan data awan dan imej dalam storan awan.
          Setiap laman web yang dijana dipaparkan pada satu laluan dan menggunakan tab
          untuk mensimulasikan laman berbilang halaman.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/admin/create"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Cipta laman web
          </Link>
          <Link
            href="/sites"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
          >
            Lihat laman web yang dicipta
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-200">
            <p className="text-sm font-semibold text-zinc-900">Tiada pengesahan</p>
            <p className="mt-1 text-sm text-zinc-600">Sekadar demo.</p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-200">
            <p className="text-sm font-semibold text-zinc-900">Pangkalan data awan</p>
            <p className="mt-1 text-sm text-zinc-600">
              Disimpan dalam <span className="font-mono">Turso</span>.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-200">
            <p className="text-sm font-semibold text-zinc-900">Storan awan</p>
            <p className="mt-1 text-sm text-zinc-600">
              Imej disimpan dalam <span className="font-mono">Supabase Storage</span>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

