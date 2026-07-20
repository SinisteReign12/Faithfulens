from generator import generate_analysis
from chroma_db import store_chunks, retrieve_chunks
from chunk import chunk_comments
from comments import get_comments
from youtube import search_videos
from pydantic import BaseModel
from fastapi import FastAPI
import os
import json
from pathlib import Path

CACHE_DIR = Path("cache")
CACHE_DIR.mkdir(exist_ok=True)


app = FastAPI()


class MovieRequest(BaseModel):
    movie: str


@app.get("/")
def home():
    return {
        "message": "Faithfulens RAG API is running 🚀"
    }


@app.post("/analyze")
def analyze(request: MovieRequest):

    filename = request.movie.lower().replace(" ", "-") + ".json"
    cache_file = CACHE_DIR / filename

    if cache_file.exists():
        with open(cache_file, "r", encoding="utf-8") as f:
            return json.load(f)

    print(f"Generating analysis for: {request.movie}")

    videos = search_videos(request.movie)

    all_comments = []

    for video in videos:
        comments = get_comments(video["videoId"])
        all_comments.extend(comments)

    chunks = chunk_comments(all_comments)

    store_chunks(request.movie, chunks)

    story = retrieve_chunks(
        request.movie,
        "story changes compared to the source material"
    )

    characters = retrieve_chunks(
        request.movie,
        "character differences"
    )

    missing = retrieve_chunks(
        request.movie,
        "missing scenes"
    )

    added = retrieve_chunks(
        request.movie,
        "added scenes"
    )

    likes = retrieve_chunks(
        request.movie,
        "what fans liked"
    )

    dislikes = retrieve_chunks(
        request.movie,
        "what fans disliked"
    )

    faithfulness = retrieve_chunks(
        request.movie,
        "overall faithfulness"
    )

    context = f"""

{story}

{characters}

{missing}

{added}

{likes}

{dislikes}

{faithfulness}
"""

    analysis = generate_analysis(
        request.movie,
        context
    )

    result = {
        "movie": request.movie,
        "total_videos": len(videos),
        "total_comments": len(all_comments),
        "stored_chunks": len(chunks),
        "analysis": analysis
    }

    with open(cache_file, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=4, ensure_ascii=False)

    return result