import { NextResponse } from "next/server";
import { slugify } from "@/lib/slugify";
import { addSite, getAllSites, getUniqueSlug } from "@/lib/sitesStore";
import { saveUploadedFile } from "@/lib/uploads";
import { WebsiteRecord } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const sites = await getAllSites();
  return NextResponse.json({ ok: true, sites });
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const businessName = String(form.get("businessName") || "").trim();
    if (!businessName) {
      return NextResponse.json(
        { ok: false, error: "businessName is required" },
        { status: 400 },
      );
    }

    const baseSlug = slugify(businessName);
    const slug = await getUniqueSlug(baseSlug);

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
        : "";

    const bannerUrl =
      bannerFile instanceof File && bannerFile.size > 0
        ? await saveUploadedFile({ file: bannerFile, slug, kind: "banner" })
        : "";

    const galleryUrls: string[] = [];
    for (const item of galleryFiles) {
      if (item instanceof File && item.size > 0) {
        galleryUrls.push(
          await saveUploadedFile({ file: item, slug, kind: "gallery" }),
        );
      }
    }

    const site: WebsiteRecord = {
      id: crypto.randomUUID(),
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
      galleryUrls,
      createdAt: new Date().toISOString(),
    };

    await addSite(site);
    return NextResponse.json({ ok: true, site });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

