import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get system configuration
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const config = await prisma.systemConfig.findFirst({
      where: { id: 1 }
    });

    if (!config) {
      // Create default config if none exists
      const defaultConfig = await prisma.systemConfig.create({
        data: {
          isProduction: false,
          maintenanceMode: false,
          chatbotEnabled: true,
          debugMode: false
        }
      });
      return res.json(defaultConfig);
    }

    res.json(config);
  } catch (error) {
    console.error('Failed to fetch configuration:', error);
    res.status(500).json({ error: 'Failed to fetch configuration' });
  }
});

// Update production mode
router.post('/production', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { isProduction } = req.body;
    const config = await prisma.systemConfig.upsert({
      where: { id: 1 },
      update: { isProduction },
      create: {
        id: 1,
        isProduction,
        maintenanceMode: false,
        chatbotEnabled: true,
        debugMode: false
      }
    });
    res.json(config);
  } catch (error) {
    console.error('Failed to update production mode:', error);
    res.status(500).json({ error: 'Failed to update production mode' });
  }
});

// Update maintenance mode
router.post('/maintenance', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { maintenanceMode } = req.body;
    const config = await prisma.systemConfig.upsert({
      where: { id: 1 },
      update: { maintenanceMode },
      create: {
        id: 1,
        maintenanceMode,
        isProduction: false,
        chatbotEnabled: true,
        debugMode: false
      }
    });
    res.json(config);
  } catch (error) {
    console.error('Failed to update maintenance mode:', error);
    res.status(500).json({ error: 'Failed to update maintenance mode' });
  }
});

// Update debug mode
router.post('/debug', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { debugMode } = req.body;
    const config = await prisma.systemConfig.upsert({
      where: { id: 1 },
      update: { debugMode },
      create: {
        id: 1,
        debugMode,
        isProduction: false,
        maintenanceMode: false,
        chatbotEnabled: true
      }
    });
    res.json(config);
  } catch (error) {
    console.error('Failed to update debug mode:', error);
    res.status(500).json({ error: 'Failed to update debug mode' });
  }
});

// Update chatbot status
router.post('/chatbot', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { chatbotEnabled } = req.body;
    const config = await prisma.systemConfig.upsert({
      where: { id: 1 },
      update: { chatbotEnabled },
      create: {
        id: 1,
        chatbotEnabled,
        isProduction: false,
        maintenanceMode: false,
        debugMode: false
      }
    });
    res.json(config);
  } catch (error) {
    console.error('Failed to update chatbot status:', error);
    res.status(500).json({ error: 'Failed to update chatbot status' });
  }
});

export default router;