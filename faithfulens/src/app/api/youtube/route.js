import axios from "axios";

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const movie = searchParams.get("movie");

    if (!movie) {
        return Response.json(
            {
                error: "Movie is required",
            },
            {
                status: 400,
            }
        );
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;

    try {
        const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
                params: {
                    part: "snippet",
                    q: `${movie} book vs movie`,
                    type: "video",
                    maxResults: 3,
                    key: API_KEY,
                },
            }
        );

        return Response.json(response.data);

    } catch (error) {

        console.error(error.response?.data || error.message);

        return Response.json(
            {
                error: error.response?.data || error.message,
            },
            {
                status: 500,
            }
        );
    }
}