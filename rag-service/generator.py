import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free"


def generate_analysis(movie_name, context):

    prompt = f"""
You are an expert film adaptation analyst.

Analyze the following evidence collected from YouTube discussions.

Movie:
{movie_name}

Evidence:
{context}

IMPORTANT RULES

- Use ONLY the supplied evidence.
- Do NOT invent facts.
- If evidence is weak, clearly say so.
- Estimate the faithfulness score based on the discussion.
- Return ONLY valid JSON.
- Do not wrap the JSON inside markdown.

JSON format:

{{
    "faithfulness_score": 0,
    "story_changes": [],
    "character_changes": [],
    "missing_scenes": [],
    "added_scenes": [],
    "likes": [],
    "dislikes": [],
    "verdict": ""
}}
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://faithfulens.vercel.app",
            "X-Title": "Faithfulens"
        },
        json={
            "model": MODEL,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        },
        timeout=120
    )

    if not response.ok:
        print("OpenRouter Error:", response.status_code)
        print(response.text)
        response.raise_for_status()

    result = response.json()

    content = result["choices"][0]["message"]["content"].strip()

    if content.startswith("```json"):
        content = content.replace("```json", "", 1).strip()

    if content.startswith("```"):
        content = content.replace("```", "", 1).strip()

    if content.endswith("```"):
        content = content[:-3].strip()

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {
            "faithfulness_score": None,
            "story_changes": [],
            "character_changes": [],
            "missing_scenes": [],
            "added_scenes": [],
            "likes": [],
            "dislikes": [],
            "verdict": "The AI did not return valid JSON.",
            "raw_response": content
        }