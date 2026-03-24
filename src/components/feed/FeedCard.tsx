import type { FeedItem } from "@/lib/types";
import Link from "next/link";
import type { SVGProps } from "react";
import { SentimentBar } from "@/components/ui/SentimentBar";

const accentBorder: Record<FeedItem["accent"], string> = {
  blue: "border-l-blue-500",
  green: "border-l-emerald-500",
  amber: "border-l-amber-400",
};

type Props = {
  item: FeedItem;
};

export function FeedCard({ item }: Props) {
  return (
    <article
      className={`border-b border-neutral-200 border-l-4 ${accentBorder[item.accent]} bg-white pl-5 pr-2 py-6 sm:pl-6`}
    >
      <div className="flex flex-wrap items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-700"
          aria-hidden
        >
          {item.author.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-semibold text-neutral-900">{item.author.name}</span>
            <span className="text-neutral-500">{item.author.role}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-agora-blue-soft px-2 py-0.5 text-xs font-medium text-agora-blue">
              <CheckIcon className="h-3.5 w-3.5" aria-hidden />
              Official
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              <FlagIcon className="h-3.5 w-3.5 text-agora-minutes" aria-hidden />
              From minutes
            </span>
          </div>

          <h2 className="mt-3 font-serif text-xl font-bold leading-snug text-neutral-950 sm:text-2xl">
            <Link href={`/thread/${item.id}`} className="hover:underline">
              {item.headline}
            </Link>
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">{item.snippet}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
            <span>{item.responses.toLocaleString()} responses</span>
            <span>{item.comments.toLocaleString()} comments</span>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0 flex-1">
              <SentimentBar slices={item.sentiment} />
            </div>
            <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
              <span className="text-sm font-medium text-neutral-700">{item.sentimentSummary}</span>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                {item.daysLeft} days left
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function FlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4 22V4a1 1 0 011-1h14l-3 5 3 5H8v9H4z" />
    </svg>
  );
}
