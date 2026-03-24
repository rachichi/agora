"use client";

import { useState } from "react";

type Props = {
  onVerified: () => void;
};

export function VerifyEmail({ onVerified }: Props) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  function handleConfirm() {
    onVerified();
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 text-center">
        <p className="text-sm text-neutral-700">
          We sent a link to <span className="font-semibold">{email}</span>
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          Check your inbox and click the link to verify.
        </p>
        {/* MVP demo: skip real email verification */}
        <button
          type="button"
          onClick={handleConfirm}
          className="mt-4 rounded-lg bg-agora-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          I verified (demo shortcut)
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSend}
      className="rounded-lg border border-neutral-200 bg-neutral-50 p-5"
    >
      <p className="text-sm font-medium text-neutral-900">
        Verify your email to respond
      </p>
      <p className="mt-1 text-xs text-neutral-500">
        We&apos;ll send a one-time link. No account needed — this just prevents spam.
      </p>
      <div className="mt-3 flex gap-2">
        <label htmlFor="verify-email" className="sr-only">Email address</label>
        <input
          id="verify-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none ring-blue-500/20 focus:border-blue-500 focus:ring-2"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-agora-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Send link
        </button>
      </div>
    </form>
  );
}
