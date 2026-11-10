
import os
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq

load_dotenv(Path(__file__).resolve().parent / ".env")

api_key = os.getenv("GROQ_API_KEY")
model_name = os.getenv(
    "GROQ_MODEL",
    "llama-3.3-70b-versatile",
)

if not api_key:
    raise ValueError("GROQ_API_KEY is missing from backend/.env")

client = Groq(api_key=api_key)

response = client.chat.completions.create(
    model=model_name,
    messages=[
        {
            "role": "user",
            "content": "Reply with exactly: Groq connection successful",
        }
    ],
    max_completion_tokens=50,
)

print("Model:", model_name)
print("Response:", response.choices[0].message.content)
