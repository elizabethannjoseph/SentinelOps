import asyncio
import logging
import time
from datetime import datetime, timedelta, timezone

from app.health.engine import HealthEngine

logger = logging.getLogger(__name__)

last_check = None
next_check = None


class Scheduler:

    def __init__(self):
        self.engine = HealthEngine()

    async def start(self):
        global last_check, next_check

        while True:
            logger.info("Running health checks...")

            start = time.monotonic()

            last_check = datetime.now(timezone.utc)

            await self.engine.run()

            next_check = datetime.now(timezone.utc) + timedelta(minutes=5)

            elapsed = time.monotonic() - start

            sleep_time = max(0, 300 - elapsed)

            await asyncio.sleep(sleep_time)