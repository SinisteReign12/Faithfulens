export async function analyzeMovie(title) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie: title }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to analyze movie.");
    }

    return await res.json();
  } catch (error) {
    console.error("Analysis error:", error);
    throw error;
  }
}