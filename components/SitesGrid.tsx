"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WebsiteRecord } from "@/lib/types";
import { WebsiteCard } from "@/components/WebsiteCard";

export function SitesGrid({ sites }: { sites: WebsiteRecord[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onDelete(id: string) {
    const ok = window.confirm("Padam laman web ini? Tindakan ini tidak boleh dibatalkan.");
    if (!ok) return;

    setError(null);
    setDeletingId(id);
    try {
      const res = await fetch(`/api/sites/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Gagal memadam");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memadam");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-8">
      {error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((s) => (
          <div key={s.id} className="space-y-3">
            <WebsiteCard site={s} />

            <div className="flex items-center gap-2">
              <Link
                href={`/admin/edit/${s.id}`}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
              >
                Edit laman web
              </Link>
              <button
                type="button"
                onClick={() => onDelete(s.id)}
                disabled={deletingId === s.id}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId === s.id ? "Memadamkan…" : "Padam"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

