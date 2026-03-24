import { BoroughFilter } from "@/components/feed/BoroughFilter";
import { FeedCard } from "@/components/feed/FeedCard";
import { FeedSidebar } from "@/components/feed/FeedSidebar";
import { InfoBanner } from "@/components/feed/InfoBanner";
import { ACTIVE_OFFICIALS, FEED_ITEMS, RECENT_DECISIONS } from "@/lib/data";

export default function FeedPage() {
  return (
    <main>
      <BoroughFilter />
      <InfoBanner />

      <div className="mx-auto max-w-content px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
          {/* Feed column */}
          <div>
            <div className="flex items-center gap-4 border-b border-neutral-200 pb-3">
              <h1 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Open for input
              </h1>
              <div className="h-px flex-1 bg-neutral-200" aria-hidden />
            </div>

            <div>
              {FEED_ITEMS.map((item) => (
                <FeedCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="hidden lg:block">
            <FeedSidebar officials={ACTIVE_OFFICIALS} decisions={RECENT_DECISIONS} />
          </div>
        </div>
      </div>
    </main>
  );
}
