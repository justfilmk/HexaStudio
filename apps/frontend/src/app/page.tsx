import Link from "next/link";

export default function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://api.localhost";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">HexaStudio</h1>
        <p className="mt-4 text-lg text-zinc-400">
          3D creative studio platform
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/api/health"
          className="rounded-lg bg-indigo-600 px-6 py-3 font-medium transition hover:bg-indigo-500"
        >
          Health Check
        </Link>
      </div>

      <p className="text-sm text-zinc-500">
        API: {apiUrl}
      </p>
    </main>
  );
}
