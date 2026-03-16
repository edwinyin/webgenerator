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
      "Isn\u2013Jum: 8pg\u20136ptg\nSab: 9pg\u20132ptg\nAhd: Tutup",
      "Isn\u2013Kha: 9pg\u20135ptg\nJum: 9pg\u20134ptg\nSab: 10pg\u20132ptg\nAhd: Tutup",
      "Isn\u2013Sab: 10pg\u20137ptg\nAhd: 11pg\u20134ptg",
      "Isn\u2013Jum: 7pg\u20133ptg\nSab\u2013Ahd: Tutup",
    ];
    return pick(patterns);
  }

  function fillRandom() {
    setError(null);
    setSuccess(null);

    const templates = [
      {
        businessName: () =>
          `${pick(["Evergreen", "Sunrise", "Bluebird", "Maple", "Cedar", "Harbor", "Bright"])} ${pick(["Paip & Sanitari", "Pergigian", "Kecergasan", "Bakeri", "Landskap", "Servis Kereta", "Perkhidmatan Bersih", "Dandanan Haiwan"])}${pick([" Sdn.", " Studio", " & Rakan", ""])}`
            .replace(/\s+/g, " ")
            .trim(),
        tagline: () =>
          pick([
            "Perkhidmatan pantas, mesra, dan tempatan.",
            "Kerja berkualiti dengan harga yang jujur.",
            "Penjagaan moden untuk keluarga yang sibuk.",
            "Dibuat segar setiap pagi.",
            "Pakar kejiranan anda.",
          ]),
        heroTitle: (name: string) =>
          pick([
            `Selamat datang ke ${name}`,
            "Perkhidmatan yang boleh dipercayai",
            "Perniagaan kecil. Standard tinggi.",
            "Keselesaan, kualiti, dan penjagaan",
          ]),
        heroDescription: () =>
          pick([
            "Kami memudahkan anda mendapat bantuan yang diperlukan dengan harga jelas, kakitangan mesra, dan hasil yang cemerlang.",
            "Tempah dalam minit dan dapatkan sebutan harga dengan cepat. Kami mengutamakan kualiti, kelajuan, dan pengalaman pelanggan yang hebat.",
            "Perkhidmatan profesional dengan sentuhan peribadi. Berkhidmat kepada komuniti dengan penuh bangga.",
          ]),
        about: (name: string) =>
          pick([
            `${name} ialah pasukan milik tempatan yang mengutamakan perkhidmatan boleh dipercayai dan komunikasi yang baik. Kami hadir tepat pada masa, melakukan kerja dengan betul, dan memastikan segalanya mudah dari mula hingga akhir.`,
            `Kami membina ${name} untuk menjadi perniagaan yang kami sendiri mahu gunakan: orang yang mesra, harga yang jelas, dan kualiti yang konsisten. Matlamat kami adalah untuk mendapatkan kepercayaan anda dalam jangka masa panjang.`,
          ]),
        services: (category: string) => {
          const byCategory: Record<string, string[]> = {
            "Paip & Sanitari": [
              "Pengesanan & pembaikan kebocoran",
              "Pemasangan & pembaikan pemanas air",
              "Pembersihan parit",
              "Penggantian lekapan",
            ],
            Pergigian: [
              "Pembersihan & pemeriksaan",
              "Pemutihan gigi",
              "Tampalan & mahkota",
              "Temujanji kecemasan",
            ],
            Kecergasan: [
              "Latihan peribadi",
              "Kelas berkumpulan",
              "Program kekuatan",
              "Bimbingan pemakanan",
            ],
            Bakeri: [
              "Roti segar setiap hari",
              "Kek tempahan",
              "Pastri & kopi",
              "Kotak katering",
            ],
            Landskap: [
              "Penyelenggaraan halaman",
              "Pembersihan musiman",
              "Penutup bumi & tepi",
              "Pemeriksaan pengairan",
            ],
            "Servis Kereta": [
              "Tukar minyak",
              "Servis brek",
              "Diagnostik",
              "Putaran tayar",
            ],
            "Perkhidmatan Bersih": [
              "Pembersihan rumah standard",
              "Pembersihan mendalam",
              "Masuk / keluar rumah",
              "Pembersihan pejabat",
            ],
            "Dandanan Haiwan": [
              "Mandi & sikat",
              "Gunting & gaya rambut",
              "Potong kuku",
              "Penyingkiran bulu",
            ],
          };
          const list = byCategory[category] || [
            "Konsultasi",
            "Pakej",
            "Penyelenggaraan",
            "Sokongan kecemasan",
          ];
          return list.join("\n");
        },
        contact: () =>
          pick([
            "Hubungi atau e-mel kami untuk sebutan harga yang cepat. Temujanji minggu yang sama selalunya tersedia.",
            "Ada soalan? Hubungi kami dan kami akan bertindak balas dalam 1 hari bekerja.",
            "Beritahu kami apa yang anda perlukan dan kami akan mencadangkan pilihan terbaik untuk bajet dan jadual anda.",
          ]),
        address: () =>
          `${pick(["123", "245", "18", "77", "560"])} Jalan ${pick(["Utama", "Oak", "Pines", "Pasar", "Senja"])}, ${pick(["Kuala Lumpur", "Petaling Jaya", "Georgetown", "Johor Bahru", "Shah Alam", "Ipoh"])}, ${pick(["Selangor", "W. Persekutuan", "Pulau Pinang", "Johor", "Perak"])}`,
      },
      {
        businessName: () =>
          `${pick(["Northside", "Downtown", "Coastal", "Lakeside", "Uptown"])} ${pick(["Wellness", "Gunting Rambut", "Yoga", "Kafe", "Studio", "Spa"])}${pick(["", " Kolektif", " Haus"])}`.trim(),
        tagline: () =>
          pick([
            "Rutin yang lebih baik bermula di sini.",
            "Mudah, tenang, dan konsisten.",
            "Masuk. Rasa lebih baik. Ulang.",
            "Suasana baik, perkhidmatan hebat.",
          ]),
        heroTitle: (name: string) =>
          pick([
            `Luangkan masa untuk ${name.split(" ")[0]}`,
            "Tempat kegemaran baharu anda",
            "Perkhidmatan yang menyenangkan, dilakukan dengan betul",
          ]),
        heroDescription: () =>
          pick([
            "Ruang bersih, kakitangan mesra, dan jadual yang fleksibel dibina untuk kehidupan nyata.",
            "Tempah tempat, hadir, dan biar kami uruskan selebihnya.",
          ]),
        about: (name: string) =>
          pick([
            `${name} direka untuk menjadi tempat yang mesra, mudah ditempah, dan mudah disukai. Kami memastikan segalanya mudah dan menumpukan perhatian pada melakukan perkara asas dengan sangat baik.`,
            `Kami adalah pasukan tempatan yang mengambil berat tentang perincian seperti perkhidmatan, kebersihan, dan konsistensi. Itulah yang membawa orang kembali ke ${name}.`,
          ]),
        services: () =>
          pick([
            "Temujanji\nKeahlian\nPakej\nKad hadiah",
            "Datang terus\nTemujanji\nPakej\nTambahan",
          ]),
        contact: () =>
          pick([
            "Mesej kami untuk menempah, atau hubungi semasa waktu perniagaan. Kami gembira membantu.",
            "E-mel kami dengan sebarang soalan. Sebutan harga dan penjadualan adalah cepat dan mudah.",
          ]),
        address: () =>
          `${pick(["44", "90", "310", "12"])} ${pick(["Jalan Bukit", "Jalan 1", "Jalan 2", "Jalan Tengah"])}, ${pick(["Subang Jaya", "Melaka", "Kota Kinabalu", "Kuching"])}, ${pick(["Selangor", "Melaka", "Sabah", "Sarawak"])}`,
      },
    ];

    const t = pick(templates);
    const businessName = t.businessName();
    const categoryMatch = businessName.match(
      /(Paip & Sanitari|Pergigian|Kecergasan|Bakeri|Landskap|Servis Kereta|Perkhidmatan Bersih|Dandanan Haiwan)/,
    );
    const category = categoryMatch?.[1] || "Lain-lain";

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
      email: `hello@${emailDomain || "perniagaan"}.test`,
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
        throw new Error("ID laman web tiada");
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
        throw new Error(data?.error || "Gagal mencipta laman web");
      }

      setSuccess(mode === "edit" ? "Laman web telah dikemaskini. Mengalihkan\u2026" : "Laman web telah dicipta. Mengalihkan\u2026");
      router.push("/sites");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sesuatu telah berlaku");
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
              {mode === "edit" ? "Edit laman web" : "Cipta laman web"}
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              {mode === "edit"
                ? "Kemaskini maklumat perniagaan dan jana semula pratonton demo."
                : "Isi maklumat perniagaan, muat naik beberapa imej, dan jana laman web demo."}
            </p>
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center">
            {mode === "create" ? (
              <button
                type="button"
                onClick={fillRandom}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
              >
                Isi data demo rawak
              </button>
            ) : null}
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (mode === "edit" ? "Menyimpan\u2026" : "Mencipta\u2026") : mode === "edit" ? "Simpan perubahan" : "Cipta laman web"}
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
          {field("businessName", { label: "Nama perniagaan", placeholder: "Syarikat Acme" })}
          {field("tagline", { label: "Tagline", placeholder: "Perkhidmatan pantas, mesra, tempatan" })}
          {field("heroTitle", { label: "Tajuk utama", placeholder: "Tajuk yang diingati pelanggan" })}
          {field("heroDescription", {
            label: "Penerangan utama",
            placeholder: "Ayat ringkas menerangkan apa yang anda lakukan dengan terbaik.",
          })}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {field("about", {
            label: "Tentang",
            textarea: true,
            rows: 6,
            placeholder: "Perenggan ringkas tentang perniagaan anda.",
          })}
          {field("services", {
            label: "Perkhidmatan (satu baris setiap satu)",
            textarea: true,
            rows: 6,
            placeholder: "Perkhidmatan 1\nPerkhidmatan 2\nPerkhidmatan 3",
          })}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {field("contact", {
            label: "Maklumat hubungan",
            textarea: true,
            rows: 4,
            placeholder: "Bagaimana pelanggan boleh menghubungi anda?",
          })}
          {field("operatingHours", {
            label: "Waktu operasi",
            textarea: true,
            rows: 4,
            placeholder: "Isn\u2013Jum: 9pg\u20135ptg\nSab: 10pg\u20132ptg\nAhd: Tutup",
          })}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {field("address", { label: "Alamat", placeholder: "123 Jalan Utama, Bandar, Negeri" })}
          {field("phone", { label: "Telefon", placeholder: "(555) 123-4567" })}
          {field("email", { label: "E-mel", placeholder: "hello@perniagaan.com" })}
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-zinc-900">Imej</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Imej disimpan dalam <span className="font-mono">Supabase Storage</span>.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <ImageUploadField
            label="Logo"
            name="logo"
            files={logo}
            onChange={(f) => setLogo(f as File | null)}
            hint="Imej segi empat adalah terbaik"
          />
          <ImageUploadField
            label="Banner"
            name="banner"
            files={banner}
            onChange={(f) => setBanner(f as File | null)}
            hint="Imej lebar disyorkan"
          />
        </div>

        <div className="mt-6">
          <ImageUploadField
            label="Galeri (pilihan)"
            name="gallery"
            multiple
            files={gallery}
            onChange={(f) => setGallery(f as File[] | null)}
            hint="Anda boleh pilih beberapa fail"
          />
        </div>
      </div>
    </form>
  );
}
