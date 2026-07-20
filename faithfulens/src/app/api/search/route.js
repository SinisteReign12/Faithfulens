import axios from "axios";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    const TOKEN = process.env.TMDB_API_TOKEN;

    try {
        const response = await axios.get(
            "https://api.themoviedb.org/3/search/movie",
            {
                params: {
                    query,
                },
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    Accept: "application/json",
                    "Accept-Encoding": "identity",
                },
                decompress: false,
            }
        );

        return Response.json(response.data);
    } catch (error) {

        return Response.json(
            {
                error: error.message,
                code: error.code,
                response: error.response?.data ?? null,
            },
            {
                status: 500,
            }
        );
    }
}