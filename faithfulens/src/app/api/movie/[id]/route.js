import { getMovie } from "@/lib/tmdb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const movie = await getMovie(id);

    return Response.json(movie);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}