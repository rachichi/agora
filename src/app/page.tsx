import { BoroughFilter } from "@/components/feed/BoroughFilter";
import { FeedCard } from "@/components/feed/FeedCard";
import { InfoBanner } from "@/components/feed/InfoBanner";
import { FEED_ITEMS } from "@/lib/data";

export default function FeedPage() {
  return (
    <main>
      <BoroughFilter />
      <InfoBanner />

      <div className="mx-auto max-w-content px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 border-b border-neutral-200 pb-3">
          <h1 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Open for input</h1>
          <div className="h-px flex-1 bg-neutral-200" aria-hidden />
        </div>

        <div className="mt-0">
          {FEED_ITEMS.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
