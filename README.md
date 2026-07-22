<div align="center">

# 🎬 Faithfulens

### AI-powered movie adaptation analysis using Retrieval-Augmented Generation (RAG)

Analyze how faithfully movies adapt their original source material using community discussions, semantic search, and AI.

**🌐 Live Demo:** https://faithfulens.vercel.app/

</div>

---

## 📖 Overview

Faithfulens is an AI-powered web application that evaluates how faithfully a movie adapts its source material (books, novels, manga, comics, etc.).

The application gathers YouTube community discussions, stores them in a vector database, retrieves the most relevant information using semantic search, and generates a structured adaptation analysis with an LLM.

---

## ✨ Features

- 🎥 Movie search using TMDb
- 💬 YouTube community discussion analysis
- 🧠 Retrieval-Augmented Generation (RAG)
- 📚 ChromaDB vector database
- 🤖 AI-generated adaptation reports
- 📊 Faithfulness score (0–100)
- ⚡ Multi-layer caching for faster responses

---

## 🏗️ Architecture

```text
Next.js Frontend
        │
        ▼
 FastAPI Backend
        │
        ├── TMDb API
        ├── YouTube Data API
        ▼
 Community Comments
        ▼
 Comment Chunking
        ▼
 ChromaDB
        ▼
 Semantic Retrieval
        ▼
 OpenRouter LLM
        ▼
 Adaptation Analysis
```

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- FastAPI
- Python

### AI & Data
- OpenRouter
- ChromaDB
- TMDb API
- YouTube Data API

---

## 🚀 Future Improvements

- Reddit integration
- Confidence score
- Better retrieval strategies
- Source citations
- Background analysis jobs

---

<div align="center">

Built using Next.js, FastAPI, ChromaDB, and OpenRouter.

</div>
