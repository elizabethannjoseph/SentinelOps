from fastapi import APIRouter

import app.scheduler.scheduler as scheduler
router = APIRouter(
    prefix="/api/scheduler",
    tags=["Scheduler"],
)


@router.get("/status")
def get_scheduler_status():
    return {
    "last_check": scheduler.last_check,
    "next_check": scheduler.next_check,
}