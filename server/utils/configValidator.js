import { z } from 'zod';

const configSchema = z.object({
  isProduction: z.boolean(),
  maintenance: z.object({
    enabled: z.boolean(),
    message: z.string()
  }),
  chatbot: z.object({
    enabled: z.boolean(),
    welcomeMessage: z.string(),
    model: z.string(),
    temperature: z.number().min(0).max(1)
  }),
  payment: z.object({
    stripe: z.object({
      enabled: z.boolean(),
      publicKey: z.string(),
      testMode: z.boolean()
    }),
    paypal: z.object({
      enabled: z.boolean(),
      clientId: z.string(),
      testMode: z.boolean()
    })
  }),
  email: z.object({
    provider: z.enum(['smtp', 'sendgrid', 'ses']),
    testMode: z.boolean(),
    smtp: z.object({
      host: z.string(),
      port: z.string(),
      secure: z.boolean(),
      auth: z.object({
        user: z.string(),
        pass: z.string()
      })
    }),
    defaults: z.object({
      from: z.string().email(),
      replyTo: z.string().email()
    })
  }),
  security: z.object({
    testMode: z.boolean(),
    auth: z.object({
      sessionTimeout: z.number(),
      maxLoginAttempts: z.number(),
      lockoutDuration: z.number(),
      passwordPolicy: z.object({
        minLength: z.number(),
        requireUppercase: z.boolean(),
        requireLowercase: z.boolean(),
        requireNumbers: z.boolean(),
        requireSpecial: z.boolean(),
        expiryDays: z.number()
      })
    }),
    twoFactor: z.object({
      enabled: z.boolean(),
      method: z.enum(['authenticator', 'sms', 'email']),
      backupCodes: z.number()
    })
  })
});

export async function validateConfig(config) {
  try {
    configSchema.parse(config);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      errors: error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
    };
  }
}