import asyncio
import logging

from app.health.engine import HealthEngine

logger = logging.getLogger(__name__)

class Scheduler:

    def __init__(self):
        self.engine = HealthEngine()

    async def start(self):

        while True:

            logger.info("Running health checks...")

            await self.engine.run()

            await asyncio.sleep(300)
        while True:
            try:
              await self.engine.run()
            except Exception as e:
                logger.exception("Health check failed")

            await asyncio.sleep(...)