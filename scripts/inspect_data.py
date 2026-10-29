
import json
from pathlib import Path

DATA_DIR = Path("data/raw")

files = [
    DATA_DIR / "exercises" / "dist" / "exercises.json",
    DATA_DIR / "yoga" / "yoga.json",
]

for file_path in files:
    print(f"\n{'=' * 50}")
    print(f"File: {file_path}")

    if not file_path.exists():
        print("File not found. Check the dataset folder.")
        continue

    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)

    print("Record count:", len(data) if isinstance(data, list) else "Not a list")

    if isinstance(data, list) and data:
        print("First record:")
        print(json.dumps(data[0], indent=2, ensure_ascii=False))
    elif isinstance(data, dict):
        print("Top-level keys:", list(data.keys()))
