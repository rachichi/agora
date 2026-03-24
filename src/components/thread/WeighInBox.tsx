"use client";

import { useState } from "react";

type Stance = "support" | "oppose" | "undecided" | null;

type Props = {
  supportLabel?: string;
  opposeLabel?: string;
};

export function WeighInBox({
  supportLabel = "✓ I support this proposal",
  opposeLabel = "✗ I oppose this proposal",
}: Props) {
  const [stance, setStance] = useState<Stance>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-amber-50/80 px-4 py-4 text-sm text-neutral-800">
        Thanks — your anonymous response was recorded for this demo. Connect a backend to persist votes and
        comments.
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-neutral-200 bg-amber-50/50 p-5 sm:p-6">
      <h2 className="text-base font-semibold text-neutral-900">Weigh in — your response is anonymous…</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => {
              setStance("support");
            }}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
              stance === "support"
                ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300"
            }`}
          >
            {supportLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              setStance("oppose");
            }}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
              stance === "oppose"
                ? "border-red-600 bg-red-50 text-red-900"
                : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300"
            }`}
          >
            {opposeLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              setStance("undecided");
            }}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
              stance === "undecided"
                ? "border-neutral-400 bg-neutral-100 text-neutral-900"
                : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300"
            }`}
          >
            — I&apos;m undecided
          </button>
        </div>

        <div>
          <label htmlFor="anon-comment" className="sr-only">
            Add an anonymous comment
          </label>
          <textarea
            id="anon-comment"
            name="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            rows={4}
            maxLength={2000}
            placeholder="Add a comment — what's your reasoning? (anonymous)"
            className="w-full resize-y rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none ring-agora-navy/20 focus:ring-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-agora-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
        >
          Submit anonymously
        </button>
      </form>
    </section>
  );
}
