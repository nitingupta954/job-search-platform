import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UsageStats } from '../types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  usage: UsageStats | null;
  setSession: (user: User, accessToken: string) => void;
  clearSession: () => void;
  setUsage: (usage: UsageStats) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      usage: null,
      setSession: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
      clearSession: () => set({ user: null, accessToken: null, isAuthenticated: false, usage: null }),
      setUsage: (usage) => set({ usage }),
    }),
    {
      name: 'auth-storage',
      // Persist the entire session so users stay logged in across page reloads
    }
  )
);
