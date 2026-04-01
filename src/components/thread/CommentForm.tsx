"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { VerifyEmail } from "./VerifyEmail";

type Props = {
  threadId: string;
  communityBoardCode: string;
  communityBoardName: string;
  validZipCodes: string[];
};

export function CommentForm({
  threadId,
  communityBoardCode,
  communityBoardName,
  validZipCodes,
}: Props) {
  const [verified, setVerified] = useState(false);
  const [comment, setComment] = useState("");

  const addComment = trpc.post.addComment.useMutation({
    onSuccess: () => setComment(""),
  });

  if (!verified) {
    return (
      <VerifyEmail
        communityBoardCode={communityBoardCode}
        communityBoardName={communityBoardName}
        validZipCodes={validZipCodes}
        onVerified={() => setVerified(true)}
      />
    );
  }

  if (addComment.isSuccess) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Your anonymous response has been recorded. Thank you for weighing in.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        addComment.mutate({ postSlug: threadId, body: comment });
      }}
      className="rounded-lg border border-neutral-200 bg-neutral-50 p-5"
    >
      <p className="text-sm font-medium text-neutral-900">
        Weigh in anonymously
      </p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        maxLength={2000}
        placeholder="Share your perspective…"
        className="mt-3 w-full resize-y rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none ring-blue-500/20 focus:border-blue-500 focus:ring-2"
        aria-label="Anonymous comment"
      />
      {addComment.error && (
        <p className="mt-1 text-xs text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
      <button
        type="submit"
        disabled={addComment.isPending}
        className="mt-2 rounded-lg bg-agora-navy px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
      >
        {addComment.isPending ? "Submitting…" : "Submit anonymously"}
      </button>
    </form>
  );
}
