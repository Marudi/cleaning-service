import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all staff
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const staff = await prisma.staff.findMany({
      include: {
        schedule: true
      }
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});

// Create staff member
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    const staff = await prisma.staff.create({
      data: {
        name,
        email,
        phone,
        role
      }
    });
    res.json(staff);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create staff member' });
  }
});

// Update staff schedule
router.post('/:id/schedule', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startTime, endTime } = req.body;
    const schedule = await prisma.schedule.create({
      data: {
        staffId: id,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime)
      }
    });
    res.json(schedule);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update schedule' });
  }
});

export default router;