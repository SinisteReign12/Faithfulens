export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-8">
      <div className="max-w-xl text-center">

        <div className="w-16 h-16 mx-auto rounded-full border-4 border-zinc-700 border-t-red-500 animate-spin" />

        <h1 className="text-4xl font-bold mt-8">
          Analyzing Faithfulness
        </h1>

        <p className="text-zinc-400 mt-4">
          Comparing the movie with its source material using AI and community discussions.
        </p>

        <div className="mt-12 space-y-4 text-left">

          <div className="flex items-center gap-4">
            <span className="text-green-400">✓</span>
            <span>Retrieving community discussions</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-green-400">✓</span>
            <span>Building semantic context</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
            <span>Generating AI analysis...</span>
          </div>

        </div>

      </div>
    </main>
  );
}