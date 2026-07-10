from app.health.http import HTTPHealthCheck
class GLPIHealthCheck(HTTPHealthCheck):
    def __init__(self):
        super().__init__(
            service_name="GLPI",
            category="ITSM",
            url="http://glpi"
        )