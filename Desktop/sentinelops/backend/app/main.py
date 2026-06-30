from fastapi import FastAPI

app = FastAPI(title="SentinelOps")

@app.get("/")
async def root():
    return {"message": "SentinelOps backend is running"}