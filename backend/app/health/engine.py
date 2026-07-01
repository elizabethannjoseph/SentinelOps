from app.health.registry import registry
from app.repositories.health_repository import HealthRepository
from app.metrics.metrics import (
    health_checks_total,
    service_status,
    response_time,
)
from app.health import result

class HealthEngine:

    async def run(self):

        results = []
        repository = HealthRepository()

        for checker in registry:
            result = await checker.check()
            repository.save(result)
            health_checks_total.inc()

            service_status.labels(
                service=result.service_name
            ).set(1 if result.status == "Healthy" else 0)

            response_time.labels(
                service=result.service_name
            ).set(result.response_time_ms)
            results.append(result)
            

        return results
    