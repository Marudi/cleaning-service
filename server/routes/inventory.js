import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all inventory items
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const inventory = await prisma.inventory.findMany();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Create inventory item
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, quantity, unit, category, reorderPoint, price } = req.body;
    const item = await prisma.inventory.create({
      data: {
        name,
        description,
        quantity: parseInt(quantity),
        unit,
        category,
        reorderPoint: parseInt(reorderPoint),
        price: parseFloat(price)
      }
    });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create inventory item' });
  }
});

// Update inventory quantity
router.patch('/:id/quantity', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const item = await prisma.inventory.update({
      where: { id },
      data: { quantity: parseInt(quantity) }
    });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update quantity' });
  }
});

export default router;