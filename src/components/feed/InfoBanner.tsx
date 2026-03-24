export function InfoBanner() {
  return (
    <div className="rounded-lg bg-neutral-100 px-4 py-4 text-sm leading-relaxed text-neutral-700">
      <div className="flex gap-3">
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        </span>
        <p>
          <span className="font-semibold text-neutral-800">How Local works:</span> Topics are posted by
          verified elected officials and tied to real government decisions. Anyone with a valid zip code can
          weigh in anonymously on local government decisions.{" "}
          <span className="font-semibold text-neutral-800">Let&apos;s help our elected officials help us.</span>
        </p>
      </div>
    </div>
  );
}
