const PROCESS_INTERVAL = 300000; // 5 minutes

export async function processRewards(prisma, redis) {
  async function processPendingRewards() {
    try {
      const pendingRewards = await prisma.rewards.findMany({
        where: {
          pendingPoints: {
            gt: 0
          }
        },
        include: {
          user: {
            select: {
              email: true,
              name: true
            }
          }
        }
      });

      for (const reward of pendingRewards) {
        await prisma.$transaction([
          prisma.rewards.update({
            where: { id: reward.id },
            data: {
              points: { increment: reward.pendingPoints },
              pendingPoints: 0
            }
          }),
          prisma.rewardHistory.create({
            data: {
              userId: reward.userId,
              type: 'EARNED',
              amount: reward.pendingPoints,
              description: 'Points credited',
              status: 'COMPLETED'
            }
          })
        ]);

        await redis.publish('notifications', JSON.stringify({
          type: 'rewards_credited',
          userId: reward.userId,
          points: reward.pendingPoints,
          userName: reward.user.name,
          userEmail: reward.user.email
        }));
      }
    } catch (error) {
      console.error('Error processing rewards:', error);
    }
  }

  setInterval(processPendingRewards, PROCESS_INTERVAL);
  return processPendingRewards();
}