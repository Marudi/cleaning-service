export const mockConfig = {
  isProduction: false,
  maintenance: {
    enabled: false,
    message: 'System maintenance in progress'
  },
  chatbot: {
    enabled: true,
    testMode: true,
    welcomeMessage: 'Hello! How can I help you today?',
    model: 'gpt-3.5-turbo',
    temperature: 0.7
  },
  payment: {
    stripe: {
      enabled: true,
      publicKey: 'pk_test_mock',
      testMode: true
    },
    paypal: {
      enabled: true,
      clientId: 'client_test_mock',
      testMode: true
    }
  },
  email: {
    provider: 'smtp' as const,
    testMode: true,
    smtp: {
      host: 'smtp.test.com',
      port: '587',
      secure: true,
      auth: {
        user: 'test@example.com',
        pass: 'test_password'
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