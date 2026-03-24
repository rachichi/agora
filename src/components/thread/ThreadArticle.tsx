import type { ThreadDetail } from "@/lib/types";
import Link from "next/link";
import type { SVGProps } from "react";

type Props = {
  thread: ThreadDetail;
};

export function ThreadArticle({ thread }: Props) {
  return (
    <article>
      <header className="border-b border-neutral-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-700"
            aria-hidden
          >
            {thread.author.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-neutral-900">{thread.author.name}</span>
              <span className="text-neutral-500">{thread.author.role}</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-agora-blue-soft px-2 py-0.5 text-xs font-medium text-agora-blue">
                Verified Official
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-800">
                From meeting minutes
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          Posted {thread.postedAt} · {thread.openUntil}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {thread.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <h1 className="mt-8 font-serif text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl">
        {thread.headline}
      </h1>

      <div className="mt-6 space-y-4 font-serif text-base leading-relaxed text-neutral-800">
        {thread.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <p className="mt-8">
        <Link
          href={thread.minutesLink.href}
          className="inline-flex items-center gap-2 rounded-lg bg-agora-blue-soft px-4 py-2.5 text-sm font-medium text-agora-blue transition hover:bg-blue-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FlagIcon className="h-4 w-4 shrink-0" aria-hidden />
          {thread.minutesLink.label}
          <span aria-hidden>→</span>
        </Link>
      </p>
    </article>
  );
}

function FlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M4 22V4a1 1 0 011-1h14l-3 5 3 5H8v9" />
    </svg>
  );
}
