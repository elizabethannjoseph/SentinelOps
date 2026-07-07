from fastapi import APIRouter

from app.repositories.health_repository import HealthRepository

router = APIRouter(prefix="/api/incidents", tags=["Incidents"])

repository = HealthRepository()


@router.get("")
def get_incidents():
    return repository.get_incidents()