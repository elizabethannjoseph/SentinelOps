import time

import psycopg

from app.core.config import settings
from app.health.base import HealthCheck
from app.health.result import HealthResult


class PostgreSQLHealthCheck(HealthCheck):

    async def check(self) -> HealthResult:

        start = time.perf_counter()
        error = None
        try:
            conn = psycopg.connect(
            host=settings.postgres_host,
            port=settings.postgres_port,
            dbname=settings.postgres_db,
            user=settings.postgres_user,
        password=settings.postgres_password,
        )

            conn.close()

            elapsed = (time.perf_counter() - start) * 1000

            status = "Healthy"

        except Exception as e:
            error = str(e)

            elapsed = (time.perf_counter() - start) * 1000

            status = "Down"

        return HealthResult(
            service_name="PostgreSQL",
            category="Database",
            status=status,
            response_time_ms=elapsed,
            error_message=error,
        )