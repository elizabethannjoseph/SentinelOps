from fastapi import APIRouter

from app.repositories.health_repository import HealthRepository

router = APIRouter(
    prefix="/api/availability",
    tags=["Availability"],
)

repository = HealthRepository()


@router.get("")
def get_availability():
    return repository.get_availability()