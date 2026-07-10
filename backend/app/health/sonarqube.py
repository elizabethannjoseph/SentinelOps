from app.health.http import HTTPHealthCheck
class SonarQubeHealthCheck(HTTPHealthCheck):
    def __init__(self):
        super().__init__(
            service_name="SonarQube",
            category="Code Quality",
            url="http://sonarqube:9000/api/system/status"
        )