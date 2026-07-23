export async function analyzeMovie(title) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie: title }),
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `API returned ${res.status}`);
  }

  return data;
}