"use client";

import { useState } from "react";

type Props = {
  onVerified: () => void;
};

export function VerifyEmail({ onVerified }: Props) {
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim() || !zip.trim()) return;
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-center">
        <p className="text-sm text-emerald-800">
          Address verified: <span className="font-semibold">{address}, {zip}</span>
        </p>
        <p className="mt-1 text-xs text-emerald-600">
          Your neighborhood is relevant to this topic.
        </p>
        <button
          type="button"
          onClick={onVerified}
          className="mt-4 rounded-lg bg-agora-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Continue to respond
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-neutral-200 bg-neutral-50 p-5"
    >
      <p className="text-sm font-medium text-neutral-900">
        Verify your address to respond
      </p>
      <p className="mt-1 text-xs text-neutral-500">
        We use your address to confirm your neighborhood is relevant to this topic. Your address is not shared publicly.
      </p>
      <div className="mt-3 space-y-2">
        <div>
          <label htmlFor="verify-address" className="sr-only">Street address</label>
          <input
            id="verify-address"
            name="address"
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, Brooklyn, NY"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none ring-blue-500/20 focus:border-blue-500 focus:ring-2"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="verify-zip" className="sr-only">Zip code</label>
            <input
              id="verify-zip"
              name="zip"
              type="text"
              required
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Zip code"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none ring-blue-500/20 focus:border-blue-500 focus:ring-2"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-agora-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Verify address
          </button>
        </div>
      </div>
    </form>
  );
}
