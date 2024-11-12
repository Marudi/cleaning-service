import { prisma } from './client';
import type { JobApplication } from '@prisma/client';

export async function getAllApplications() {
  return prisma.jobApplication.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getApplicationById(id: string) {
  return prisma.jobApplication.findUnique({
    where: { id }
  });
}

export async function createApplication(data: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.application.create({
    data
  });
}

export async function updateApplicationStatus(id: string, status: string) {
  return prisma.jobApplication.update({
    where: { id },
    data: { status }
  });
}