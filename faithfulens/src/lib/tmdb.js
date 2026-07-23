const TOKEN = process.env.TMDB_API_TOKEN;

export async function getMovie(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  if (!res.ok) {
    const error = await res.text();
    console.error("TMDb Error:", error);
    throw new Error("Failed to fetch movie.");
  }

  return res.json();
}