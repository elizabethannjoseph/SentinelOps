from app.health.http import HTTPHealthCheck

class GrafanaHealthCheck(HTTPHealthCheck):

    def __init__(self):
        super().__init__(
            service_name="Grafana",
            category="Monitoring",
            url="http://grafana:3000/api/health"
        )