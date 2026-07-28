import Navbar from "@/components/layout/Navbar";

export default function Loading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] text-white">

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-187.5 w-187.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/20 blur-3xl" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(59,130,246,0.12) 0%, rgba(24,24,27,0.05) 45%, rgba(9,9,11,1) 100%)",
          }}
        />
      </div>

      <Navbar />

      <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
        <div className="max-w-2xl text-center">

          <div className="mx-auto h-16 w-16 rounded-full border-4 border-zinc-700 border-t-white animate-spin" />

          <h1 className="mt-8 text-5xl font-bold tracking-tight">
            Analyzing Faithfulness
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Comparing the movie with its original source material
            using community discussions to generate a detailed
            adaptation report.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3 text-zinc-300">
            <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
            <span className="text-base">
              Gathering evidence and generating analysis...
            </span>
          </div>

          <p className="mt-8 text-sm text-zinc-500">
            This usually takes around <span className="text-zinc-300">20–30 seconds</span>.
          </p>
        </div>

      </div>
    </main>
  );
}