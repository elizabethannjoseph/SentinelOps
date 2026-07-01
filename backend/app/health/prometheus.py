import time

import httpx

from app.health.base import HealthCheck
from app.health.result import HealthResult


class PrometheusHealthCheck(HealthCheck):

    async def check(self) -> HealthResult:

        start = time.perf_counter()

        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get("http://prometheus:9090/-/healthy")

            elapsed = (time.perf_counter() - start) * 1000

            status = "Healthy" if response.status_code == 200 else "Down"

        except Exception:

            elapsed = (time.perf_counter() - start) * 1000

            status = "Down"

        return HealthResult(
            service_name="Prometheus",
            status=status,
            response_time_ms=elapsed,
        )