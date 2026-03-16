import { createClient } from "@supabase/supabase-js";
import path from "path";

function safeExt(filename: string) {
  const ext = path.extname(filename || "").toLowerCase();
  if (!ext) return "";
  if (!/^\.[a-z0-9]+$/.test(ext)) return "";
  return ext;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase environment variables are not set");
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
  });
}

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "uploads";

export async function saveUploadedFile(opts: {
  file: File;
  slug: string;
  kind: string;
}) {
  const supabase = getSupabase();
  const ext = safeExt(opts.file.name) || ".bin";

  const filename = `${opts.slug}-${opts.kind}-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}${ext}`;
  const filepath = `${opts.slug}/${filename}`;

  const buf = Buffer.from(await opts.file.arrayBuffer());

  const { error } = await supabase.storage.from(BUCKET).upload(filepath, buf, {
    contentType: opts.file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filepath);
  return data.publicUrl;
}


