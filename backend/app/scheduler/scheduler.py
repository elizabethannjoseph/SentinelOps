import asyncio
import logging
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

            last_check = datetime.now(timezone.utc)
            next_check = last_check + timedelta(minutes=5)

            await self.engine.run()

            await asyncio.sleep(300)