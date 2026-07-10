from app.health.http import HTTPHealthCheck
class MinIOHealthCheck(HTTPHealthCheck):
    def __init__(self):
        super().__init__(
            service_name="MinIO",
            category="Object Storage",
            url="http://minio:9000/minio/health/live",
        )
