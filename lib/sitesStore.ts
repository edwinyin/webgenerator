import { WebsiteRecord } from "@/lib/types";
import { db } from "@/lib/db";

export async function getSiteBySlug(slug: string) {
  const row = await db.execute({
    sql: "SELECT * FROM sites WHERE slug = ? LIMIT 1",
    args: [slug],
  });
  if (row.rows.length === 0) return null;
  return mapRowToWebsite(row.rows[0]);
}

export async function getSiteById(id: string) {
  const row = await db.execute({
    sql: "SELECT * FROM sites WHERE id = ? LIMIT 1",
    args: [id],
  });
  if (row.rows.length === 0) return null;
  return mapRowToWebsite(row.rows[0]);
}

export async function getAllSites() {
  const result = await db.execute("SELECT * FROM sites ORDER BY createdAt DESC");
  return result.rows.map(mapRowToWebsite);
}

export async function addSite(site: WebsiteRecord) {
  await db.execute({
    sql: `
      INSERT INTO sites (
        id, slug, businessName, tagline, heroTitle, heroDescription,
        about, services, contact, operatingHours, address, phone, email,
        logoUrl, bannerUrl, galleryUrls, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      site.id,
      site.slug,
      site.businessName,
      site.tagline,
      site.heroTitle,
      site.heroDescription,
      site.about,
      JSON.stringify(site.services),
      site.contact,
      site.operatingHours,
      site.address,
      site.phone,
      site.email,
      site.logoUrl,
      site.bannerUrl,
      JSON.stringify(site.galleryUrls),
      site.createdAt,
    ],
  });
  return site;
}

export async function getUniqueSlug(baseSlug: string) {
  let candidate = baseSlug;
  let i = 2;
  // simple loop; number of sites is small
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { rows } = await db.execute({
      sql: "SELECT 1 FROM sites WHERE slug = ? LIMIT 1",
      args: [candidate],
    });
    if (rows.length === 0) return candidate;
    candidate = `${baseSlug}-${i}`;
    i += 1;
  }
}

export async function getUniqueSlugForUpdate(baseSlug: string, ignoreId: string) {
  let candidate = baseSlug;
  let i = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { rows } = await db.execute({
      sql: "SELECT 1 FROM sites WHERE slug = ? AND id != ? LIMIT 1",
      args: [candidate, ignoreId],
    });
    if (rows.length === 0) return candidate;
    candidate = `${baseSlug}-${i}`;
    i += 1;
  }
}

export async function updateSiteById(id: string, next: WebsiteRecord) {
  const { rowsAffected } = await db.execute({
    sql: `
      UPDATE sites
      SET
        slug = ?,
        businessName = ?,
        tagline = ?,
        heroTitle = ?,
        heroDescription = ?,
        about = ?,
        services = ?,
        contact = ?,
        operatingHours = ?,
        address = ?,
        phone = ?,
        email = ?,
        logoUrl = ?,
        bannerUrl = ?,
        galleryUrls = ?
      WHERE id = ?
    `,
    args: [
      next.slug,
      next.businessName,
      next.tagline,
      next.heroTitle,
      next.heroDescription,
      next.about,
      JSON.stringify(next.services),
      next.contact,
      next.operatingHours,
      next.address,
      next.phone,
      next.email,
      next.logoUrl,
      next.bannerUrl,
      JSON.stringify(next.galleryUrls),
      id,
    ],
  });
  if (!rowsAffected) return null;
  return next;
}

export async function deleteSiteById(id: string) {
  const { rowsAffected } = await db.execute({
    sql: "DELETE FROM sites WHERE id = ?",
    args: [id],
  });
  return rowsAffected > 0;
}

function mapRowToWebsite(row: any): WebsiteRecord {
  return {
    id: String(row.id),
    slug: String(row.slug),
    businessName: String(row.businessName),
    tagline: String(row.tagline),
    heroTitle: String(row.heroTitle),
    heroDescription: String(row.heroDescription),
    about: String(row.about),
    services: JSON.parse(String(row.services || "[]")),
    contact: String(row.contact),
    operatingHours: String(row.operatingHours),
    address: String(row.address),
    phone: String(row.phone),
    email: String(row.email),
    logoUrl: String(row.logoUrl),
    bannerUrl: String(row.bannerUrl),
    galleryUrls: JSON.parse(String(row.galleryUrls || "[]")),
    createdAt: String(row.createdAt),
  };
}


