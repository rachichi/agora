import { CommentForm } from "@/components/thread/CommentForm";
import { CommentList } from "@/components/thread/CommentList";
import { getCommentsForThread, getThreadById } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const thread = getThreadById(id);
  if (!thread) return { title: "Topic not found — Agora" };
  return {
    title: `${thread.headline} — Agora`,
    description: thread.snippet,
  };
}

export default async function ThreadPage({ params }: Props) {
  const { id } = await params;
  const thread = getThreadById(id);
  if (!thread) notFound();

  const comments = getCommentsForThread(id);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <nav className="mb-6">
        <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
          ← Back to feed
        </Link>
      </nav>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700"
          aria-hidden
        >
          {thread.author.initials}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-neutral-900">{thread.author.name}</span>
            {thread.author.role ? (
              <span className="text-neutral-500">· {thread.author.role}</span>
            ) : null}
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              ✓ {thread.author.role ? "Official" : "Board"}
            </span>
          </div>
          <p className="text-xs text-neutral-500">{thread.postedAt}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {thread.tags.map((t) => (
          <span
            key={t}
            className="rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Headline + body */}
      <h1 className="mt-6 font-serif text-2xl font-bold leading-tight text-neutral-950 sm:text-3xl">
        {thread.headline}
      </h1>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-800 sm:text-base">
        {thread.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {thread.sourceLink ? (
        <p className="mt-6">
          <Link
            href={thread.sourceLink.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {thread.sourceLink.label} →
          </Link>
        </p>
      ) : null}

      {/* Respond */}
      <section className="mt-10">
        <CommentForm threadId={id} />
      </section>

      {/* Comments */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Responses ({comments.length})
        </h2>
        <CommentList comments={comments} />
      </section>
    </main>
  );
}
