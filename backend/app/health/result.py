from dataclasses import dataclass
from typing import Optional

@dataclass
class HealthResult:
    def __init__(
        self,
        service_name,
        category,
        status,
        response_time_ms,
        error_message,
    ):
        self.service_name = service_name
        self.category = category
        self.status = status
        self.response_time_ms = response_time_ms
        self.error_message = error_message