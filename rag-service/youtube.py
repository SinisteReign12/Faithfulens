import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("YOUTUBE_API_KEY")


def search_videos(movie_name: str):
    url = "https://www.googleapis.com/youtube/v3/search"

    params = {
        "part": "snippet",
        "q": f"{movie_name} book vs movie",
        "type": "video",
        "maxResults": 3,
        "key": API_KEY,
    }

    response = requests.get(url, params=params)
    response.raise_for_status()

    data = response.json()

    videos = []

    for item in data.get("items", []):
        videos.append({
            "title": item["snippet"]["title"],
            "videoId": item["id"]["videoId"],
            "channel": item["snippet"]["channelTitle"],
        })

    return videos