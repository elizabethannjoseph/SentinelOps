import time
import httpx

from app.health.base import HealthCheck
from app.health.result import HealthResult


class HTTPHealthCheck(HealthCheck):

    def __init__(
        self,
        service_name: str,
        category: str,
        url: str,
    ):
        self.service_name = service_name
        self.category = category
        self.url = url

    async def check(self) -> HealthResult:

        start = time.perf_counter()
        error = None

        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(self.url)

            elapsed = (time.perf_counter() - start) * 1000
            status = "Healthy" if response.status_code == 200 else "Down"

        except Exception as e:
            elapsed = (time.perf_counter() - start) * 1000
            error = str(e)
            status = "Down"

        return HealthResult(
            service_name=self.service_name,
            category=self.category,
            status=status,
            response_time_ms=elapsed,
            error_message=error,
        )