import type { ActiveOfficial, RecentDecision } from "@/lib/types";
import Link from "next/link";

type Props = {
  officials: ActiveOfficial[];
  decisions: RecentDecision[];
};

export function FeedSidebar({ officials, decisions }: Props) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      {/* Active officials */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Active officials
        </h2>
        <ul className="mt-3 space-y-3">
          {officials.map((o) => (
            <li key={o.name} className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700"
                aria-hidden
              >
                {o.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-neutral-900">{o.name}</p>
                <p className="truncate text-xs text-neutral-500">
                  {o.role} · {o.topics} {o.topics === 1 ? "topic" : "topics"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent decisions */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Recent decisions
        </h2>
        <ul className="mt-3 space-y-3">
          {decisions.map((d) => (
            <li key={d.id}>
              <Link
                href={`/thread/${d.id}`}
                className="group block text-sm font-medium text-neutral-900 hover:text-agora-blue"
              >
                {d.title}
                <span className="mt-0.5 block text-xs font-normal text-neutral-500 group-hover:text-neutral-600">
                  {d.board} · {d.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Privacy & links */}
      <section className="border-t border-neutral-200 pt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">About</h2>
        <ul className="mt-3 space-y-2 text-xs text-neutral-500">
          <li>
            <Link href="#" className="hover:text-neutral-800 hover:underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-neutral-800 hover:underline">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-neutral-800 hover:underline">
              How Agora works
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-neutral-800 hover:underline">
              Data & open records
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-neutral-800 hover:underline">
              Contact us
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-[11px] text-neutral-400">© 2026 Agora. All information sourced from public records.</p>
      </section>
    </aside>
  );
}
