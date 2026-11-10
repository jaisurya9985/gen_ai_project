
import os
from pathlib import Path

from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from supabase import create_client

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / "backend" / ".env")

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY"),
)

print("Loading embedding model...")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

query = "Beginner exercises to strengthen the core"

query_embedding = model.encode(
    query,
    normalize_embeddings=True
).tolist()

print(f"\nQuery: {query}")
print("\nSearching Supabase...")

response = supabase.rpc(
    "match_knowledge",
    {
        "query_embedding": query_embedding,
        "match_count": 5,
        "filter_type": None,
    },
).execute()

print("\nTop matching records:\n")

for i, record in enumerate(response.data, start=1):
    print(f"{i}. Type: {record['record_type']}")
    print(f"   Source: {record['source']}")
    print(f"   Similarity: {record['similarity']:.4f}")
    print(f"   Content: {record['content'][:250]}")
    print()
