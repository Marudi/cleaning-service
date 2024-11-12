import { z } from 'zod';

export interface User {
  id: string;
  email: string;
  role: 'superadmin' | 'admin' | 'accounting' | 'frontdesk' | 'cleaner';
  name: string;
}

// Mock users for development
const mockUsers: User[] = [
  {
    id: '0',
    email: 'superadmin@imaryza.com',
    role: 'superadmin',
    name: 'Super Admin'
  },
  {
    id: '1',
    email: 'admin@imaryza.com',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'accounting@imaryza.com',
    role: 'accounting',
    name: 'Accounting User'
  },
  {
    id: '3',
    email: 'frontdesk@imaryza.com',
    role: 'frontdesk',
    name: 'Front Desk User'
  },
  {
    id: '4',
    email: 'cleaner@imaryza.com',
    role: 'cleaner',
    name: 'Cleaner User'
  }
];

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export type LoginData = z.infer<typeof loginSchema>;

export async function login(email: string, password: string): Promise<User | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = mockUsers.find(u => u.email === email);
  if (!user) return null;

  // For development, accept any password
  return user;
}

export async function checkAuth(): Promise<User | null> {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;

  try {
    const user = JSON.parse(storedUser) as User;
    // Validate user object structure
    if (!user.id || !user.email || !user.role || !user.name) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

export function logout(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}