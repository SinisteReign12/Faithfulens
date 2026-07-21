from fastapi import FastAPI
from pydantic import BaseModel
from generator import generate_analysis
from chroma_db import (store_chunks, retrieve_chunks, embeddings_exist,
)
from chunk import chunk_comments
from comments import get_comments
from youtube import search_videos

from helpers import (
    comments_exist,
    load_comments,
    save_comments,
    analysis_exist,
    load_analysis,
    save_analysis,
)

app = FastAPI()


class MovieRequest(BaseModel):
    movie: str


@app.post("/analyze")
def analyze(request: MovieRequest):

    movie = request.movie

    if analysis_exist(movie):
        print("Loading cached analysis...")
        return load_analysis(movie)

    if comments_exist(movie):

        print("Loading cached comments...")
        all_comments = load_comments(movie)

    else:

        print("Downloading YouTube comments...")

        videos = search_videos(movie)

        all_comments = []

        for video in videos:
            comments = get_comments(video["videoId"])
            all_comments.extend(comments)

        save_comments(movie, all_comments)

    if not embeddings_exist(movie):

        print("Creating embeddings...")

        chunks = chunk_comments(all_comments)

        store_chunks(movie, chunks)

    else:

        print("Using cached embeddings.")

    chunks = []

    story = retrieve_chunks(movie, "story differences")
    characters = retrieve_chunks(movie, "character differences")
    missing = retrieve_chunks(movie, "missing scenes")
    added = retrieve_chunks(movie, "added scenes")
    likes = retrieve_chunks(movie, "what viewers liked")
    dislikes = retrieve_chunks(movie, "what viewers disliked")
    faithfulness = retrieve_chunks(movie, "overall faithfulness")

    context = f"""
{story}

{characters}

{missing}

{added}

{likes}

{dislikes}

{faithfulness}
"""

    analysis = generate_analysis(movie, context)

    result = {
        "movie": movie,
        "total_comments": len(all_comments),
        "stored_chunks": len(chunks),
        "analysis": analysis,
    }

    save_analysis(movie, result)

    return result