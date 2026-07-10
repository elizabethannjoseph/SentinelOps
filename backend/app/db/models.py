from datetime import datetime
from typing import Optional
from sqlalchemy import DateTime, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class HealthResult(Base):
    __tablename__ = "health_results"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    service_name: Mapped[str] = mapped_column(String(100))
    category: Mapped[str] = mapped_column(String(50))
    status: Mapped[str] = mapped_column(String(20))
    response_time_ms: Mapped[float] = mapped_column(Float)
    checked_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )
    error_message: Mapped[Optional[str]] = mapped_column(
    String,
    nullable=True,
    )

    consecutive_failures: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )