import type { ThreadComment } from "@/lib/types";

type Props = {
  comments: ThreadComment[];
};

export function CommentList({ comments }: Props) {
  if (comments.length === 0) {
    return (
      <p className="py-6 text-sm text-neutral-500">
        No comments yet. Be the first to weigh in.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-neutral-200">
      {comments.map((c) => (
        <li key={c.id} className="py-5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs font-medium text-neutral-500">Anonymous</span>
            <span className="text-xs text-neutral-400">{c.timeAgo}</span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-800">{c.text}</p>
        </li>
      ))}
    </ul>
  );
}
