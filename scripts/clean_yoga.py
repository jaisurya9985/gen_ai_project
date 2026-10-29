
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

INPUT_FILE = ROOT / "data" / "raw" / "yoga" / "yoga.json"
OUTPUT_DIR = ROOT / "data" / "processed"
OUTPUT_FILE = OUTPUT_DIR / "yoga_clean.json"


def clean_yoga():
    with open(INPUT_FILE, "r", encoding="utf-8") as file:
        records = json.load(file)

    cleaned = []
    seen = set()

    for item in records:
        name = str(item.get("name", "")).strip()
        pose_id = str(item.get("id", name.lower().replace(" ", "_")))

        if not name or pose_id in seen:
            continue

        seen.add(pose_id)

        instruction_steps = item.get("instruction_steps", {})
        if isinstance(instruction_steps, dict):
            instructions = instruction_steps.get("en", [])
        else:
            instructions = []

        cleaned.append({
            "id": pose_id,
            "name": name,
            "sanskrit_name": item.get("sanskrit_name", ""),
            "sanskrit_name_iast": item.get("sanskrit_name_iast", ""),
            "translation": item.get("translation", ""),
            "category": item.get("category", "unknown"),
            "categories": item.get("categories", []),
            "difficulty": item.get("difficulty", "unknown"),
            "focus": item.get("focus", ""),
            "target_areas": item.get("target_areas", []),
            "description": item.get("description", ""),
            "benefits": item.get("benefits", ""),
            "instructions": instructions,
            "image": item.get("image", "")
        })

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        json.dump(cleaned, file, indent=2, ensure_ascii=False)

    print(f"Original records: {len(records)}")
    print(f"Cleaned records: {len(cleaned)}")
    print(f"Saved to: {OUTPUT_FILE}")

    if cleaned:
        print("\nFirst pose:", cleaned[0]["name"])
        print("Instruction steps:", len(cleaned[0]["instructions"]))
        print("Available fields:", list(cleaned[0].keys()))


if __name__ == "__main__":
    clean_yoga()
