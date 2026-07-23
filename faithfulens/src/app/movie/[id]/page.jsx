import Image from "next/image";
import Link from "next/link";
import { getMovie } from "@/lib/tmdb";

export default async function MoviePage({ params }) {

    const { id } = await params;

    const movie = await getMovie(id);

    return (
        <main className="min-h-screen pb-20 bg-zinc-950 text-white">

            <div className="relative h-[60vh] min-h-112.5 w-full overflow-hidden">
                <Image
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    priority
                    className="object-cover scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30" />
            </div>

            <div className="max-w-6xl mx-auto px-8 -mt-48 relative z-10">

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

                        <p className="text-zinc-400 italic mt-2">
                            {movie.tagline}
                        </p>

                        <div className="mt-10">

                            <h2 className="text-2xl font-semibold mb-4">
                                Overview
                            </h2>

                            <p className="text-zinc-300 leading-8 max-w-3xl">
                                {movie.overview}
                            </p>

                        </div>

                        <div className="flex flex-wrap gap-3 mt-8">

                            <span className="bg-white text-black px-4 py-2 rounded-full font-semibold">
                                ⭐ {movie.vote_average?.toFixed(1)}
                            </span>

                            <span className="bg-zinc-800 px-4 py-2 rounded-full">
                                📅 {movie.release_date}
                            </span>

                            <span className="bg-zinc-800 px-4 py-2 rounded-full">
                                ⏱ {movie.runtime} min
                            </span>

                        </div>
                        <div className="flex flex-wrap gap-3 mt-6">

                            {movie.genres.map((genre) => (

                                <span
                                    key={genre.id}
                                    className="bg-red-600/30 border border-red-800 text-red-300 px-4 py-2 rounded-full"
                                >
                                    {genre.name}
                                </span>

                            ))}

                        </div>

                        <Link
                            href={`/movie/${id}/analysis`}
                            className="inline-block mt-10 bg-zinc-900 border border-zinc-800 hover:bg-zinc-700 transition px-10 py-4 rounded-full font-semibold text-lg">
                            Analyze Faithfulness
                        </Link>

                    </div>

                </div>

            </div>
        </main>
    );
}