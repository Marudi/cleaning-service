export async function processBookings(prisma, redis) {
  const processInterval = 60000; // 1 minute

  async function processUpcomingBookings() {
    try {
      const upcomingBookings = await prisma.booking.findMany({
        where: {
          status: 'scheduled',
          date: {
            gte: new Date(),
            lte: new Date(Date.now() + 24 * 60 * 60 * 1000) // Next 24 hours
          }
        },
        include: {
          service: true
        }
      });

      for (const booking of upcomingBookings) {
        await redis.publish('notifications', JSON.stringify({
          type: 'booking_reminder',
          booking
        }));
      }
    } catch (error) {
      console.error('Error processing bookings:', error);
    }
  }

  setInterval(processUpcomingBookings, processInterval);
  return processUpcomingBookings();
}