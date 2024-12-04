import { sendEmail } from '../utils/email.js';
import { sendSMS } from '../utils/sms.js';

export async function processNotifications(prisma, redis) {
  const subscriber = redis.duplicate();
  await subscriber.connect();

  await subscriber.subscribe('notifications', async (message) => {
    try {
      const notification = JSON.parse(message);
      
      switch (notification.type) {
        case 'booking_reminder':
          await handleBookingReminder(notification, prisma);
          break;
        case 'rewards_credited':
          await handleRewardsNotification(notification, prisma);
          break;
        default:
          console.log('Unknown notification type:', notification.type);
      }
    } catch (error) {
      console.error('Error processing notification:', error);
    }
  });
}

async function handleBookingReminder(notification, prisma) {
  const booking = await prisma.booking.findUnique({
    where: { id: notification.data.bookingId },
    include: {
      user: {
        select: {
          email: true,
          name: true
        }
      },
      service: true
    }
  });

  if (!booking) return;

  await Promise.all([
    sendEmail({
      to: booking.user.email,
      template: 'booking-reminder',
      data: {
        name: booking.user.name,
        service: booking.service.name,
        date: notification.data.date,
        time: notification.data.time
      }
    }),
    sendSMS({
      to: booking.customerPhone,
      template: 'booking-reminder',
      data: {
        service: booking.service.name,
        date: notification.data.date,
        time: notification.data.time
      }
    })
  ]);
}

async function handleRewardsNotification(notification, prisma) {
  await Promise.all([
    sendEmail({
      to: notification.userEmail,
      template: 'rewards-credited',
      data: {
        name: notification.userName,
        points: notification.points
      }
    }),
    prisma.notification.create({
      data: {
        userId: notification.userId,
        type: 'REWARDS',
        title: 'Points Credited',
        message: `${notification.points} points have been added to your account!`,
        status: 'UNREAD'
      }
    })
  ]);
}