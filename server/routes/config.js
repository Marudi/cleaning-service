import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { validateConfig } from '../utils/configValidator.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get system configuration
router.get('/', authenticateToken, async (req, res) => {
  try {
    const config = await prisma.systemConfig.findFirst({
      where: { id: 1 }
    });

    if (!config) {
      const defaultConfig = {
        isProduction: false,
        maintenance: {
          enabled: false,
          message: 'System is under maintenance. Please try again later.'
        },
        chatbot: {
          enabled: true,
          welcomeMessage: 'Hello! How can I help you today?',
          model: 'gpt-3.5-turbo',
          temperature: 0.7
        },
        payment: {
          stripe: {
            enabled: true,
            publicKey: process.env.STRIPE_PUBLIC_KEY,
            testMode: true
          },
          paypal: {
            enabled: true,
            clientId: process.env.PAYPAL_CLIENT_ID,
            testMode: true
          }
        },
        email: {
          provider: 'smtp',
          testMode: true,
          smtp: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
          }
        },
        security: {
          testMode: true,
          auth: {
            sessionTimeout: 3600,
            maxLoginAttempts: 5,
            lockoutDuration: 900
          }
        }
      };

      await prisma.systemConfig.create({
        data: {
          id: 1,
          config: defaultConfig
        }
      });

      return res.json(defaultConfig);
    }

    res.json(config.config);
  } catch (error) {
    console.error('Failed to fetch config:', error);
    res.status(500).json({ error: 'Failed to fetch configuration' });
  }
});

// Update system configuration (admin only)
router.put('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const newConfig = req.body;

    // Validate configuration before updating
    const validationResult = await validateConfig(newConfig);
    if (!validationResult.valid) {
      return res.status(400).json({
        error: 'Invalid configuration',
        details: validationResult.errors
      });
    }

    // If switching to production mode, perform additional checks
    if (newConfig.isProduction) {
      const checks = await validateProductionConfig(newConfig);
      if (!checks.valid) {
        return res.status(400).json({
          error: 'Production mode requirements not met',
          details: checks.errors
        });
      }
    }

    const updatedConfig = await prisma.systemConfig.upsert({
      where: { id: 1 },
      update: { config: newConfig },
      create: {
        id: 1,
        config: newConfig
      }
    });

    // Log configuration change
    await prisma.configChangeLog.create({
      data: {
        userId: req.user.id,
        changes: JSON.stringify(newConfig),
        timestamp: new Date()
      }
    });

    res.json(updatedConfig.config);
  } catch (error) {
    console.error('Failed to update config:', error);
    res.status(500).json({ error: 'Failed to update configuration' });
  }
});

// Validate configuration
router.post('/validate', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const config = req.body;
    const validationResult = await validateConfig(config);
    res.json(validationResult);
  } catch (error) {
    console.error('Failed to validate config:', error);
    res.status(500).json({ error: 'Failed to validate configuration' });
  }
});

// Get configuration change history
router.get('/history', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const history = await prisma.configChangeLog.findMany({
      orderBy: { timestamp: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.json(history);
  } catch (error) {
    console.error('Failed to fetch config history:', error);
    res.status(500).json({ error: 'Failed to fetch configuration history' });
  }
});

async function validateProductionConfig(config) {
  const errors = [];

  // Check required environment variables
  const requiredEnvVars = [
    'STRIPE_SECRET_KEY',
    'PAYPAL_SECRET',
    'SMTP_HOST',
    'SMTP_USER',
    'SMTP_PASS',
    'JWT_SECRET'
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`);
    }
  }

  // Check security settings
  if (!config.security.twoFactor.enabled) {
    errors.push('Two-factor authentication must be enabled in production');
  }

  if (config.security.auth.maxLoginAttempts > 5) {
    errors.push('Maximum login attempts should not exceed 5 in production');
  }

  // Check email configuration
  if (config.email.testMode) {
    errors.push('Email test mode must be disabled in production');
  }

  // Check payment gateway configuration
  if (config.payment.stripe.testMode || config.payment.paypal.testMode) {
    errors.push('Payment gateways must not be in test mode in production');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export default router;