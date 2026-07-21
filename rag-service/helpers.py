import json
from pathlib import Path

CACHE_DIR = Path("cache")

COMMENTS_CACHE = CACHE_DIR / "comments"
ANALYSIS_CACHE = CACHE_DIR / "analysis"

COMMENTS_CACHE.mkdir(parents=True, exist_ok=True)
ANALYSIS_CACHE.mkdir(parents=True, exist_ok=True)


def movie_filename(movie: str):
    return movie.lower().replace(" ", "-") + ".json"

def comments_exist(movie):
    return (COMMENTS_CACHE / movie_filename(movie)).exists()


def load_comments(movie):

    with open(COMMENTS_CACHE / movie_filename(movie), "r", encoding="utf-8") as f:
        return json.load(f)


def save_comments(movie, comments):

    with open(COMMENTS_CACHE / movie_filename(movie), "w", encoding="utf-8") as f:
        json.dump(comments, f, ensure_ascii=False, indent=4)

def analysis_exist(movie):
    return (ANALYSIS_CACHE / movie_filename(movie)).exists()


def load_analysis(movie):

    with open(ANALYSIS_CACHE / movie_filename(movie), "r", encoding="utf-8") as f:
        return json.load(f)


def save_analysis(movie, analysis):

    with open(ANALYSIS_CACHE / movie_filename(movie), "w", encoding="utf-8") as f:
        json.dump(
            analysis,
            f,
            indent=4,
            ensure_ascii=False
        )