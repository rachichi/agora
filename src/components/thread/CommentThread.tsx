"use client";

import type { ThreadComment } from "@/lib/types";
import { useMemo, useState } from "react";

const TABS = ["Top", "New", "Opposing", "Supporting"] as const;

type Tab = (typeof TABS)[number];

type Props = {
  comments: ThreadComment[];
  responseCount: number;
  zipCount: number;
};

export function CommentThread({ comments, responseCount, zipCount }: Props) {
  const [tab, setTab] = useState<Tab>("Top");

  const sorted = useMemo(() => {
    const list = [...comments];
    if (tab === "Top") {
      return list.sort((a, b) => b.upvotes - a.upvotes);
    }
    if (tab === "Opposing") {
      return list.filter((c) => c.stance === "Opposes");
    }
    if (tab === "Supporting") {
      return list.filter((c) => c.stance === "Supports");
    }
    return list;
  }, [comments, tab]);

  return (
    <section className="mt-10">
      <p className="text-sm text-neutral-600">
        {responseCount.toLocaleString()} responses across {zipCount} zip codes
      </p>

      <div
        className="mt-4 flex gap-1 overflow-x-auto border-b border-neutral-200 text-sm"
        role="tablist"
        aria-label="Sort comments"
      >
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => {
              setTab(t);
            }}
            className={`shrink-0 border-b-2 px-3 py-2 font-medium transition ${
              tab === t
                ? "border-agora-navy text-agora-navy"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-neutral-200">
        {sorted.map((c) => (
          <li key={c.id} className="py-6">
            <CommentItem comment={c} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommentItem({ comment }: { comment: ThreadComment }) {
  const stanceStyles =
    comment.stance === "Opposes"
      ? "bg-red-50 text-red-800"
      : comment.stance === "Supports"
        ? "bg-emerald-50 text-emerald-800"
        : "bg-neutral-100 text-neutral-700";

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-2 text-sm">
        <span className="font-semibold text-neutral-900">{comment.anonLabel}</span>
        <span className="text-neutral-500">{comment.residentMeta}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${stanceStyles}`}>
          {comment.stance}
        </span>
        <span className="text-neutral-400">{comment.timeAgo}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-neutral-800">{comment.text}</p>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500">
        <button type="button" className="inline-flex items-center gap-1 text-emerald-700 hover:underline">
          <span aria-hidden>▲</span>
          {comment.upvotes}
        </button>
        <button type="button" className="hover:text-neutral-800 hover:underline">
          Reply
        </button>
        <button type="button" className="hover:text-neutral-800 hover:underline">
          Share
        </button>
      </div>
      {comment.officialReply ? (
        <div className="mt-4 rounded-lg border border-blue-100 bg-agora-blue-soft px-4 py-3">
          <p className="text-xs font-semibold text-agora-blue">{comment.officialReply.author}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-500">Official response</p>
          <p className="mt-2 text-sm text-neutral-800">{comment.officialReply.text}</p>
        </div>
      ) : null}
    </div>
  );
}
