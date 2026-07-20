import SearchBar from "@/components/search/SearchBar";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: "url('/hero-bg.webp')",
      }}
    >
      <div className="min-h-screen bg-black/65 flex flex-col items-center justify-center px-6 text-white">

        <h1 className="text-6xl font-extrabold mb-4">
          Faithfulens
        </h1>

        <p className="text-zinc-300 text-lg mb-10 text-center max-w-xl">
          Discover how faithfully movies adapt their original books using AI and community discussions.
        </p>

        <SearchBar />

      </div>
    </main>
  );
}