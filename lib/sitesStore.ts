import { promises as fs } from "fs";
import path from "path";
import { WebsiteRecord } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const SITES_PATH = path.join(DATA_DIR, "sites.json");

const SEED_SITES: WebsiteRecord[] = [
  {
    id: "seed-1",
    slug: "sparkle-auto-detailing",
    businessName: "Sparkle Auto Detailing",
    tagline: "Showroom shine, every time.",
    heroTitle: "Premium detailing for busy people",
    heroDescription:
      "Mobile and in-shop detailing packages designed to make your car look incredible—without the hassle.",
    about:
      "We’re a small, local team obsessed with the little things: clean lines, spotless interiors, and a finish that lasts. We use pro-grade products and a repeatable process so you know what you’ll get every time.",
    services: [
      "Exterior wash + wax",
      "Interior deep clean",
      "Ceramic coating",
      "Headlight restoration",
    ],
    contact:
      "Call or text us for a quick quote. Same-week appointments available for most packages.",
    operatingHours: "Mon–Sat: 9am–6pm\nSun: Closed",
    address: "123 Main St, San Diego, CA",
    phone: "(555) 123-4567",
    email: "hello@sparkleautodetailing.test",
    logoUrl: "/uploads/seed-logo.svg",
    bannerUrl: "/uploads/seed-banner.svg",
    galleryUrls: [],
    createdAt: new Date().toISOString(),
  },
];

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(SITES_PATH);
  } catch {
    await fs.writeFile(SITES_PATH, JSON.stringify(SEED_SITES, null, 2), "utf8");
  }
}

export async function readAllSites(): Promise<WebsiteRecord[]> {
  await ensureStore();
  const raw = await fs.readFile(SITES_PATH, "utf8");
  const parsed = JSON.parse(raw || "[]");
  return Array.isArray(parsed) ? (parsed as WebsiteRecord[]) : [];
}

export async function writeAllSites(sites: WebsiteRecord[]) {
  await ensureStore();
  await fs.writeFile(SITES_PATH, JSON.stringify(sites, null, 2), "utf8");
}

export async function getSiteBySlug(slug: string) {
  const sites = await readAllSites();
  return sites.find((s) => s.slug === slug) ?? null;
}

export async function getSiteById(id: string) {
  const sites = await readAllSites();
  return sites.find((s) => s.id === id) ?? null;
}

export async function getAllSites() {
  return await readAllSites();
}

export async function addSite(site: WebsiteRecord) {
  const sites = await readAllSites();
  sites.unshift(site);
  await writeAllSites(sites);
  return site;
}

export async function getUniqueSlug(baseSlug: string) {
  const sites = await readAllSites();
  const existing = new Set(sites.map((s) => s.slug));
  if (!existing.has(baseSlug)) return baseSlug;

  let i = 2;
  while (existing.has(`${baseSlug}-${i}`)) i += 1;
  return `${baseSlug}-${i}`;
}

export async function getUniqueSlugForUpdate(baseSlug: string, ignoreId: string) {
  const sites = await readAllSites();
  const existing = new Set(sites.filter((s) => s.id !== ignoreId).map((s) => s.slug));
  if (!existing.has(baseSlug)) return baseSlug;

  let i = 2;
  while (existing.has(`${baseSlug}-${i}`)) i += 1;
  return `${baseSlug}-${i}`;
}

export async function updateSiteById(id: string, next: WebsiteRecord) {
  const sites = await readAllSites();
  const idx = sites.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  sites[idx] = next;
  await writeAllSites(sites);
  return next;
}

export async function deleteSiteById(id: string) {
  const sites = await readAllSites();
  const next = sites.filter((s) => s.id !== id);
  if (next.length === sites.length) return false;
  await writeAllSites(next);
  return true;
}

