import type { FeedItem } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: FeedItem;
};

export function FeedCard({ item }: Props) {
  return (
    <article className="border-b border-neutral-200 py-6">
      <div className="flex items-start gap-3">
        {item.author.avatar ? (
          <Image
            src={item.author.avatar}
            alt={item.author.name}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700"
            aria-hidden
          >
            {item.author.initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-semibold text-neutral-900">{item.author.name}</span>
            <span className="text-neutral-500">· {item.author.title}, {item.author.organization}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              ✓ Official
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 shrink-0">
              <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.291 5.597a15.591 15.591 0 0 0 2.236 2.235l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
            </svg>
            {item.neighborhoods}
          </p>

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
