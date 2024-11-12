export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const environment = {
  production: import.meta.env.PROD || false,
  apiUrl: API_URL,
  websocketUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:3000',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  chatbotEnabled: import.meta.env.VITE_CHATBOT_ENABLED === 'true',
  maintenanceMode: import.meta.env.VITE_MAINTENANCE_MODE === 'true',
  defaultRewardTiers: {
    BRONZE: {
      minPoints: 0,
      maxPoints: 999,
      multiplier: 1
    },
    SILVER: {
      minPoints: 1000,
      maxPoints: 4999,
      multiplier: 1.5
    },
    GOLD: {
      minPoints: 5000,
      maxPoints: 9999,
      multiplier: 2
    },
    PLATINUM: {
      minPoints: 10000,
      maxPoints: Infinity,
      multiplier: 3
    }
  }
};