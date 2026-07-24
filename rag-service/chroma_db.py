import chromadb
from embeddings import embedding_function

client = chromadb.PersistentClient(path="./chroma")

collection = client.get_or_create_collection(
    name="faithfulens",
    embedding_function=embedding_function
)

DEFAULT_RESULTS = 4


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


def retrieve_chunks(movie_name, query, n_results=DEFAULT_RESULTS):
    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        where={"movie": movie_name},
    )

    documents = results.get("documents", [])

    if not documents or not documents[0]:
        return ""

    unique_documents = list(dict.fromkeys(documents[0]))

    print(f"Retrieved {len(unique_documents)} chunks.")

    return "\n\n".join(unique_documents)