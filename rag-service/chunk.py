import re


def clean_text(text: str):
    text = re.sub(r"\s+", " ", text)

    text = re.sub(r"http\S+", "", text)

    return text.strip()


def chunk_comments(comments, chunk_size=500):
    text = "\n".join(comments)

    text = clean_text(text)

    chunks = []

    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])

    return chunks