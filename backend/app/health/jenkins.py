from app.health.http import HTTPHealthCheck
class JenkinsHealthCheck(HTTPHealthCheck):
    def __init__(self):
        super().__init__(
            service_name="Jenkins",
            category="CI/CD",
            url="http://jenkins:8080/login"
        )