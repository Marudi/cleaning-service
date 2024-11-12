import { prisma } from './client';
import type { Staff, Schedule } from '@prisma/client';

export async function getAllStaff() {
  return prisma.staff.findMany({
    include: {
      schedule: true
    }
  });
}

export async function getStaffById(id: string) {
  return prisma.staff.findUnique({
    where: { id },
    include: {
      schedule: true
    }
  });
}

export async function createStaff(data: Omit<Staff, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.staff.create({
    data
  });
}

export async function updateStaffSchedule(staffId: string, scheduleData: Omit<Schedule, 'id' | 'staffId' | 'createdAt' | 'updatedAt'>) {
  return prisma.schedule.create({
    data: {
      ...scheduleData,
      staffId
    }
  });
}

export async function getStaffSchedule(staffId: string, startDate: Date, endDate: Date) {
  return prisma.schedule.findMany({
    where: {
      staffId,
      date: {
        gte: startDate,
        lte: endDate
      }
    }
  });
}