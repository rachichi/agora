"use client";

import { useState } from "react";
import { VerifyEmail } from "./VerifyEmail";

type Props = {
  threadId: string;
};

export function CommentForm({ threadId }: Props) {
  const [verified, setVerified] = useState(false);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!verified) {
    return <VerifyEmail onVerified={() => setVerified(true)} />;
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your anonymous response was recorded. In production this would be persisted to a database.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setSubmitted(true);
      }}
      className="rounded-lg border border-neutral-200 bg-neutral-50 p-5"
    >
      <p className="text-sm font-medium text-neutral-900">
        Weigh in anonymously
      </p>
      <input type="hidden" name="threadId" value={threadId} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        maxLength={2000}
        placeholder="Share your perspective…"
        className="mt-3 w-full resize-y rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none ring-blue-500/20 focus:border-blue-500 focus:ring-2"
        aria-label="Anonymous comment"
      />
      <button
        type="submit"
        className="mt-2 rounded-lg bg-agora-navy px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Submit anonymously
      </button>
    </form>
  );
}
