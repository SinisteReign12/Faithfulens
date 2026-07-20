import Link from "next/link";
import FaithfulnessMeter from "@/components/analysis/FaithfulnessMeter";
import SectionCard from "@/components/analysis/SectionCard";
import SectionList from "@/components/analysis/SectionList";
import VerdictCard from "@/components/analysis/VerdictCard";
import MovieHero from "@/components/analysis/MovieHero";
import { getMovie } from "@/lib/tmdb";
import { analyzeMovie } from "@/lib/api";

export default async function AnalysisPage({ params }) {

    const { id } = await params;

    const movie = await getMovie(id);

    const analysisData = await analyzeMovie(movie.title);

    return (
        <main className="min-h-screen mt-5 px-8 bg-zinc-950 text-white">

            <Link
                href={`/movie/${id}`}
                className="text-zinc-500 hover:text-zinc-100"
            >
                ← Back to Movie
            </Link>

            <MovieHero
                movie={movie}
                score={analysisData.analysis.faithfulness_score}
            />

            <div className="grid gap-8 mt-16">
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
                <VerdictCard
                    verdict={analysisData.analysis.verdict}
                />
            </div>

        </main>
    );
}