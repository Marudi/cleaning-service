export const environment = {
  production: import.meta.env.PROD || false,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  websocketUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:3000',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  chatbotEnabled: import.meta.env.VITE_CHATBOT_ENABLED === 'true',
  maintenanceMode: import.meta.env.VITE_MAINTENANCE_MODE === 'true'
};