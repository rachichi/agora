import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900">Topic not found</h1>
      <p className="mt-2 text-neutral-600">
        That discussion may have closed or the link is incorrect.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block font-medium text-blue-600 hover:underline"
      >
        Return to feed
      </Link>
    </main>
  );
}
