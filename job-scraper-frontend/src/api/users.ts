import { apiClient } from './client';
import type { UsageStats } from '../types';

export const usersService = {
  getUsage: async (): Promise<UsageStats> => {
    const { data } = await apiClient.get<UsageStats>('/api/users/me/usage');
    return data;
  }
};
