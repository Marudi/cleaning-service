import { z } from 'zod';

export const configSchema = z.object({
  isProduction: z.boolean(),
  maintenanceMode: z.boolean(),
  debugMode: z.boolean(),
  smtpHost: z.string().nullable(),
  smtpPort: z.string().nullable(),
  smtpUser: z.string().nullable(),
  smtpSecure: z.boolean(),
  dbPoolSize: z.number(),
  dbBackupEnabled: z.boolean(),
  dbBackupSchedule: z.string(),
  chatEnabled: z.boolean(),
  chatModel: z.string(),
  chatTemperature: z.number(),
  welcomeMessage: z.string(),
  apiRateLimit: z.number(),
  apiTimeout: z.number(),
  maxLoginAttempts: z.number(),
  passwordExpiry: z.number(),
  mfaEnabled: z.boolean()
});

export type Config = z.infer<typeof configSchema>;

const defaultConfig: Config = {
  isProduction: import.meta.env.PROD,
  maintenanceMode: false,
  debugMode: false,
  smtpHost: null,
  smtpPort: null,
  smtpUser: null,
  smtpSecure: true,
  dbPoolSize: 20,
  dbBackupEnabled: true,
  dbBackupSchedule: 'daily',
  chatEnabled: true,
  chatModel: 'gpt-3.5-turbo',
  chatTemperature: 0.7,
  welcomeMessage: 'Hello! How can I help you today?',
  apiRateLimit: 100,
  apiTimeout: 30000,
  maxLoginAttempts: 5,
  passwordExpiry: 90,
  mfaEnabled: false
};

let cachedConfig: Config | null = null;

export async function loadConfig(): Promise<Config> {
  try {
    if (cachedConfig) {
      return cachedConfig;
    }

    const response = await fetch('/api/config');
    if (!response.ok) {
      throw new Error('Failed to load configuration');
    }

    const data = await response.json();
    cachedConfig = configSchema.parse(data);
    return cachedConfig;
  } catch (error) {
    console.error('Failed to load config:', error);
    return defaultConfig;
  }
}

export async function updateConfig(updates: Partial<Config>): Promise<Config> {
  try {
    const response = await fetch('/api/config', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      throw new Error('Failed to update configuration');
    }

    const data = await response.json();
    cachedConfig = configSchema.parse(data);
    return cachedConfig;
  } catch (error) {
    console.error('Failed to update config:', error);
    throw error;
  }
}