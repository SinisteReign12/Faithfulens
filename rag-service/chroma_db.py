import chromadb
from embeddings import embedding_function

client = chromadb.PersistentClient(path="./chroma")

collection = client.get_or_create_collection(
    name="faithfulens",
    embedding_function=embedding_function
)


def store_chunks(movie_name, chunks):
    collection.delete(where={"movie": movie_name})

    for i, chunk in enumerate(chunks):
        collection.add(
            ids=[f"{movie_name}-{i}"],
            documents=[chunk],
            metadatas=[{"movie": movie_name}]
        )


def retrieve_chunks(movie_name, query, n_results=4):

    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        where={"movie": movie_name},
    )

    if not results["documents"]:
        return ""

    return "\n\n".join(results["documents"][0])