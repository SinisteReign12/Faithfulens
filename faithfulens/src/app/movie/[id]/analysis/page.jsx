import Link from "next/link";
import SectionCard from "@/components/analysis/SectionCard";
import SectionList from "@/components/analysis/SectionList";
import VerdictCard from "@/components/analysis/VerdictCard";
import MovieHero from "@/components/analysis/MovieHero";
import { getMovie } from "@/lib/tmdb";
import { analyzeMovie } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";

export default async function AnalysisPage({ params }) {

    const { id } = await params;

    const movie = await getMovie(id);

    const analysisData = await analyzeMovie(movie.title);

    return (
        <main className="min-h-screen bg-zinc-950 text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 pt-28 pb-16">
                <Link
                    href={`/movie/${id}`}
                    className="inline-flex items-center text-zinc-500 transition hover:text-zinc-100"
                >
                    ← Back to Movie
                </Link>

                <MovieHero
                    movie={movie}
                    score={analysisData.analysis.faithfulness_score}
                />

                <div className="mt-16 grid gap-8">
                    <SectionCard title="Story Changes">
                        <SectionList items={analysisData.analysis.story_changes} />
                    </SectionCard>

                    <SectionCard title="Character Changes">
                        <SectionList items={analysisData.analysis.character_changes} />
                    </SectionCard>

                    <SectionCard title="Missing Scenes">
                        <SectionList items={analysisData.analysis.missing_scenes} />
                    </SectionCard>

                    <SectionCard title="Added Scenes">
                        <SectionList items={analysisData.analysis.added_scenes} />
                    </SectionCard>

                    <SectionCard title="Fans Liked">
                        <SectionList items={analysisData.analysis.likes} />
                    </SectionCard>

                    <SectionCard title="Fans Disliked">
                        <SectionList items={analysisData.analysis.dislikes} />
                    </SectionCard>
                </div>

                <div className="mt-12">
                    <VerdictCard verdict={analysisData.analysis.verdict} />
                </div>
            </div>
        </main>
    );
}