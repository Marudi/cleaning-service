import { SystemConfig } from '../../contexts/ConfigContext';
import { mockConfig } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchConfig(): Promise<SystemConfig> {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('No token found, using mock data');
    return mockConfig;
  }

  try {
    const response = await fetch(`${API_URL}/config`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch configuration');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Failed to fetch config, using mock data');
    return mockConfig;
  }
}

export async function updateConfig(config: SystemConfig): Promise<SystemConfig> {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('No token found, using mock data');
    return mockConfig;
  }

  try {
    const response = await fetch(`${API_URL}/config`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });

    if (!response.ok) {
      throw new Error('Failed to update configuration');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Failed to update config, using mock data');
    return mockConfig;
  }
}