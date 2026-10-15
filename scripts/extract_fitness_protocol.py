
import json
from pathlib import Path
import pymupdf

ROOT = Path(__file__).resolve().parent.parent

PDF_FILE = ROOT / "data" / "raw" / "fitness_protocol.pdf"
OUTPUT_DIR = ROOT / "data" / "processed"
OUTPUT_FILE = OUTPUT_DIR / "fitness_protocol_chunks.json"

CHUNK_SIZE = 1200
OVERLAP = 200


def split_text(text):
    text = " ".join(text.split())
    chunks = []

    start = 0

    while start < len(text):
        end = min(start + CHUNK_SIZE, len(text))
        chunks.append(text[start:end])

        if end == len(text):
            break

        start = end - OVERLAP

    return chunks


def extract_pdf():
    if not PDF_FILE.exists():
        print(f"PDF not found: {PDF_FILE}")
        return

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    documents = []

    with pymupdf.open(PDF_FILE) as pdf:
        total_pages = len(pdf)

        for page_number, page in enumerate(pdf, start=1):
            text = page.get_text("text").strip()

            if not text:
                continue

            for chunk_index, chunk in enumerate(split_text(text)):
                documents.append({
                    "id": f"page_{page_number}_chunk_{chunk_index}",
                    "source": PDF_FILE.name,
                    "page": page_number,
                    "text": chunk
                })

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        json.dump(documents, file, indent=2, ensure_ascii=False)

    print(f"PDF pages: {total_pages}")
    print(f"Text chunks: {len(documents)}")
    print(f"Saved to: {OUTPUT_FILE}")

    if documents:
        print("\nFirst chunk:")
        print(documents[0]["text"][:500])

if __name__ == "__main__":
    extract_pdf()
