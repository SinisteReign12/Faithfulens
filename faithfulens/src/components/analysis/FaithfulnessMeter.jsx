export default function FaithfulnessMeter({ score }) {

    const radius = 85;
    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center">

            <svg
                width="220"
                height="220"
                className="-rotate-90"
            >
                <circle
                    cx="110"
                    cy="110"
                    r={radius}
                    stroke="#27272a"
                    strokeWidth="14"
                    fill="none"
                />

                <circle
                    cx="110"
                    cy="110"
                    r={radius}
                    stroke="#ef4444"
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-1000"
                />
            </svg>

            <div className="-mt-36 text-center">

                <p className="text-6xl font-bold">
                    {score}%
                </p>

                <p className="text-zinc-400 mt-2">
                    Faithfulness
                </p>

            </div>

        </div>
    );
}