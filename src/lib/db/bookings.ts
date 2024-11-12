import { prisma } from './client';
import type { Booking } from '@prisma/client';

export async function getAllBookings() {
  return prisma.booking.findMany({
    include: {
      service: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
}

export async function getBookingById(id: string) {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      service: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
}

export async function createBooking(data: {
  userId: string;
  serviceId: string;
  date: Date;
  notes?: string;
}) {
  return prisma.booking.create({
    data,
    include: {
      service: true
    }
  });
}

export async function updateBookingStatus(id: string, status: string) {
  return prisma.booking.update({
    where: { id },
    data: { status },
    include: {
      service: true
    }
  });
}