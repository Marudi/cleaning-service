export async function gracefulShutdown(prisma, redis) {
  console.log('Worker shutting down...');
  
  try {
    await Promise.all([
      redis.quit(),
      prisma.$disconnect()
    ]);
    console.log('Connections closed successfully');
  } catch (error) {
    console.error('Error during shutdown:', error);
  }
  
  process.exit(0);
}