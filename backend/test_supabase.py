
import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client

load_dotenv(Path(__file__).resolve().parent / ".env")

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY in backend/.env")

supabase = create_client(url, key)

response = supabase.table("knowledge_chunks").select("id").limit(1).execute()

print("Supabase connection successful!")
print("Knowledge table is accessible.")
print("Existing rows returned:", len(response.data))
