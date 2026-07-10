from fastapi import APIRouter
from app.repositories.health_repository import HealthRepository

router = APIRouter(prefix="/api/health", tags=["Health"])

repository = HealthRepository()

@router.get("")
def get_health():
    results = repository.get_latest()
    return [
        {
            "id": result.id,
            "service_name": result.service_name,
            "category": result.category,    
            "status": result.status,
            "response_time_ms": result.response_time_ms,
            "checked_at": result.checked_at,
            "error_message": result.error_message,
            "consecutive_failures": result.consecutive_failures,
        }
        for result in results
    ]