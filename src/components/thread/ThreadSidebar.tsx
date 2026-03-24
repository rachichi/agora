import type { ThreadDetail } from "@/lib/types";
import Link from "next/link";

type Props = {
  thread: ThreadDetail;
};

export function ThreadSidebar({ thread }: Props) {
  const maxZip = Math.max(...thread.zipStats.map((z) => z.share), 1);

  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Response breakdown</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <StatCard label="Total responses" value={thread.responses.toLocaleString()} />
          <StatCard label="Comments" value={thread.comments.toLocaleString()} />
          <StatCard label="Zip codes" value="34" />
          <StatCard label="Time left" value={`${thread.daysLeft} days`} />
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Top zip codes responding
        </h2>
        <ul className="mt-3 space-y-3">
          {thread.zipStats.map((z) => (
            <li key={z.code}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-neutral-800">{z.code}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-agora-blue"
                  style={{ width: `${(z.share / maxZip) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Related topics</h2>
        <ul className="mt-3 space-y-3">
          {thread.related.map((r) => (
            <li key={`${r.id}-${r.title}`}>
              <Link
                href={`/thread/${r.id}`}
                className="group block text-sm font-medium text-neutral-900 hover:text-agora-blue"
              >
                {r.title}
                <span className="mt-0.5 block text-xs font-normal text-neutral-500 group-hover:text-neutral-600">
                  {r.meta}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <h2 className="text-sm font-semibold text-neutral-900">{thread.sourceDoc.title}</h2>
        <p className="mt-2 text-xs text-neutral-600">
          {thread.sourceDoc.date} · {thread.sourceDoc.location}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">{thread.sourceDoc.resolution}</p>
        <Link
          href={thread.sourceDoc.href}
          className="mt-3 inline-block text-sm font-medium text-agora-blue hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View full minutes on NYC OpenData →
        </Link>
      </section>
    </aside>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-3 py-3 shadow-sm">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-neutral-900">{value}</p>
    </div>
  );
}
