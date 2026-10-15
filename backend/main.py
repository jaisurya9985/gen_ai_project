from fastapi import FastAPI

app = FastAPI(title="Yoga and fitness plan generator")

@app.get("/")
def home():
    return {"message":"Yoga and fitnes rag api running"}

@app.get("/health")
def health():
    return {'status':"healthy"}
