import asyncio
from app.db.database import init_db
import app.db.models
from app.core.logging import setup_logging
import logging
from fastapi import FastAPI
from app.api.health import router as health_router
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware
from app.scheduler.scheduler import Scheduler
scheduler = Scheduler()
from contextlib import asynccontextmanager
from app.health.engine import HealthEngine
engine = HealthEngine()
from fastapi.responses import Response
from prometheus_client import generate_latest
from app.api.history import router as history_router
from app.api.incidents import router as incidents_router
from app.api import docker
from app.api.scheduler import router as scheduler_router
from app.api.availability import router as availability_router

@asynccontextmanager
async def lifespan(app):
    asyncio.create_task(scheduler.start())

    yield

app = FastAPI(
    title=settings.app_name,
    lifespan=lifespan,
)
setup_logging()
init_db()

logger = logging.getLogger(__name__)
logger.info("SentinelOps backend started")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(history_router)
app.include_router(health_router)
app.include_router(incidents_router)
app.include_router(docker.router)
app.include_router(scheduler_router)
app.include_router(availability_router)

@app.get("/")
async def root():
    return {
        "application": settings.app_name,
        "message": "SentinelOps backend is running"
    }
@app.get("/metrics")
async def metrics():

    return Response(
        generate_latest(),
        media_type="text/plain",
    )