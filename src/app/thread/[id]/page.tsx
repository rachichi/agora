import { CommentForm } from "@/components/thread/CommentForm";
import { CommentList } from "@/components/thread/CommentList";
import { createServerCaller } from "@/server/trpc/caller";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const caller = createServerCaller();
  const thread = await caller.post.bySlug({ slug: id });
  if (!thread) return { title: "Topic not found — Agora" };
  return {
    title: `${thread.headline} — Agora`,
    description: thread.snippet,
  };
}

export default async function ThreadPage({ params }: Props) {
  const { id } = await params;
  const caller = createServerCaller();
  const thread = await caller.post.bySlug({ slug: id });
  if (!thread) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <nav className="mb-6">
        <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
          ← Back to feed
        </Link>
      </nav>

      {/* Author */}
      <div className="flex items-center gap-3">
        {thread.author.avatar ? (
          <Image
            src={thread.author.avatar}
            alt={thread.author.name}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700"
            aria-hidden
          >
            {thread.author.initials}
          </div>
        )}
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-neutral-900">{thread.author.name}</span>
            <span className="text-neutral-500">· {thread.author.title}, {thread.author.organization}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              ✓ Official
            </span>
          </div>
          <p className="flex items-center gap-1 text-xs text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 shrink-0">
              <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.291 5.597a15.591 15.591 0 0 0 2.236 2.235l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
            </svg>
            {thread.neighborhoods}
          </p>
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
        <CommentForm
          threadId={id}
          communityBoardCode={thread.communityBoardCode}
          communityBoardName={thread.author.organization}
          validZipCodes={thread.validZipCodes}
        />
      </section>

      {/* Comments */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Responses ({thread.comments.length})
        </h2>
        <CommentList comments={thread.comments} />
      </section>
    </main>
  );
}
