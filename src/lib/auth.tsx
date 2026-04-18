import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { storage } from './storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
  updateUserStats: (kg: number, points: number) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ecotrade_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    const users = storage.getUsers();
    const existingUser = users.find(u => u.email === email);
    if (!existingUser) throw new Error('User not found');
    
    setUser(existingUser);
    localStorage.setItem('ecotrade_current_user', JSON.stringify(existingUser));
  };

  const signup = async (name: string, email: string) => {
    const users = storage.getUsers();
    if (users.find(u => u.email === email)) throw new Error('Email already exists');
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      points: 0,
      level: 1,
      totalWasteRecycled: 0,
      carbonSaved: 0,
      joinDate: new Date().toISOString(),
    };
    
    storage.saveUser(newUser);
    setUser(newUser);
    localStorage.setItem('ecotrade_current_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecotrade_current_user');
  };

  const updateUserStats = (kg: number, points: number) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      totalWasteRecycled: user.totalWasteRecycled + kg,
      carbonSaved: user.carbonSaved + (kg * 1.5),
      points: user.points + points,
      level: Math.floor((user.points + points) / 100) + 1,
    };
    setUser(updatedUser);
    storage.saveUser(updatedUser);
    localStorage.setItem('ecotrade_current_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUserStats, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
