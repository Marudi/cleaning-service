import { mockConfig } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchChatConfig() {
  try {
    const response = await fetch(`${API_URL}/chat/config`);
    
    if (!response.ok) {
      console.log('Using mock chat config');
      return mockConfig.chatbot;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Using mock chat config');
    return mockConfig.chatbot;
  }
}

export async function sendMessage(message: string) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.log('Using mock response');
    return {
      response: "I'm currently in offline mode. Please try again later."
    };
  }
}

export async function updateChatConfig(config: typeof mockConfig.chatbot) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('No token found, using mock data');
    return mockConfig.chatbot;
  }

  try {
    const response = await fetch(`${API_URL}/chat/config`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });

    if (!response.ok) {
      throw new Error('Failed to update chat configuration');
    }

    return await response.json();
  } catch (error) {
    console.log('Failed to update config, using mock data');
    return mockConfig.chatbot;
  }
}