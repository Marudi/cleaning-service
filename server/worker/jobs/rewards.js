export async function processRewards(prisma, redis) {
  const processInterval = 300000; // 5 minutes

  async function processPendingRewards() {
    try {
      const pendingRewards = await prisma.rewards.findMany({
        where: {
          pendingPoints: {
            gt: 0
          }
        }
      });

      for (const reward of pendingRewards) {
        await prisma.rewards.update({
          where: { id: reward.id },
          data: {
            points: { increment: reward.pendingPoints },
            pendingPoints: 0,
            history: {
              create: {
                userId: reward.userId,
                type: 'EARNED',
                amount: reward.pendingPoints,
                description: 'Points credited',
                status: 'COMPLETED'
              }
            }
          }
        });

        await redis.publish('notifications', JSON.stringify({
          type: 'rewards_credited',
          userId: reward.userId,
          points: reward.pendingPoints
        }));
      }
    } catch (error) {
      console.error('Error processing rewards:', error);
    }
  }

  setInterval(processPendingRewards, processInterval);
  return processPendingRewards();
}