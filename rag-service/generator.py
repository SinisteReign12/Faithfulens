import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL = "llama-3.1-8b-instant"


def generate_analysis(movie_name, context):

    prompt = f"""
You are an expert film adaptation analyst.

Analyze the following evidence collected from YouTube discussions.

Movie:
{movie_name}

Evidence:
{context}

IMPORTANT RULES

You are evaluating ONLY how faithfully the movie adapts its original source material (book, novel, manga, comic, etc.).

Use ONLY the supplied evidence.
Do NOT invent facts.
If the evidence is weak or conflicting, explicitly say so.
The faithfulness_score MUST be consistent with the explanation and verdict.
Do NOT give an extreme score unless the evidence strongly supports it.
Return ONLY valid JSON.
Do NOT wrap the JSON in markdown.

SCORING GUIDE

100 = Nearly identical adaptation with only trivial changes.
90-99 = Extremely faithful. Minor omissions or small scene changes.
80-89 = Very faithful. Some scenes or characters changed, but the core story remains intact.
70-79 = Mostly faithful. Noticeable changes, but the adaptation follows the original closely.
60-69 = Moderately faithful. Several significant changes, but still recognizably adapts the source.
50-59 = Mixed adaptation. Roughly equal amounts of faithful and changed material.
40-49 = Loosely based on the source. Many important story or character changes.
20-39 = Heavily altered adaptation. Only major ideas or characters remain.
0-19 = Almost completely different from the source.

Before choosing a score, compare your written analysis with the scoring guide.
The score MUST agree with your explanation.

For example:
- If you describe the movie as "very faithful with a few omissions", the score should usually be between 80 and 95.
- If you describe it as "mostly faithful with several noticeable changes", the score should usually be between 65 and 80.
- If you describe it as "loosely based on the source", the score should usually be below 50.

Return ONLY valid JSON in the following format:

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

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0.2,
        )

        content = response.choices[0].message.content.strip()

    except Exception as e:
        print("Groq Error:", e)
        raise

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