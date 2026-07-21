import chromadb
from embeddings import embedding_function

client = chromadb.PersistentClient(path="./chroma")

collection = client.get_or_create_collection(
    name="faithfulens",
    embedding_function=embedding_function
)


def store_chunks(movie_name, chunks):

    existing = collection.get(where={"movie": movie_name})

    if existing["ids"]:
        print("Using cached embeddings.")
        return

    print("Creating embeddings...")

    ids = []
    documents = []
    metadatas = []

    for i, chunk in enumerate(chunks):
        ids.append(f"{movie_name}-{i}")
        documents.append(chunk)
        metadatas.append({"movie": movie_name})

    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas,
    )
    
def embeddings_exist(movie_name):

    existing = collection.get(where={"movie": movie_name})

    return len(existing["ids"]) > 0    


def retrieve_chunks(movie_name, query, n_results=4):

    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        where={"movie": movie_name},
    )

    if not results["documents"]:
        return ""

    return "\n\n".join(results["documents"][0])