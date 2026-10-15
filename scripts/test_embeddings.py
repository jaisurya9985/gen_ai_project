
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

texts = [
    "Boat pose strengthens the core and abdominal muscles.",
    "Squats train the quadriceps and gluteal muscles.",
    "A beginner needs an appropriate exercise plan with recovery."
]

embeddings = model.encode(texts)

print("Number of texts:", len(texts))
print("Embedding shape:", embeddings.shape)
print("First embedding dimensions:", embeddings[0][:5])
