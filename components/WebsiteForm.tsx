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

export function WebsiteForm(props: {
  mode?: "create" | "edit";
  siteId?: string;
  initial?: Partial<FormState>;
}) {
  const router = useRouter();
  const mode = props.mode ?? "create";
  const [form, setForm] = useState<FormState>({ ...INITIAL, ...props.initial });
  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function pick<T,>(items: T[]) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function randomPhone() {
    const a = Math.floor(200 + Math.random() * 700);
    const b = Math.floor(200 + Math.random() * 700);
    const c = Math.floor(1000 + Math.random() * 9000);
    return `(${a}) ${b}-${c}`;
  }

  function randomHours() {
    const patterns = [
      "Mon–Fri: 8am–6pm\nSat: 9am–2pm\nSun: Closed",
      "Mon–Thu: 9am–5pm\nFri: 9am–4pm\nSat: 10am–2pm\nSun: Closed",
      "Mon–Sat: 10am–7pm\nSun: 11am–4pm",
      "Mon–Fri: 7am–3pm\nSat–Sun: Closed",
    ];
    return pick(patterns);
  }

  function fillRandom() {
    setError(null);
    setSuccess(null);

    const templates = [
      {
        businessName: () =>
          `${pick(["Evergreen", "Sunrise", "Bluebird", "Maple", "Cedar", "Harbor", "Bright"])} ${pick(["Plumbing", "Dental", "Fitness", "Bakery", "Landscaping", "Auto Repair", "Cleaning", "Pet Grooming"])}${pick([" Co.", " Studio", " & Co.", ""])}`
            .replace(/\s+/g, " ")
            .trim(),
        tagline: () =>
          pick([
            "Fast, friendly, local service.",
            "Quality work at honest prices.",
            "Modern care for busy families.",
            "Made fresh every morning.",
            "Your neighborhood experts.",
          ]),
        heroTitle: (name: string) =>
          pick([
            `Welcome to ${name}`,
            "Service you can trust",
            "Small business. Big standards.",
            "Comfort, quality, and care",
          ]),
        heroDescription: () =>
          pick([
            "We make it easy to get the help you need—clear pricing, friendly staff, and great results.",
            "Book in minutes and get a quick quote. We focus on quality, speed, and a great customer experience.",
            "Professional service with a personal touch. Serving the community with pride.",
          ]),
        about: (name: string) =>
          pick([
            `${name} is a locally owned team focused on reliable service and great communication. We show up on time, do the job right, and keep things simple from start to finish.`,
            `We built ${name} to be the kind of business we’d want to use: friendly people, straightforward pricing, and consistent quality. Our goal is to earn your trust for the long haul.`,
          ]),
        services: (category: string) => {
          const byCategory: Record<string, string[]> = {
            Plumbing: [
              "Leak detection & repair",
              "Water heater install & repair",
              "Drain cleaning",
              "Fixture replacement",
            ],
            Dental: [
              "Cleanings & checkups",
              "Whitening",
              "Fillings & crowns",
              "Emergency appointments",
            ],
            Fitness: [
              "Personal training",
              "Group classes",
              "Strength programming",
              "Nutrition coaching",
            ],
            Bakery: [
              "Fresh bread daily",
              "Custom cakes",
              "Pastries & coffee",
              "Catering boxes",
            ],
            Landscaping: [
              "Lawn maintenance",
              "Seasonal cleanups",
              "Mulch & edging",
              "Irrigation checks",
            ],
            "Auto Repair": [
              "Oil changes",
              "Brake service",
              "Diagnostics",
              "Tire rotation",
            ],
            Cleaning: [
              "Standard home cleaning",
              "Deep cleans",
              "Move-in / move-out",
              "Office cleaning",
            ],
            "Pet Grooming": [
              "Bath & brush",
              "Haircut & styling",
              "Nail trim",
              "De-shedding",
            ],
          };
          const list = byCategory[category] || [
            "Consultations",
            "Packages",
            "Maintenance",
            "Emergency support",
          ];
          return list.join("\n");
        },
        contact: () =>
          pick([
            "Call or email us for a quick quote. Same-week appointments are often available.",
            "Have a question? Reach out and we’ll respond within 1 business day.",
            "Tell us what you need and we’ll recommend the best option for your budget and timeline.",
          ]),
        address: () =>
          `${pick(["123", "245", "18", "77", "560"])} ${pick(["Main", "Oak", "Pine", "Market", "Cedar", "Sunset"])} St, ${pick(["San Diego", "Austin", "Seattle", "Denver", "Miami", "Portland"])}, ${pick(["CA", "TX", "WA", "CO", "FL", "OR"])}`,
      },
      {
        businessName: () =>
          `${pick(["Northside", "Downtown", "Coastal", "Lakeside", "Uptown"])} ${pick(["Wellness", "Barbershop", "Yoga", "Cafe", "Studio", "Spa"])}${pick(["", " Collective", " House"])}`.trim(),
        tagline: () =>
          pick([
            "A better routine starts here.",
            "Simple, calm, and consistent.",
            "Walk in. Feel better. Repeat.",
            "Good vibes, great service.",
          ]),
        heroTitle: (name: string) =>
          pick([
            `Make time for ${name.split(" ")[0]}`,
            "Your new favorite place",
            "Feel-good service, done right",
          ]),
        heroDescription: () =>
          pick([
            "Clean space, friendly staff, and flexible scheduling—built for real life.",
            "Book a spot, show up, and let us handle the rest.",
          ]),
        about: (name: string) =>
          pick([
            `${name} is designed to be welcoming, easy to book, and easy to love. We keep things simple and focus on doing the basics exceptionally well.`,
            `We’re a local team that cares about the details—service, cleanliness, and consistency. That’s what brings people back to ${name}.`,
          ]),
        services: () =>
          pick([
            "Appointments\nMemberships\nPackages\nGift cards",
            "Walk-ins\nAppointments\nPackages\nAdd-ons",
          ]),
        contact: () =>
          pick([
            "Text us to book, or call during business hours. We’re happy to help.",
            "Email us with any questions—quotes and scheduling are quick and easy.",
          ]),
        address: () =>
          `${pick(["44", "90", "310", "12"])} ${pick(["Broadway", "1st Ave", "2nd Ave", "Center"])} , ${pick(["Los Angeles", "Phoenix", "Nashville", "Chicago"])}, ${pick(["CA", "AZ", "TN", "IL"])}`.replace(
            /\s+/g,
            " ",
          ),
      },
    ];

    const t = pick(templates);
    const businessName = t.businessName();
    const categoryMatch = businessName.match(
      /(Plumbing|Dental|Fitness|Bakery|Landscaping|Auto Repair|Cleaning|Pet Grooming)/,
    );
    const category = categoryMatch?.[1] || "Service";

    const emailDomain = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 24);

    setForm({
      businessName,
      tagline: t.tagline(),
      heroTitle: t.heroTitle(businessName),
      heroDescription: t.heroDescription(),
      about: t.about(businessName),
      services: t.services(category),
      contact: t.contact(),
      operatingHours: randomHours(),
      address: t.address(),
      phone: randomPhone(),
      email: `hello@${emailDomain || "business"}.test`,
    });
  }

  const canSubmit = useMemo(() => {
    return form.businessName.trim().length > 0 && !submitting;
  }, [form.businessName, submitting]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      if (mode === "edit" && !props.siteId) {
        throw new Error("Missing site id");
      }

      const fd = new FormData();
      for (const [k, v] of Object.entries(form)) fd.append(k, v);
      if (logo) fd.append("logo", logo);
      if (banner) fd.append("banner", banner);
      for (const f of gallery || []) fd.append("gallery", f);

      const url = mode === "edit" ? `/api/sites/${props.siteId}` : "/api/sites";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, { method, body: fd });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to create site");
      }

      setSuccess(mode === "edit" ? "Website updated. Redirecting…" : "Website created. Redirecting…");
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
              {mode === "edit" ? "Edit website" : "Create a website"}
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              {mode === "edit"
                ? "Update the business details and regenerate the demo preview."
                : "Fill in the business details, upload a couple images, and generate a demo website."}
            </p>
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center">
            {mode === "create" ? (
              <button
                type="button"
                onClick={fillRandom}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
              >
                Fill random demo data
              </button>
            ) : null}
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (mode === "edit" ? "Saving…" : "Creating…") : mode === "edit" ? "Save changes" : "Create website"}
            </button>
          </div>
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

