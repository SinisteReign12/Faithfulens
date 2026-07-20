export default function SectionCard({
    title,
    children,
}) {
    return (
        <section className="bg-zinc-900 rounded-lg border border-zinc-800 p-8">

            <h2 className="text-3xl font-bold mb-8">
                {title}
            </h2>

            {children}

        </section>
    );
}