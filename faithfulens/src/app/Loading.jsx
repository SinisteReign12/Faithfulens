export default function Loading() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center">

      <div className="text-center">

        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />

        <p className="mt-6 text-zinc-400">
          Loading...
        </p>

      </div>

    </main>
  );
}