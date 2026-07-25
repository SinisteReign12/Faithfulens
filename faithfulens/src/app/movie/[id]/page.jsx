import Image from "next/image";
import Link from "next/link";
import { getMovie } from "@/lib/tmdb";
import Navbar from "@/components/layout/Navbar";

export default async function MoviePage({ params }) {
    
    const { id } = await params;

    const movie = await getMovie(id);

    return (
        <main className="relative min-h-screen bg-zinc-950 text-white pb-20">
            <Navbar />

            <div className="absolute inset-x-0 top-0 h-[60vh] min-h-[450px] overflow-hidden">
                <Image
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    priority
                    className="object-cover scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-8 pt-[38vh]">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="w-72 shrink-0">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={350}
                            height={520}
                            priority
                            className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                    </div>

                    <div>
                        <h1 className="text-6xl font-extrabold tracking-tight">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="mt-2 italic text-zinc-400">
                                {movie.tagline}
                            </p>
                        )}

                        <div className="mt-10">
                            <h2 className="mb-4 text-2xl font-semibold">Overview</h2>

                            <p className="max-w-3xl leading-8 text-zinc-300">
                                {movie.overview}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="rounded-full bg-white px-4 py-2 font-semibold text-black">
                                ⭐ {movie.vote_average?.toFixed(1)}
                            </span>

                            <span className="rounded-full bg-zinc-800 px-4 py-2">
                                📅 {movie.release_date}
                            </span>

                            <span className="rounded-full bg-zinc-800 px-4 py-2">
                                ⏱ {movie.runtime} min
                            </span>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="rounded-full border border-red-800 bg-red-600/30 px-4 py-2 text-red-300"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <Link
                            href={`/movie/${id}/analysis`}
                            className="mt-10 inline-block rounded-full border border-zinc-800 bg-zinc-900 px-10 py-4 text-lg font-semibold transition hover:bg-zinc-700"
                        >
                            Analyze Faithfulness
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}