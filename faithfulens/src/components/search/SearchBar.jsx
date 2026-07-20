"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleSearch() {
        if (!query.trim()) return;

        setLoading(true);

        try {
            const res = await fetch(
                `/api/search?query=${encodeURIComponent(query)}`
            );

            const data = await res.json();

            if (!res.ok) {
                return;
            }

            setMovies(data.results ?? []);

        } catch (error) {
            console.error("Frontend Error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-3xl">

            <div className="flex ml-auto mr-auto bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden">

                <input
                    type="text"
                    placeholder="Search any movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white px-5 py-4 outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                />

                <button
                    onClick={handleSearch}
                    className="bg-zinc-700 hover:cursor-pointer hover:bg-zinc-800 px-6 flex items-center justify-center"
                >
                    <Search />
                </button>

            </div>

            {loading && (
                <p className="mt-6 text-gray-400">
                    Searching...
                </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

                {movies.map((movie) => (

                    <Link
                        key={movie.id}
                        href={`/movie/${movie.id}`}
                        className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition block"
                    >

                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : "/placeholder.png"
                            }
                            alt={movie.title}
                            className="w-full h-70 object-cover"
                        />

                    </Link>

                ))}

                {!loading && movies.length === 0 && (
                    <div className="col-span-full text-center py-20 text-zinc-500">

                        Search for a movie to begin your faithfulness analysis.

                    </div>
                )}

            </div>

        </div>
    );
}