import { apiClient } from './client';
import type { SearchParams, SearchResponse } from '../types';

export const jobsService = {
  searchJobs: async (params: SearchParams): Promise<SearchResponse> => {
    const { data } = await apiClient.post<SearchResponse>('/api/jobs/search', params);
    return data;
  }
};
