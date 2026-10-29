
import json
from pathlib import Path
from sentence_transformers import SentenceTransformer

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data" / "processed"
OUTPUT_FILE = DATA_DIR / "knowledge_base.json"

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


def load_json(filename):
    path = DATA_DIR / filename

    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)


def exercise_to_text(item):
    return (
        f"Exercise: {item.get('name', '')}. "
        f"Category: {item.get('category', '')}. "
        f"Difficulty: {item.get('level', '')}. "
        f"Equipment: {item.get('equipment', '')}. "
        f"Primary muscles: {', '.join(item.get('primary_muscles', []))}. "
        f"Secondary muscles: {', '.join(item.get('secondary_muscles', []))}. "
        f"Instructions: {' '.join(item.get('instructions', []))}"
    )


def yoga_to_text(item):
    instructions = item.get("instructions", [])
    if isinstance(instructions, list):
        instructions = " ".join(instructions)

    categories = item.get("categories", [])
    if isinstance(categories, list):
        categories = ", ".join(categories)

    targets = item.get("target_areas", [])
    if isinstance(targets, list):
        targets = ", ".join(targets)

    return (
        f"Yoga pose: {item.get('name', '')}. "
        f"Sanskrit name: {item.get('sanskrit_name', '')}. "
        f"Category: {categories or item.get('category', '')}. "
        f"Difficulty: {item.get('difficulty', '')}. "
        f"Focus: {item.get('focus', '')}. "
        f"Target areas: {targets}. "
        f"Benefits: {item.get('benefits', '')}. "
        f"Description: {item.get('description', '')}. "
        f"Instructions: {instructions}"
    )


def protocol_to_text(item):
    return item.get("text", "")


def main():
    exercises = load_json("exercises_clean.json")
    yoga_poses = load_json("yoga_clean.json")
    protocol_chunks = load_json("fitness_protocol_chunks.json")

    records = []

    for item in exercises:
        records.append({
            "id": f"exercise_{item['id']}",
            "type": "exercise",
            "source": "free-exercise-db",
            "text": exercise_to_text(item),
            "metadata": item
        })

    for item in yoga_poses:
        records.append({
            "id": f"yoga_{item['id']}",
            "type": "yoga",
            "source": "yoga-dataset",
            "text": yoga_to_text(item),
            "metadata": item
        })

    for item in protocol_chunks:
        records.append({
            "id": f"protocol_{item['id']}",
            "type": "guideline",
            "source": item.get("source", "fitness_protocol.pdf"),
            "text": protocol_to_text(item),
            "metadata": {
                "page": item.get("page")
            }
        })

    records = [record for record in records if record["text"].strip()]

    print("Records to embed:", len(records))

    model = SentenceTransformer(MODEL_NAME)
    texts = [record["text"] for record in records]

    embeddings = model.encode(
        texts,
        batch_size=32,
        show_progress_bar=True,
        normalize_embeddings=True
    )

    for record, embedding in zip(records, embeddings):
        record["embedding"] = embedding.tolist()

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        json.dump(records, file, ensure_ascii=False)

    print("Records embedded:", len(records))
    print("Vector dimensions:", len(embeddings[0]))
    print("Saved to:", OUTPUT_FILE)


if __name__ == "__main__":
    main()
