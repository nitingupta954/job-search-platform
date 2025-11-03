import { apiClient } from './client';
import type { Job } from '../types';

export interface BookmarkedJob extends Job {
  id: string;
  notes?: string;
  created_at: string;
}

export interface BookmarksResponse {
  bookmarks: BookmarkedJob[];
  total: number;
  page: number;
  totalPages: number;
}

export const bookmarksService = {
  getBookmarks: async (page: number = 1, limit: number = 20): Promise<BookmarksResponse> => {
    const { data } = await apiClient.get<BookmarksResponse>('/api/jobs/bookmarks', {
      params: { page, limit }
    });
    return data;
  },

  addBookmark: async (job: Job): Promise<BookmarkedJob> => {
    // We send a snapshot of the job to the backend
    const { data } = await apiClient.post<BookmarkedJob>('/api/jobs/bookmarks', {
      job_url: job.job_url,
      title: job.job_title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      job_type: job.job_type,
      source_site: job.source_site,
      // Pass empty array if tags are needed, backend expects optional tags
      tags: [], 
    });
    return data;
  },

  removeBookmark: async (bookmarkId: string): Promise<void> => {
    await apiClient.delete(`/api/jobs/bookmarks/${bookmarkId}`);
  },

  updateBookmarkNote: async (bookmarkId: string, notes: string): Promise<BookmarkedJob> => {
    const { data } = await apiClient.patch<BookmarkedJob>(`/api/jobs/bookmarks/${bookmarkId}`, { notes });
    return data;
  }
};
