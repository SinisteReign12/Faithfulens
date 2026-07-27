import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-linear-to-b from-black/60 via-black/30 to-transparent backdrop-blur-sm">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

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
                        className="hover:text-white px-4 py-2 hover:cursor-pointer hover:bg-zinc-900/50 hover:rounded-3xl"
                    >
                        Home
                    </Link>

                </div>

            </div>
        </nav>
    );
}