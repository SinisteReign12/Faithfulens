export async function POST(request) {
    try {
        const body = await request.json();

        console.log("BACKEND_URL:", process.env.BACKEND_URL);

        const response = await fetch(`${process.env.BACKEND_URL}/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const text = await response.text();

        console.log("Status:", response.status);
        console.log("Body:", text);

        if (!response.ok) {
            return Response.json({ error: text }, { status: response.status });
        }

        return Response.json(JSON.parse(text));
    } catch (err) {
        console.error("Route error:", err);
        return Response.json({ error: err.message }, { status: 500 });
    }
}