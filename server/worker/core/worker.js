import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import { processBookings } from '../jobs/bookings.js';
import { processRewards } from '../jobs/rewards.js';
import { processNotifications } from '../jobs/notifications.js';
import { gracefulShutdown } from '../utils/shutdown.js';

const prisma = new PrismaClient();
const redis = createClient({
  url: process.env.REDIS_URL
});

export async function startWorker() {
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

    // Handle graceful shutdown
    process.on('SIGTERM', () => gracefulShutdown(prisma, redis));
    process.on('SIGINT', () => gracefulShutdown(prisma, redis));

  } catch (error) {
    console.error('Worker failed to start:', error);
    await gracefulShutdown(prisma, redis);
    process.exit(1);
  }
}