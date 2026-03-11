"use client";

import { useEffect, useMemo } from "react";

type Props = {
  label: string;
  name: string;
  accept?: string;
  multiple?: boolean;
  files: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
  hint?: string;
};

export function ImageUploadField({
  label,
  name,
  accept = "image/*",
  multiple,
  files,
  onChange,
  hint,
}: Props) {
  const previews = useMemo(() => {
    const list: File[] = !files ? [] : Array.isArray(files) ? files : [files];
    return list.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
  }, [files]);

  useEffect(() => {
    return () => {
      for (const p of previews) URL.revokeObjectURL(p.url);
    };
  }, [previews]);

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <label className="text-sm font-medium text-zinc-900" htmlFor={name}>
          {label}
        </label>
        {hint ? <p className="text-xs text-zinc-500">{hint}</p> : null}
      </div>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        className="block w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-zinc-800 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
        onChange={(e) => {
          const list = Array.from(e.target.files || []);
          if (multiple) onChange(list.length ? list : null);
          else onChange(list[0] || null);
        }}
      />

      {previews.length ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {previews.map((p) => (
            <div
              key={`${p.file.name}-${p.file.size}-${p.file.lastModified}`}
              className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt={p.file.name}
                className="h-20 w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

