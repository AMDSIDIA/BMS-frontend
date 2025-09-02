'use client';

import { useState, useEffect, useCallback } from 'react';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false
  });

  useEffect(() => {
    // Récupérer le token depuis localStorage au chargement
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setAuthState({
        token,
        user: JSON.parse(user),
        isAuthenticated: true
      });
    }
  }, []);

  const login = useCallback((token: string, user: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    setAuthState({
      token,
      user,
      isAuthenticated: true
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false
    });
  }, []);

  const updateToken = useCallback((newToken: string) => {
    localStorage.setItem('token', newToken);
    
    setAuthState(prev => ({
      ...prev,
      token: newToken
    }));
  }, []);

  return {
    ...authState,
    login,
    logout,
    updateToken
  };
};
