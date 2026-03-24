import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight text-neutral-950"
        >
          Agora<span className="text-rose-600">.</span>
        </Link>
        <p className="hidden text-sm text-neutral-500 sm:block">
          Local governments, community voices
        </p>
      </div>
    </header>
  );
}
