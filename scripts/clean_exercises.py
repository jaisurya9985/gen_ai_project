
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

INPUT_FILE = ROOT / "data" / "raw" / "exercises" / "dist" / "exercises.json"
OUTPUT_DIR = ROOT / "data" / "processed"
OUTPUT_FILE = OUTPUT_DIR / "exercises_clean.json"


def clean_exercises():
    if not INPUT_FILE.exists():
        print(f"Dataset not found: {INPUT_FILE}")
        return

    with open(INPUT_FILE, "r", encoding="utf-8") as file:
        exercises = json.load(file)

    cleaned = []
    seen_ids = set()

    for item in exercises:
        name = item.get("name", "").strip()
        exercise_id = item.get("id", name.lower().replace(" ", "_"))

        if not name or exercise_id in seen_ids:
            continue

        seen_ids.add(exercise_id)

        cleaned.append({
            "id": exercise_id,
            "name": name,
            "category": item.get("category", "unknown"),
            "level": item.get("level", "unknown"),
            "equipment": item.get("equipment", "unknown"),
            "primary_muscles": item.get("primaryMuscles", []),
            "secondary_muscles": item.get("secondaryMuscles", []),
            "instructions": item.get("instructions", []),
            "force": item.get("force", "unknown"),
            "mechanic": item.get("mechanic", "unknown"),
            "images": item.get("images", [])
        })

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        json.dump(cleaned, file, indent=2, ensure_ascii=False)

    print(f"Original records: {len(exercises)}")
    print(f"Cleaned records: {len(cleaned)}")
    print(f"Saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    clean_exercises()
