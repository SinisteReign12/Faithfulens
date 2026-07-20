export default function SectionList({ items }) {

    if (!items || items.length === 0) {
        return (
            <p className="text-zinc-500">
                No information available.
            </p>
        );
    }

    return (
        <ul className="space-y-5">

            {items.map((item, index) => (

                <li
                    key={index}
                    className="flex gap-4 text-zinc-300 leading-8"
                >

                    <span className="text-white text-xl">
                        •
                    </span>

                    <span>{item}</span>

                </li>

            ))}

        </ul>
    );
}