export default function VerdictCard({ verdict }) {

    return (
        <section className="bg-red-500/10 border rounded-lg border-red-900 p-10">

            <h2 className="text-3xl font-bold">
                Overall Verdict
            </h2>

            <p className="mt-8 text-xl leading-9 text-zinc-200">
                {verdict}
            </p>

        </section>
    );
}