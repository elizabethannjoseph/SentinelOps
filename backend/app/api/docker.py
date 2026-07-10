from fastapi import APIRouter

from app.services.docker_service import (
    list_containers,
    get_container_info,
)

router = APIRouter(
    prefix="/api/docker",
    tags=["Docker"],
)


@router.get("/containers")
def containers():
    return list_containers()


@router.get("/container/{name}")
def container_info(name: str):
    return get_container_info(name)