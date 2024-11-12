export interface ChatbotConfig {
  enabled: boolean;
  testMode: boolean;
  welcomeMessage: string;
  model: string;
  temperature: number;
}

export interface SystemConfig {
  isProduction: boolean;
  maintenance: {
    enabled: boolean;
    message: string;
  };
  chatbot: ChatbotConfig;
  payment: {
    stripe: {
      enabled: boolean;
      publicKey: string;
      testMode: boolean;
    };
    paypal: {
      enabled: boolean;
      clientId: string;
      testMode: boolean;
    };
  };
  email: {
    provider: 'smtp' | 'sendgrid' | 'ses';
    testMode: boolean;
    smtp: {
      host: string;
      port: string;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
  };
  security: {
    testMode: boolean;
    auth: {
      sessionTimeout: number;
      maxLoginAttempts: number;
      lockoutDuration: number;
    };
  };
}