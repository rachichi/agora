import type { SVGProps } from "react";

export function InfoBanner() {
  return (
    <div className="mx-auto max-w-content px-4 pt-6 sm:px-6 lg:px-8">
      <div className="flex gap-3 rounded-xl bg-neutral-100 px-4 py-4 text-sm leading-relaxed text-neutral-700 sm:px-5">
        <span
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-agora-blue-soft text-agora-blue"
          aria-hidden
        >
          <InfoIcon className="h-4 w-4" />
        </span>
        <p>
          <span className="font-semibold text-neutral-800">How Local works:</span> Topics are posted by
          verified elected officials and community boards from published meeting notes. Anyone with a valid
          zip code can weigh in anonymously while a topic is open for input.
        </p>
      </div>
    </div>
  );
}

function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}
