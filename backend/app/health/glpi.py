import time

import httpx

from app.health.base import HealthCheck
from app.health.result import HealthResult


class GLPIHealthCheck(HealthCheck):

    async def check(self) -> HealthResult:

        start = time.perf_counter()
        error = None
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get("http://glpi")

            elapsed = (time.perf_counter() - start) * 1000

            status = "Healthy" if response.status_code == 200 else "Down"

        except Exception as e:
            error = str(e)

            elapsed = (time.perf_counter() - start) * 1000
            status = "Down"

        return HealthResult(
            service_name="GLPI",
            status=status,
            response_time_ms=elapsed,
            error_message=error,
        )