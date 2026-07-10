from unittest import result
from app.db.database import SessionLocal
from app.db.models import HealthResult as HealthResultModel
from app.health.result import HealthResult


class HealthRepository:

    def save(self, result: HealthResult):

        session = SessionLocal()
        try:
            previous = (
                session.query(HealthResultModel)
                .filter(
                    HealthResultModel.service_name == result.service_name
                    )
                    .order_by(HealthResultModel.checked_at.desc())
                    .first()
            )

            if result.status == "Healthy":
                consecutive_failures = 0
            else:
                if previous and previous.status == "Down":
                    consecutive_failures = previous.consecutive_failures + 1
                else:
                    consecutive_failures = 1
            db_result = HealthResultModel(
                service_name=result.service_name,
                category=result.category,
                status=result.status,
                response_time_ms=result.response_time_ms,
                error_message=result.error_message,
                consecutive_failures=consecutive_failures,
            )

            session.add(db_result)
            session.commit()

        finally:
            session.close()

    def get_all(self):

        session = SessionLocal()
        try:
            return (
                session.query(HealthResultModel)
                .order_by(HealthResultModel.checked_at.desc())
                .all()
            )

        finally:
            session.close()
    def get_latest(self):
        session = SessionLocal()
        try:
            latest = {}
            results = (
                session.query(HealthResultModel)
                .order_by(HealthResultModel.checked_at.desc())
                .all()
                )
            for result in results:
                if result.service_name not in latest:
                    latest[result.service_name] = result

            return list(latest.values())

        finally:
            session.close()

    def get_incidents(self):

        session = SessionLocal()

        try:
            results = (
                session.query(HealthResultModel)
                .order_by(HealthResultModel.checked_at.asc())
                .all()
            )

            incidents = []
            last_status = {}

            for result in results:

                previous_status = last_status.get(result.service_name)

                # First record for this service
                if previous_status is None:
                    last_status[result.service_name] = result.status
                    continue

                # Record only state changes
                if previous_status != result.status:

                    incidents.append(
                        {
                            "id": result.id,
                            "service_name": result.service_name,
                            "event": (
                                "Recovered"
                                if result.status == "Healthy"
                                else "Down"
                            ),
                            "status": result.status,
                            "checked_at": result.checked_at,
                            "response_time_ms": result.response_time_ms,
                            "error_message": result.error_message,
                        }
                    )

                last_status[result.service_name] = result.status

            return list(reversed(incidents))

        finally:
            session.close()