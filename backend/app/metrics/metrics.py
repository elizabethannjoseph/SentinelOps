from prometheus_client import Counter, Gauge

health_checks_total = Counter(
    "sentinelops_health_checks_total",
    "Total number of health checks executed"
)

service_status = Gauge(
    "sentinelops_service_status",
    "Service status (1 = Healthy, 0 = Down)",
    ["service"]
)

response_time = Gauge(
    "sentinelops_response_time_ms",
    "Latest response time in milliseconds",
    ["service"]
)