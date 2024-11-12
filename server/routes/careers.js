import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all applications (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Submit application
router.post('/apply', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, position, resumeUrl, coverLetter } = req.body;
    const application = await prisma.jobApplication.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        position,
        resumeUrl,
        coverLetter
      }
    });
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit application' });
  }
});

// Update application status (admin only)
router.patch('/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const application = await prisma.jobApplication.update({
      where: { id },
      data: { status }
    });
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update application status' });
  }
});

export default router;