"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/ImageUploadField";

type FormState = {
  businessName: string;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  about: string;
  services: string;
  contact: string;
  operatingHours: string;
  address: string;
  phone: string;
  email: string;
};

const INITIAL: FormState = {
  businessName: "",
  tagline: "",
  heroTitle: "",
  heroDescription: "",
  about: "",
  services: "",
  contact: "",
  operatingHours: "",
  address: "",
  phone: "",
  email: "",
};

export function WebsiteForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return form.businessName.trim().length > 0 && !submitting;
  }, [form.businessName, submitting]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const fd = new FormData();
      for (const [k, v] of Object.entries(form)) fd.append(k, v);
      if (logo) fd.append("logo", logo);
      if (banner) fd.append("banner", banner);
      for (const f of gallery || []) fd.append("gallery", f);

      const res = await fetch("/api/sites", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to create site");
      }

      setSuccess("Website created. Redirecting…");
      router.push("/sites");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  function field(
    key: keyof FormState,
    opts?: { label?: string; placeholder?: string; textarea?: boolean; rows?: number },
  ) {
    const label = opts?.label ?? key;
    const value = form[key];
    const common =
      "mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200";

    return (
      <label className="block" key={key}>
        <span className="text-sm font-medium text-zinc-900">{label}</span>
        {opts?.textarea ? (
          <textarea
            className={common}
            rows={opts.rows ?? 4}
            value={value}
            placeholder={opts?.placeholder}
            onChange={(e) => setForm((s) => ({ ...s, [key]: e.target.value }))}
          />
        ) : (
          <input
            className={common}
            value={value}
            placeholder={opts?.placeholder}
            onChange={(e) => setForm((s) => ({ ...s, [key]: e.target.value }))}
          />
        )}
      </label>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
              Create a website
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Fill in the business details, upload a couple images, and generate a
              demo website.
            </p>
          </div>
          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 sm:mt-0"
          >
            {submitting ? "Creating…" : "Create website"}
          </button>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            {success}
          </div>
        ) : null}

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {field("businessName", { label: "Business name", placeholder: "Acme Plumbing" })}
          {field("tagline", { label: "Tagline", placeholder: "Fast, friendly, local service" })}
          {field("heroTitle", { label: "Hero title", placeholder: "A headline customers remember" })}
          {field("heroDescription", {
            label: "Hero description",
            placeholder: "A short sentence explaining what you do best.",
          })}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {field("about", {
            label: "About",
            textarea: true,
            rows: 6,
            placeholder: "A short paragraph about your business.",
          })}
          {field("services", {
            label: "Services (one per line)",
            textarea: true,
            rows: 6,
            placeholder: "Service 1\nService 2\nService 3",
          })}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {field("contact", {
            label: "Contact blurb",
            textarea: true,
            rows: 4,
            placeholder: "How should customers reach you?",
          })}
          {field("operatingHours", {
            label: "Operating hours",
            textarea: true,
            rows: 4,
            placeholder: "Mon–Fri: 9am–5pm\nSat: 10am–2pm\nSun: Closed",
          })}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {field("address", { label: "Address", placeholder: "123 Main St, City, State" })}
          {field("phone", { label: "Phone", placeholder: "(555) 123-4567" })}
          {field("email", { label: "Email", placeholder: "hello@business.com" })}
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-zinc-900">Images</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Uploads are stored locally in <span className="font-mono">public/uploads</span>.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <ImageUploadField
            label="Logo"
            name="logo"
            files={logo}
            onChange={(f) => setLogo(f as File | null)}
            hint="Square works best"
          />
          <ImageUploadField
            label="Banner"
            name="banner"
            files={banner}
            onChange={(f) => setBanner(f as File | null)}
            hint="Wide image recommended"
          />
        </div>

        <div className="mt-6">
          <ImageUploadField
            label="Gallery (optional)"
            name="gallery"
            multiple
            files={gallery}
            onChange={(f) => setGallery(f as File[] | null)}
            hint="You can select multiple files"
          />
        </div>
      </div>
    </form>
  );
}

