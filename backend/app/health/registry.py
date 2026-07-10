from app.health.glpi import GLPIHealthCheck
from app.health.glpi import GLPIHealthCheck
from app.health.postgres import PostgreSQLHealthCheck
from app.health.prometheus import PrometheusHealthCheck
from app.health.prometheus import PrometheusHealthCheck
from app.health.grafana import GrafanaHealthCheck
from app.health.jenkins import JenkinsHealthCheck
from app.health.sonarqube import SonarQubeHealthCheck
from app.health.minio import MinIOHealthCheck
from app.health.nginx import NginxHealthCheck

registry = [
    GLPIHealthCheck(),
    PostgreSQLHealthCheck(),
    PrometheusHealthCheck(),
    GrafanaHealthCheck(),
    JenkinsHealthCheck(),
    SonarQubeHealthCheck(),
    MinIOHealthCheck(),
    NginxHealthCheck(),
]