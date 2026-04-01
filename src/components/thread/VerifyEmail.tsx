"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";

type Board = { code: string; name: string };

type Props = {
  communityBoardCode: string;
  communityBoardName: string;
  validZipCodes: string[];
  onVerified: () => void;
};

type Step = "form" | "email-sent" | "blocked";

export function VerifyEmail({
  communityBoardCode,
  communityBoardName,
  validZipCodes,
  onVerified,
}: Props) {
  const [step, setStep] = useState<Step>("form");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [yourBoards, setYourBoards] = useState<Board[]>([]);
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  const registerRespondent = trpc.verify.registerRespondent.useMutation();
  const notifyMe = trpc.verify.notifyMe.useMutation({
    onSuccess: () => setNotifySubmitted(true),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim() || !zip.trim() || !email.trim()) return;

    if (validZipCodes.includes(zip)) {
      registerRespondent.mutate({
        email,
        address,
        zip,
        communityBoardCode,
      });
      setStep("email-sent");
    } else {
      const boards = lookupBoardsForZip(zip);
      setYourBoards(boards);
      setStep("blocked");
    }
  }

  if (step === "email-sent") {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 text-center">
        <p className="text-sm text-neutral-700">
          We sent a verification link to{" "}
          <span className="font-semibold">{email}</span>
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          Check your inbox and click the link to confirm your identity.
        </p>
        <button
          type="button"
          onClick={onVerified}
          className="mt-4 rounded-lg bg-agora-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          I verified (demo shortcut)
        </button>
      </div>
    );
  }

  if (step === "blocked") {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-medium text-amber-900">
          Your zip code ({zip}) is outside {communityBoardName}&apos;s area
        </p>
        {yourBoards.length > 0 ? (
          <p className="mt-1 text-sm text-amber-800">
            Based on your zip code, you may be in:{" "}
            <span className="font-semibold">
              {yourBoards.map((b) => b.name).join(", ")}
            </span>
          </p>
        ) : (
          <p className="mt-1 text-sm text-amber-800">
            We couldn&apos;t match your zip code to a community board in our
            system yet.
          </p>
        )}

        {!notifySubmitted ? (
          <div className="mt-4">
            <p className="text-xs text-amber-700">
              Want to be notified when your community board joins Agora?
            </p>
            <div className="mt-2 flex gap-2">
              <label htmlFor="notify-email" className="sr-only">
                Email for notification
              </label>
              <input
                id="notify-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm outline-none ring-amber-500/20 focus:border-amber-500 focus:ring-2"
              />
              <button
                type="button"
                disabled={notifyMe.isPending}
                onClick={() => {
                  if (!email.trim()) return;
                  const boardCode =
                    yourBoards.length > 0
                      ? yourBoards[0].code
                      : "UNKNOWN";
                  notifyMe.mutate({
                    email,
                    zip,
                    communityBoardCode: boardCode,
                  });
                }}
                className="shrink-0 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700 disabled:opacity-50"
              >
                {notifyMe.isPending ? "Saving…" : "Notify me"}
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm font-medium text-amber-800">
            Got it! We&apos;ll let you know when your board joins Agora.
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            setStep("form");
            setZip("");
          }}
          className="mt-3 text-xs font-medium text-amber-700 underline hover:text-amber-900"
        >
          ← Try a different address
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
        Verify your identity to respond
      </p>
      <p className="mt-1 text-xs text-neutral-500">
        We use your address to confirm your neighborhood is relevant to this
        topic, and your email so we can recognize you if you return. Neither is
        shared publicly.
      </p>
      <div className="mt-3 space-y-2">
        <div>
          <label htmlFor="verify-address" className="sr-only">
            Street address
          </label>
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
          <div className="w-28 shrink-0">
            <label htmlFor="verify-zip" className="sr-only">
              Zip code
            </label>
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
          <div className="min-w-0 flex-1">
            <label htmlFor="verify-email" className="sr-only">
              Email address
            </label>
            <input
              id="verify-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none ring-blue-500/20 focus:border-blue-500 focus:ring-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-agora-navy px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Verify &amp; continue
        </button>
      </div>
    </form>
  );
}

function lookupBoardsForZip(zip: string): Board[] {
  const ZIP_TO_BOARDS: Record<string, Board[]> = {
    "11211": [{ code: "BK-01", name: "Brooklyn Community Board 1" }],
    "11222": [{ code: "BK-01", name: "Brooklyn Community Board 1" }],
    "11249": [{ code: "BK-01", name: "Brooklyn Community Board 1" }],
    "11201": [{ code: "BK-02", name: "Brooklyn Community Board 2" }],
    "11205": [{ code: "BK-02", name: "Brooklyn Community Board 2" }],
    "11215": [
      { code: "BK-02", name: "Brooklyn Community Board 2" },
      { code: "BK-06", name: "Brooklyn Community Board 6" },
    ],
    "11217": [
      { code: "BK-02", name: "Brooklyn Community Board 2" },
      { code: "BK-06", name: "Brooklyn Community Board 6" },
    ],
    "11216": [{ code: "BK-03", name: "Brooklyn Community Board 3" }],
    "11233": [{ code: "BK-03", name: "Brooklyn Community Board 3" }],
    "11206": [
      { code: "BK-03", name: "Brooklyn Community Board 3" },
      { code: "BK-04", name: "Brooklyn Community Board 4" },
    ],
    "11221": [
      { code: "BK-03", name: "Brooklyn Community Board 3" },
      { code: "BK-04", name: "Brooklyn Community Board 4" },
    ],
    "11237": [{ code: "BK-04", name: "Brooklyn Community Board 4" }],
    "11207": [{ code: "BK-05", name: "Brooklyn Community Board 5" }],
    "11208": [{ code: "BK-05", name: "Brooklyn Community Board 5" }],
    "11239": [{ code: "BK-05", name: "Brooklyn Community Board 5" }],
    "11231": [{ code: "BK-06", name: "Brooklyn Community Board 6" }],
    "11209": [
      { code: "BK-07", name: "Brooklyn Community Board 7" },
      { code: "BK-08", name: "Brooklyn Community Board 8" },
    ],
    "11214": [
      { code: "BK-07", name: "Brooklyn Community Board 7" },
      { code: "BK-08", name: "Brooklyn Community Board 8" },
    ],
    "11228": [
      { code: "BK-07", name: "Brooklyn Community Board 7" },
      { code: "BK-08", name: "Brooklyn Community Board 8" },
    ],
    "11204": [{ code: "BK-08", name: "Brooklyn Community Board 8" }],
    "10029": [{ code: "MN-11", name: "Manhattan Community Board 11" }],
    "10035": [{ code: "MN-11", name: "Manhattan Community Board 11" }],
  };
  return ZIP_TO_BOARDS[zip] ?? [];
}
