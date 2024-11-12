import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchConfig, updateConfig } from '../lib/api/config';
import { useAuth } from './AuthContext';
import { mockConfig } from '../lib/api/mockData';

export interface SystemConfig {
  isProduction: boolean;
  maintenance: {
    enabled: boolean;
    message: string;
  };
  chatbot: {
    enabled: boolean;
    welcomeMessage: string;
    model: string;
    temperature: number;
  };
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

interface ConfigContextType {
  config: SystemConfig;
  setConfig: (config: SystemConfig) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const ConfigContext = createContext<ConfigContextType>({
  config: mockConfig,
  setConfig: async () => {},
  isLoading: false,
  error: null
});

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<SystemConfig>(mockConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadConfig = async () => {
      if (!user) {
        setConfigState(mockConfig);
        setIsLoading(false);
        return;
      }

      try {
        setError(null);
        const data = await fetchConfig();
        setConfigState(data);
      } catch (err) {
        console.error('Failed to load config:', err);
        setError('Failed to load configuration');
        setConfigState(mockConfig);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, [user]);

  const setConfig = async (newConfig: SystemConfig) => {
    if (!user) {
      throw new Error('Authentication required');
    }

    try {
      setError(null);
      const updatedConfig = await updateConfig(newConfig);
      setConfigState(updatedConfig);
    } catch (err) {
      console.error('Failed to update config:', err);
      setError('Failed to update configuration');
      throw err;
    }
  };

  return (
    <ConfigContext.Provider value={{ config, setConfig, isLoading, error }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}