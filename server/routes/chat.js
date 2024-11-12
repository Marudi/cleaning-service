import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get chat configuration
router.get('/config', async (req, res) => {
  try {
    const config = await prisma.chatConfig.findFirst();
    res.json(config || {
      enabled: false,
      welcomeMessage: 'Hello! How can I help you today?',
      model: 'gpt-3.5-turbo',
      temperature: 0.7
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat configuration' });
  }
});

// Update chat configuration (admin only)
router.put('/config', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { enabled, welcomeMessage, model, temperature } = req.body;
    const config = await prisma.chatConfig.upsert({
      where: { id: 1 },
      update: {
        enabled,
        welcomeMessage,
        model,
        temperature
      },
      create: {
        enabled,
        welcomeMessage,
        model,
        temperature
      }
    });
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update chat configuration' });
  }
});

// Handle chat messages
router.post('/', async (req, res) => {
  try {
    const { message, model, temperature } = req.body;
    
    // Here you would integrate with your preferred AI service
    // For example, OpenAI's API
    const response = await generateAIResponse(message, model, temperature);
    
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process message' });
  }
});

export default router;