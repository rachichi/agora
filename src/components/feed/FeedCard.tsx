import type { FeedItem } from "@/lib/types";
import Link from "next/link";

type Props = {
  item: FeedItem;
};

export function FeedCard({ item }: Props) {
  return (
    <article className="border-b border-neutral-200 py-6">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700"
          aria-hidden
        >
          {item.author.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-semibold text-neutral-900">{item.author.name}</span>
            {item.author.role ? (
              <span className="text-neutral-500">· {item.author.role}</span>
            ) : null}
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              ✓ Official
            </span>
          </div>

          <h2 className="mt-2 text-lg font-bold leading-snug text-neutral-950">
            <Link href={`/thread/${item.id}`} className="hover:underline">
              {item.headline}
            </Link>
          </h2>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-600">
            {item.snippet}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded bg-neutral-100 px-2 py-0.5 font-medium text-neutral-600"
              >
                {t}
              </span>
            ))}
            <span>{item.commentCount} comments</span>
            <span>{item.postedAt}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
