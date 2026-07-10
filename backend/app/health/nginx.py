from app.health.http import HTTPHealthCheck
class NginxHealthCheck(HTTPHealthCheck):
    def __init__(self):
        super().__init__(
            service_name="Nginx",
            category="Web Server",
            url="http://nginx"
        )