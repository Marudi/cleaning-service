import { formatISO, addHours } from 'date-fns';
import { createNotification } from '../utils/notifications.js';

const REMINDER_HOURS = 24;
const PROCESS_INTERVAL = 60000; // 1 minute

export async function processBookings(prisma, redis) {
  async function processUpcomingBookings() {
    try {
      const upcomingBookings = await prisma.booking.findMany({
        where: {
          status: 'scheduled',
          date: {
            gte: new Date(),
            lte: addHours(new Date(), REMINDER_HOURS)
          }
        },
        include: {
          service: true,
          user: {
            select: {
              email: true,
              name: true
            }
          }
        }
      });

      for (const booking of upcomingBookings) {
        await createNotification({
          type: 'booking_reminder',
          userId: booking.userId,
          data: {
            bookingId: booking.id,
            serviceName: booking.service.name,
            date: formatISO(booking.date),
            time: booking.time
          }
        }, redis);
      }
    } catch (error) {
      console.error('Error processing bookings:', error);
    }
  }

  setInterval(processUpcomingBookings, PROCESS_INTERVAL);
  return processUpcomingBookings();
}