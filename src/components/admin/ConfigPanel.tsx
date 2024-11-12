import React, { useState } from 'react';
import { Settings, X, Mail, Database, MessageSquare, CreditCard, Shield, Bot, Server, Bell } from 'lucide-react';
import { useConfig } from '../../contexts/ConfigContext';

interface ChatTestState {
  message: string;
  response: string | null;
}

const mockTestResponse = {
  message: "This is a test response. The chatbot is in test mode.",
  timestamp: new Date().toISOString()
};

const sections = [
  { id: 'environment', icon: Server, label: 'Environment' },
  { id: 'database', icon: Database, label: 'Database' },
  { id: 'email', icon: Mail, label: 'Email' },
  { id: 'sms', icon: MessageSquare, label: 'SMS' },
  { id: 'payment', icon: CreditCard, label: 'Payment' },
  { id: 'chatbot', icon: Bot, label: 'AI Chatbot' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'notifications', icon: Bell, label: 'Notifications' }
];

export default function ConfigPanel() {
  const { config, setConfig, error } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('environment');
  const [isSaving, setIsSaving] = useState(false);
  const [localConfig, setLocalConfig] = useState(config);
  const [chatTest, setChatTest] = useState<ChatTestState>({
    message: '',
    response: null
  });

  const handleTestChat = async () => {
    if (!chatTest.message.trim()) return;

    try {
      if (localConfig.chatbot.testMode) {
        setChatTest(prev => ({
          ...prev,
          response: mockTestResponse.message
        }));
      } else {
        const response = await fetch('/api/chat/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ message: chatTest.message })
        });

        if (!response.ok) throw new Error('Failed to test chatbot');
        const data = await response.json();
        setChatTest(prev => ({
          ...prev,
          response: data.response
        }));
      }
    } catch (error) {
      console.error('Chatbot test failed:', error);
      setChatTest(prev => ({
        ...prev,
        response: 'Error: Failed to test chatbot'
      }));
    }
  };

  const handleSave = async () => {
    if (!localConfig) return;

    try {
      setIsSaving(true);
      await setConfig(localConfig);
      alert('Configuration saved successfully');
    } catch (err) {
      alert('Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  };

  if (!config || !localConfig) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-20 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Settings className="h-6 w-6 text-gray-600" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
          <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">System Configuration</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-1 overflow-hidden">
              <div className="w-48 border-r bg-gray-50">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {section.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeSection === 'chatbot' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">AI Chatbot Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Enable Chatbot</span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={localConfig.chatbot.enabled}
                            onChange={(e) => setLocalConfig({
                              ...localConfig,
                              chatbot: {
                                ...localConfig.chatbot,
                                enabled: e.target.checked
                              }
                            })}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Test Mode</span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={localConfig.chatbot.testMode}
                            onChange={(e) => setLocalConfig({
                              ...localConfig,
                              chatbot: {
                                ...localConfig.chatbot,
                                testMode: e.target.checked
                              }
                            })}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Model</label>
                        <select
                          value={localConfig.chatbot.model}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            chatbot: {
                              ...localConfig.chatbot,
                              model: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                          <option value="gpt-4">GPT-4</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Temperature</label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={localConfig.chatbot.temperature}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            chatbot: {
                              ...localConfig.chatbot,
                              temperature: parseFloat(e.target.value)
                            }
                          })}
                          className="mt-1 block w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>More Focused (0)</span>
                          <span>More Creative (1)</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Welcome Message</label>
                        <textarea
                          value={localConfig.chatbot.welcomeMessage}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            chatbot: {
                              ...localConfig.chatbot,
                              welcomeMessage: e.target.value
                            }
                          })}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Test Chatbot</h4>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={chatTest.message}
                            onChange={(e) => setChatTest(prev => ({
                              ...prev,
                              message: e.target.value
                            }))}
                            placeholder="Type a test message..."
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <button
                            onClick={handleTestChat}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Test
                          </button>
                          {chatTest.response && (
                            <div className="mt-2 p-3 bg-white rounded-md border text-sm">
                              <div className="font-medium text-gray-700 mb-1">Response:</div>
                              <div className="text-gray-600">{chatTest.response}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other sections content */}
                {/* Environment Settings */}
                {activeSection === 'environment' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Environment Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Production Mode</span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={localConfig.isProduction}
                            onChange={(e) => setLocalConfig({
                              ...localConfig,
                              isProduction: e.target.checked
                            })}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Maintenance Mode</span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={localConfig.maintenance.enabled}
                            onChange={(e) => setLocalConfig({
                              ...localConfig,
                              maintenance: {
                                ...localConfig.maintenance,
                                enabled: e.target.checked
                              }
                            })}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Maintenance Message</label>
                        <input
                          type="text"
                          value={localConfig.maintenance.message}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            maintenance: {
                              ...localConfig.maintenance,
                              message: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Database Settings */}
                {activeSection === 'database' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Database Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pool Size</label>
                        <input
                          type="number"
                          value={localConfig.database?.poolSize || 10}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            database: {
                              ...localConfig.database,
                              poolSize: parseInt(e.target.value)
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Enable Backups</span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={localConfig.database?.backupEnabled || false}
                            onChange={(e) => setLocalConfig({
                              ...localConfig,
                              database: {
                                ...localConfig.database,
                                backupEnabled: e.target.checked
                              }
                            })}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Settings */}
                {activeSection === 'email' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Email Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                        <input
                          type="text"
                          value={localConfig.email.smtp.host}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            email: {
                              ...localConfig.email,
                              smtp: {
                                ...localConfig.email.smtp,
                                host: e.target.value
                              }
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                        <input
                          type="text"
                          value={localConfig.email.smtp.port}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            email: {
                              ...localConfig.email,
                              smtp: {
                                ...localConfig.email.smtp,
                                port: e.target.value
                              }
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Test Mode</span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={localConfig.email.testMode}
                            onChange={(e) => setLocalConfig({
                              ...localConfig,
                              email: {
                                ...localConfig.email,
                                testMode: e.target.checked
                              }
                            })}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Payment Settings */}
                {activeSection === 'payment' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Payment Settings</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Stripe</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Enable Stripe</span>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input
                                type="checkbox"
                                checked={localConfig.payment.stripe.enabled}
                                onChange={(e) => setLocalConfig({
                                  ...localConfig,
                                  payment: {
                                    ...localConfig.payment,
                                    stripe: {
                                      ...localConfig.payment.stripe,
                                      enabled: e.target.checked
                                    }
                                  }
                                })}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                              />
                              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Test Mode</span>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input
                                type="checkbox"
                                checked={localConfig.payment.stripe.testMode}
                                onChange={(e) => setLocalConfig({
                                  ...localConfig,
                                  payment: {
                                    ...localConfig.payment,
                                    stripe: {
                                      ...localConfig.payment.stripe,
                                      testMode: e.target.checked
                                    }
                                  }
                                })}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                              />
                              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">PayPal</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Enable PayPal</span>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input
                                type="checkbox"
                                checked={localConfig.payment.paypal.enabled}
                                onChange={(e) => setLocalConfig({
                                  ...localConfig,
                                  payment: {
                                    ...localConfig.payment,
                                    paypal: {
                                      ...localConfig.payment.paypal,
                                      enabled: e.target.checked
                                    }
                                  }
                                })}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                              />
                              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Test Mode</span>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input
                                type="checkbox"
                                checked={localConfig.payment.paypal.testMode}
                                onChange={(e) => setLocalConfig({
                                  ...localConfig,
                                  payment: {
                                    ...localConfig.payment,
                                    paypal: {
                                      ...localConfig.payment.paypal,
                                      testMode: e.target.checked
                                    }
                                  }
                                })}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                              />
                              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Security Settings */}
                {activeSection === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Test Mode</span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={localConfig.security.testMode}
                            onChange={(e) => setLocalConfig({
                              ...localConfig,
                              security: {
                                ...localConfig.security,
                                testMode: e.target.checked
                              }
                            })}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Session Timeout (seconds)</label>
                        <input
                          type="number"
                          value={localConfig.security.auth.sessionTimeout}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            security: {
                              ...localConfig.security,
                              auth: {
                                ...localConfig.security.auth,
                                sessionTimeout: parseInt(e.target.value)
                              }
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Max Login Attempts</label>
                        <input
                          type="number"
                          value={localConfig.security.auth.maxLoginAttempts}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            security: {
                              ...localConfig.security,
                              auth: {
                                ...localConfig.security.auth,
                                maxLoginAttempts: parseInt(e.target.value)
                              }
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}