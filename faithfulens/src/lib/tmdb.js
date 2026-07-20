import axios from "axios";

const TOKEN = process.env.TMDB_API_TOKEN;

export async function getMovie(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("TMDb Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch movie.");
  }
}