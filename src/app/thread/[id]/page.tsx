import { CommentThread } from "@/components/thread/CommentThread";
import { ThreadArticle } from "@/components/thread/ThreadArticle";
import { ThreadSidebar } from "@/components/thread/ThreadSidebar";
import { WeighInBox } from "@/components/thread/WeighInBox";
import { SentimentBar } from "@/components/ui/SentimentBar";
import { getThreadById, THREAD_COMMENTS } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const thread = getThreadById(id);
  if (!thread) {
    return { title: "Topic not found — Agora" };
  }
  return {
    title: `${thread.headline} — Agora`,
    description: thread.snippet,
  };
}

export default async function ThreadPage({ params }: Props) {
  const { id } = await params;
  const thread = getThreadById(id);
  if (!thread) {
    notFound();
  }

  const isCasino = id === "astoria-casino";

  return (
    <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <nav className="mb-6 text-sm text-neutral-500">
        <Link href="/" className="font-medium text-agora-blue hover:underline">
          ← Back to feed
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <ThreadArticle thread={thread} />

          <div className="mt-10">
            <WeighInBox
              supportLabel={isCasino ? "✓ I support the casino" : undefined}
              opposeLabel={isCasino ? "✗ I oppose the casino" : undefined}
            />
          </div>

          <div className="mt-10 rounded-xl border border-neutral-100 bg-neutral-50/80 p-5">
            <SentimentBar labeled slices={thread.sentiment} />
          </div>

          <CommentThread comments={THREAD_COMMENTS} responseCount={thread.responses} zipCount={34} />
        </div>

        <div className="lg:col-span-1">
          <ThreadSidebar thread={thread} />
        </div>
      </div>
    </main>
  );
}
