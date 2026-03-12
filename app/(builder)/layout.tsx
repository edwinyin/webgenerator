import Link from "next/link";

export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-extrabold tracking-tight text-zinc-900"
          >
            Website Builder MVP
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/admin/create"
              className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
            >
              Create
            </Link>
            <Link
              href="/sites"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Sites
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </>
  );
}

