
import os
import json

IMAGE_DIR = "public/exercises"
OUTPUT_FILE = "src/exercises.json"

exercises = []

for folder in sorted(os.listdir(IMAGE_DIR)):
    folder_path = os.path.join(IMAGE_DIR, folder)

    if not os.path.isdir(folder_path):
        continue

    images = [
        file for file in sorted(os.listdir(folder_path))
        if file.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
    ]

    if images:
        exercises.append({
            "name": folder.replace("_", " ").replace("-", " "),
            "image": f"/exercises/{folder}/{images[0]}",
            "category": "Fitness"
        })

os.makedirs("src", exist_ok=True)

with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
    json.dump(exercises, file, indent=2)

print(f"Generated {len(exercises)} exercises!")
