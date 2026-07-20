import axios from "axios";

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const videoId = searchParams.get("videoId");

    if (!videoId) {
        return Response.json(
            { error: "videoId is required" },
            { status: 400 }
        );
    }

    try {
        const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/commentThreads",
            {
                params: {
                    part: "snippet",
                    videoId,
                    maxResults: 5,
                    order: "relevance",
                    key: process.env.YOUTUBE_API_KEY,
                },
            }
        );

        return Response.json(response.data);

    } catch (error) {

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