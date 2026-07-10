from fastapi import APIRouter
from app.repositories.health_repository import HealthRepository

router = APIRouter(prefix="/api/history", tags=["History"])

@router.get("")
async def get_history():
    repository = HealthRepository()
    results = repository.get_all()
    return [
        {
            "id": result.id,
            "service_name": result.service_name,
            "category": result.category,
            "status": result.status,
            "response_time_ms": result.response_time_ms,
            "checked_at": result.checked_at,
        }
        for result in results
    ]
