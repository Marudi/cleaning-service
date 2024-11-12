import { prisma } from './client';
import type { Inventory } from '@prisma/client';

export async function getAllInventory() {
  return prisma.inventory.findMany();
}

export async function getInventoryById(id: string) {
  return prisma.inventory.findUnique({
    where: { id }
  });
}

export async function createInventoryItem(data: Omit<Inventory, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.inventory.create({
    data
  });
}

export async function updateInventoryQuantity(id: string, quantity: number) {
  return prisma.inventory.update({
    where: { id },
    data: { quantity }
  });
}

export async function getLowStockItems() {
  return prisma.inventory.findMany({
    where: {
      quantity: {
        lte: prisma.inventory.fields.reorderPoint
      }
    }
  });
}