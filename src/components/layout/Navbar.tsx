import Link from "next/link";
import type { SVGProps } from "react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 font-sans text-xl font-bold tracking-tight text-neutral-950">
          Agora<span className="text-agora-red">.</span>
        </Link>

        <div className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label htmlFor="global-search" className="sr-only">
            Search local topics
          </label>
          <input
            id="global-search"
            name="q"
            type="search"
            placeholder="Start local"
            className="w-full max-w-xl rounded-full border border-agora-blue px-5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none ring-agora-blue/30 focus:ring-2"
            autoComplete="off"
          />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-4">
          <button
            type="button"
            className="relative rounded-full p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="Notifications, 3 unread"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-agora-red px-1 text-[10px] font-semibold text-white">
              3
            </span>
          </button>
          <button
            type="button"
            className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-neutral-300 to-neutral-500 ring-2 ring-white"
            aria-label="Account menu"
          />
        </div>
      </div>

      <div className="border-t border-neutral-100 px-4 py-2 md:hidden">
        <input
          type="search"
          placeholder="Start local"
          className="w-full rounded-full border border-agora-blue px-4 py-2 text-sm outline-none ring-agora-blue/30 focus:ring-2"
          aria-label="Search local topics"
        />
      </div>
    </header>
  );
}

function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
