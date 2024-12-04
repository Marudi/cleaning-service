import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import { processBookings } from './jobs/bookings.js';
import { processRewards } from './jobs/rewards.js';
import { processNotifications } from './jobs/notifications.js';

const prisma = new PrismaClient();
const redis = createClient({
  url: process.env.REDIS_URL
});

async function startWorker() {
  try {
    await redis.connect();
    console.log('Worker connected to Redis');

    await prisma.$connect();
    console.log('Worker connected to database');

    // Start job processors
    await Promise.all([
      processBookings(prisma, redis),
      processRewards(prisma, redis),
      processNotifications(prisma, redis)
    ]);

    console.log('Worker started successfully');
  } catch (error) {
    console.error('Worker failed to start:', error);
    process.exit(1);
  }
}

startWorker().catch(console.error);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Worker shutting down...');
  await redis.quit();
  await prisma.$disconnect();
  process.exit(0);
});