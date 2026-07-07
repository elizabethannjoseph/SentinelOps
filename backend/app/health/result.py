from dataclasses import dataclass
from typing import Optional

@dataclass
class HealthResult:
    service_name: str
    status: str
    response_time_ms: float
    error_message: Optional[str] = None
    consecutive_failures: int = 0