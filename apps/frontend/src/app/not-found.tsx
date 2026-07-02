import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-light tracking-tighter text-black">404</h1>
      <p className="text-neutral-500">This page could not be found.</p>
      <Link
        href="/"
        className="border border-black px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 hover:bg-black hover:text-white"
      >
        Return Home
      </Link>
    </main>
  );
}
