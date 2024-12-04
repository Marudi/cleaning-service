export async function createNotification(notification, redis) {
  await redis.publish('notifications', JSON.stringify(notification));
}