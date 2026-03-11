"use client";

type Tab = {
  id: string;
  label: string;
};

export function SectionTabs(props: {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {props.tabs.map((t) => {
        const active = t.id === props.activeId;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => props.onChange(t.id)}
            className={[
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              active
                ? "bg-zinc-900 text-white"
                : "bg-white text-zinc-900 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50",
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

