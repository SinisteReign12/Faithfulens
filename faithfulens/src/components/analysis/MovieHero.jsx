import Image from "next/image";

export default function MovieHero({
    movie,
    score,
}) {
    return (
        <section className="relative rounded-lg overflow-hidden">

            <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                fill
                className="object-cover opacity-20"
            />

            <div className="relative p-10 md:flex gap-10">

                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    width={260}
                    height={390}
                    alt={movie.title}
                    className="rounded-2xl"
                />

                <div className="flex-1">

                    <h1 className="text-5xl font-bold">
                        {movie.title}
                    </h1>

                    <p className="text-zinc-400 mt-3">
                        {movie.release_date}
                    </p>

                    <div className="flex gap-3 mt-4 flex-wrap">
                        {movie.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-zinc-800 px-3 py-1 rounded-full"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="mt-10">

                        <p className="text-zinc-400">
                            AI Faithfulness
                        </p>

                        <h2 className="text-5xl font-bold text-blue-500">
                            {score}%
                        </h2>

                    </div>

                </div>

            </div>

        </section>
    );
}