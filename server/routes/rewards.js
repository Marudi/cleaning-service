import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's reward points and tier
router.get('/points', authenticateToken, async (req, res) => {
  try {
    const rewards = await prisma.rewards.findUnique({
      where: { userId: req.user.id }
    });

    if (!rewards) {
      // Create default rewards for new user
      const newRewards = await prisma.rewards.create({
        data: {
          userId: req.user.id,
          points: 0,
          pendingPoints: 0,
          redeemedPoints: 0,
          tier: 'SILVER',
          multiplier: 1.0
        }
      });
      return res.json(newRewards);
    }

    res.json(rewards);
  } catch (error) {
    console.error('Failed to fetch rewards:', error);
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
});

// Get reward history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const history = await prisma.rewardHistory.findMany({
      where: { userId: req.user.id },
      orderBy: { date: 'desc' },
      take: 50
    });

    res.json(history);
  } catch (error) {
    console.error('Failed to fetch reward history:', error);
    res.status(500).json({ error: 'Failed to fetch reward history' });
  }
});

// Redeem points
router.post('/redeem', authenticateToken, async (req, res) => {
  const { amount, reward } = req.body;

  if (!amount || !reward) {
    return res.status(400).json({ error: 'Amount and reward are required' });
  }

  try {
    const rewards = await prisma.rewards.findUnique({
      where: { userId: req.user.id }
    });

    if (!rewards || rewards.points < amount) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    // Start a transaction
    await prisma.$transaction([
      // Update points balance
      prisma.rewards.update({
        where: { userId: req.user.id },
        data: {
          points: { decrement: amount },
          redeemedPoints: { increment: amount }
        }
      }),
      // Create redemption record
      prisma.rewardHistory.create({
        data: {
          userId: req.user.id,
          type: 'REDEEMED',
          amount: -amount,
          description: `Redeemed for ${reward}`,
          status: 'COMPLETED'
        }
      })
    ]);

    res.json({ message: 'Points redeemed successfully' });
  } catch (error) {
    console.error('Failed to redeem points:', error);
    res.status(500).json({ error: 'Failed to redeem points' });
  }
});

// Calculate and award points for a booking
router.post('/calculate', authenticateToken, async (req, res) => {
  const { bookingAmount } = req.body;

  if (!bookingAmount) {
    return res.status(400).json({ error: 'Booking amount is required' });
  }

  try {
    const rewards = await prisma.rewards.findUnique({
      where: { userId: req.user.id }
    });

    // Calculate points based on tier multiplier
    const basePoints = Math.floor(bookingAmount);
    const multiplier = rewards?.multiplier || 1.0;
    const pointsToAward = Math.floor(basePoints * multiplier);

    // Award points
    await prisma.$transaction([
      prisma.rewards.update({
        where: { userId: req.user.id },
        data: {
          pendingPoints: { increment: pointsToAward }
        }
      }),
      prisma.rewardHistory.create({
        data: {
          userId: req.user.id,
          type: 'EARNED',
          amount: pointsToAward,
          description: `Points for booking #${req.body.bookingId}`,
          status: 'PENDING'
        }
      })
    ]);

    res.json({ pointsAwarded: pointsToAward });
  } catch (error) {
    console.error('Failed to calculate points:', error);
    res.status(500).json({ error: 'Failed to calculate points' });
  }
});

// Update tier based on total points
router.post('/update-tier', authenticateToken, async (req, res) => {
  try {
    const rewards = await prisma.rewards.findUnique({
      where: { userId: req.user.id },
      include: {
        history: {
          where: {
            status: 'COMPLETED'
          },
          select: {
            amount: true
          }
        }
      }
    });

    if (!rewards) {
      return res.status(404).json({ error: 'Rewards not found' });
    }

    // Calculate total earned points
    const totalPoints = rewards.history.reduce((sum, record) => sum + record.amount, 0);

    // Determine new tier
    let newTier = 'SILVER';
    let multiplier = 1.0;

    if (totalPoints >= 10000) {
      newTier = 'PLATINUM';
      multiplier = 2.0;
    } else if (totalPoints >= 5000) {
      newTier = 'GOLD';
      multiplier = 1.5;
    }

    // Update tier if changed
    if (newTier !== rewards.tier) {
      await prisma.rewards.update({
        where: { userId: req.user.id },
        data: {
          tier: newTier,
          multiplier
        }
      });

      // Create tier upgrade history record
      await prisma.rewardHistory.create({
        data: {
          userId: req.user.id,
          type: 'BONUS',
          amount: 0,
          description: `Upgraded to ${newTier} tier`,
          status: 'COMPLETED'
        }
      });
    }

    res.json({ tier: newTier, multiplier });
  } catch (error) {
    console.error('Failed to update tier:', error);
    res.status(500).json({ error: 'Failed to update tier' });
  }
});

export default router;