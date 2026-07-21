export default function Loading() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-zinc-700 border-t-white rounded-full animate-spin mx-auto"></div>

        <h2 className="text-white text-2xl font-bold mt-8">
          Analyzing Movie...
        </h2>

        <p className="text-zinc-400 mt-2 max-w-md">
          Searching YouTube discussions, retrieving relevant comments,
          and generating an AI faithfulness report.
        </p>
      </div>
    </main>
  );
}