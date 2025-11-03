import { apiClient } from './client';
import type { AuthResponse, User } from '../types';

export const authService = {
  googleSignIn: async (idToken: string): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/api/auth/google', { id_token: idToken });
    return data;
  },
  
  logout: async (): Promise<{ detail: string }> => {
    const { data } = await apiClient.post<{ detail: string }>('/api/auth/logout');
    return data;
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<User>('/api/auth/me');
    return data;
  }
};
