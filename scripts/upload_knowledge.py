
import json
import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "data" / "processed" / "knowledge_base.json"

load_dotenv(ROOT / "backend" / ".env")

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    raise ValueError("Missing Supabase credentials in backend/.env")

supabase = create_client(url, key)

with open(DATA_FILE, "r", encoding="utf-8") as file:
    records = json.load(file)

print(f"Total records found: {len(records)}")

batch_size = 50
uploaded = 0

for start in range(0, len(records), batch_size):
    batch = records[start:start + batch_size]
    rows = []

    for record in batch:
        rows.append({
            "id": str(record["id"]),
            "content": record["text"],
            "source": record["source"],
            "record_type": record["type"],
            "metadata": record.get("metadata", {}),
            "embedding": record["embedding"],
        })

    supabase.table("knowledge_chunks").upsert(rows).execute()
    uploaded += len(rows)

    print(f"Uploaded {uploaded}/{len(records)} records")

print("Knowledge base upload complete!")
