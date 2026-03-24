import { FeedCard } from "@/components/feed/FeedCard";
import { FEED_ITEMS } from "@/lib/data";

export default function FeedPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6">
      <h1 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
        Open for input
      </h1>
      <div className="mt-2">
        {FEED_ITEMS.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
