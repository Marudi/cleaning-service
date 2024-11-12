import { prisma } from './client';
import type { Service } from '@prisma/client';

export async function getAllServices() {
  return prisma.service.findMany();
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({
    where: { id }
  });
}

export async function createService(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.service.create({
    data
  });
}

export async function updateService(id: string, data: Partial<Service>) {
  return prisma.service.update({
    where: { id },
    data
  });
}

export async function deleteService(id: string) {
  return prisma.service.delete({
    where: { id }
  });
}