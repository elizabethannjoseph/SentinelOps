from app.health.glpi import GLPIHealthCheck
from app.health.glpi import GLPIHealthCheck
from app.health.postgres import PostgreSQLHealthCheck
from app.health.prometheus import PrometheusHealthCheck
from app.health.prometheus import PrometheusHealthCheck

from app.health.grafana import GrafanaHealthCheck

registry = [
    GLPIHealthCheck(),
    PostgreSQLHealthCheck(),
    PrometheusHealthCheck(),
    GrafanaHealthCheck(),
]