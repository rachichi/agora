import type { SentimentSlice } from "@/lib/types";

const toneClass: Record<SentimentSlice["tone"], string> = {
  support: "bg-emerald-500",
  neutral: "bg-neutral-300",
  oppose: "bg-red-500",
};

type Props = {
  slices: SentimentSlice[];
  className?: string;
  labeled?: boolean;
};

export function SentimentBar({ slices, className = "", labeled = false }: Props) {
  return (
    <div className={className}>
      {labeled ? (
        <div className="mb-2 flex flex-wrap gap-3 text-xs text-neutral-600">
          {slices.map((s) => (
            <span key={s.label}>
              <span
                className={`mr-1 inline-block h-2 w-2 rounded-full ${
                  s.tone === "support"
                    ? "bg-emerald-500"
                    : s.tone === "oppose"
                      ? "bg-red-500"
                      : "bg-neutral-300"
                }`}
              />
              {s.percent}% {s.label}
            </span>
          ))}
        </div>
      ) : null}
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-neutral-100">
        {slices.map((s) => (
          <div
            key={s.label}
            className={toneClass[s.tone]}
            style={{ width: `${s.percent}%` }}
            title={`${s.label}: ${s.percent}%`}
          />
        ))}
      </div>
    </div>
  );
}
