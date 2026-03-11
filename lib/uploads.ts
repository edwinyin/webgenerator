import { promises as fs } from "fs";
import path from "path";

function safeExt(filename: string) {
  const ext = path.extname(filename || "").toLowerCase();
  if (!ext) return "";
  if (!/^\.[a-z0-9]+$/.test(ext)) return "";
  return ext;
}

export async function ensureUploadsDir() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  return uploadsDir;
}

export async function saveUploadedFile(opts: {
  file: File;
  slug: string;
  kind: string;
}) {
  const uploadsDir = await ensureUploadsDir();
  const ext = safeExt(opts.file.name) || ".bin";

  const filename = `${opts.slug}-${opts.kind}-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}${ext}`;

  const buf = Buffer.from(await opts.file.arrayBuffer());
  const absolutePath = path.join(uploadsDir, filename);
  await fs.writeFile(absolutePath, buf);

  return `/uploads/${filename}`;
}

