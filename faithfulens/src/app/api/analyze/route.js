export async function POST(request) {
    const body = await request.json();

    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/analyze`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();

        return Response.json(data);

    } catch (error) {

        return Response.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}