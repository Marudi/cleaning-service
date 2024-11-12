import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types/auth';
import { checkAuth } from '../auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: () => {},
  logout: () => {},
  refreshAuth: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const refreshAuth = async () => {
    try {
      setError(null);
      const user = await checkAuth();
      if (user) {
        setUser(user);
      } else {
        // If no user is returned but no error thrown, clear the state
        setUser(null);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
      setUser(null);
      // Clear any stored tokens
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/staff/login');
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Set up token expiration check
    const checkTokenInterval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.exp * 1000 < Date.now()) {
            logout();
          }
        } catch (e) {
          logout();
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkTokenInterval);
  }, []);

  // Redirect to login if there's an auth error
  useEffect(() => {
    if (error) {
      navigate('/staff/login');
    }
  }, [error, navigate]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    setUser,
    logout,
    refreshAuth
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {error ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};