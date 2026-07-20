import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("YOUTUBE_API_KEY")


def get_comments(video_id: str, max_comments=5):
    url = "https://www.googleapis.com/youtube/v3/commentThreads"

    params = {
        "part": "snippet",
        "videoId": video_id,
        "maxResults": max_comments,
        "textFormat": "plainText",
        "key": API_KEY,
    }

    response = requests.get(url, params=params)
    response.raise_for_status()

    data = response.json()

    comments = []

    for item in data.get("items", []):
        text = item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
        comments.append(text)

    return comments