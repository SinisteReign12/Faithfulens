import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/faithfulens.svg"
                        alt="Faithfulens"
                        width={32}
                        height={32}
                        className="rounded-md"
                    />

                    <span className="text-xl font-bold tracking-tight">
                        Faithfulens
                    </span>
                </Link>

                <div className="flex items-center gap-8 text-zinc-300">

                    <Link
                        href="/"
                        className="hover:text-white transition hover: cursor-pointer hover:underline"
                    >
                        Home
                    </Link>

                </div>

            </div>
        </nav>
    );
}