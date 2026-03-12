import { NextResponse } from "next/server";
import { slugify } from "@/lib/slugify";
import {
  deleteSiteById,
  getSiteById,
  getUniqueSlugForUpdate,
  updateSiteById,
} from "@/lib/sitesStore";
import { saveUploadedFile } from "@/lib/uploads";
import { WebsiteRecord } from "@/lib/types";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ok = await deleteSiteById(id);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const existing = await getSiteById(id);
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 },
      );
    }

    const form = await req.formData();

    const businessName = String(form.get("businessName") || "").trim();
    if (!businessName) {
      return NextResponse.json(
        { ok: false, error: "businessName is required" },
        { status: 400 },
      );
    }

    const baseSlug = slugify(businessName);
    const slug = await getUniqueSlugForUpdate(baseSlug, existing.id);

    const servicesRaw = String(form.get("services") || "");
    const services = servicesRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const logoFile = form.get("logo");
    const bannerFile = form.get("banner");
    const galleryFiles = form.getAll("gallery");

    const logoUrl =
      logoFile instanceof File && logoFile.size > 0
        ? await saveUploadedFile({ file: logoFile, slug, kind: "logo" })
        : existing.logoUrl;

    const bannerUrl =
      bannerFile instanceof File && bannerFile.size > 0
        ? await saveUploadedFile({ file: bannerFile, slug, kind: "banner" })
        : existing.bannerUrl;

    const galleryUrls: string[] = [];
    for (const item of galleryFiles) {
      if (item instanceof File && item.size > 0) {
        galleryUrls.push(
          await saveUploadedFile({ file: item, slug, kind: "gallery" }),
        );
      }
    }

    const next: WebsiteRecord = {
      ...existing,
      slug,
      businessName,
      tagline: String(form.get("tagline") || ""),
      heroTitle: String(form.get("heroTitle") || ""),
      heroDescription: String(form.get("heroDescription") || ""),
      about: String(form.get("about") || ""),
      services,
      contact: String(form.get("contact") || ""),
      operatingHours: String(form.get("operatingHours") || ""),
      address: String(form.get("address") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      logoUrl,
      bannerUrl,
      galleryUrls: galleryUrls.length ? galleryUrls : existing.galleryUrls,
    };

    await updateSiteById(existing.id, next);
    return NextResponse.json({ ok: true, site: next });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

