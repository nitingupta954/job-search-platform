import { create } from 'zustand';
import { bookmarksService } from '../api/bookmarks';
import type { Job } from '../types';
import { useToastStore } from './useToastStore';

interface BookmarksState {
  // Map of job_url -> bookmark_id for fast O(1) lookup on JobCard
  bookmarkedJobs: Record<string, string>;
  isHydrating: boolean;
  
  // Actions
  hydrateBookmarks: () => Promise<void>;
  toggleBookmark: (job: Job) => Promise<void>;
  removeBookmarkById: (bookmarkId: string, jobUrl: string) => Promise<void>;
}

export const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarkedJobs: {},
  isHydrating: false,
  
  hydrateBookmarks: async () => {
    set({ isHydrating: true });
    try {
      // Fetch all bookmarks to populate the local cache
      // Note: If users have thousands of bookmarks, we might need a more optimized approach,
      // but for now, fetching the first 500 should be sufficient for hydration.
      const response = await bookmarksService.getBookmarks(1, 100);
      
      const newMap: Record<string, string> = {};
      response.bookmarks.forEach(bm => {
        newMap[bm.job_url] = bm.id;
      });
      
      set({ bookmarkedJobs: newMap });
    } catch (error) {
      console.error('Failed to hydrate bookmarks', error);
    } finally {
      set({ isHydrating: false });
    }
  },
  
  toggleBookmark: async (job: Job) => {
    const { bookmarkedJobs } = get();
    const isBookmarked = !!bookmarkedJobs[job.job_url];
    const { addToast } = useToastStore.getState();
    
    if (isBookmarked) {
      // Remove
      const bookmarkId = bookmarkedJobs[job.job_url];
      
      // Optimistic update
      const newMap = { ...bookmarkedJobs };
      delete newMap[job.job_url];
      set({ bookmarkedJobs: newMap });
      
      try {
        await bookmarksService.removeBookmark(bookmarkId);
        addToast('Job removed from saved jobs', 'info');
      } catch {
        // Revert on error
        set({ bookmarkedJobs });
        addToast('Failed to remove bookmark', 'error');
      }
    } else {
      // Optimistically add with a temporary ID so UI updates instantly
      const tempId = `temp_${Date.now()}`;
      set({ bookmarkedJobs: { ...bookmarkedJobs, [job.job_url]: tempId } });
      
      try {
        const savedBookmark = await bookmarksService.addBookmark(job);
        // Replace temp ID with real ID
        const updatedMap = { ...get().bookmarkedJobs };
        updatedMap[job.job_url] = savedBookmark.id;
        set({ bookmarkedJobs: updatedMap });
        addToast('Job saved successfully', 'success');
      } catch (error: any) {
        // Revert on error
        const revertedMap = { ...get().bookmarkedJobs };
        delete revertedMap[job.job_url];
        set({ bookmarkedJobs: revertedMap });
        
        if (error.response?.status === 409) {
          addToast('Job is already saved', 'info');
        } else {
          addToast('Failed to save job', 'error');
        }
      }
    }
  },
  
  removeBookmarkById: async (bookmarkId: string, jobUrl: string) => {
    const { bookmarkedJobs } = get();
    const newMap = { ...bookmarkedJobs };
    delete newMap[jobUrl];
    set({ bookmarkedJobs: newMap });
    
    try {
      await bookmarksService.removeBookmark(bookmarkId);
      useToastStore.getState().addToast('Job removed from saved jobs', 'info');
    } catch {
      set({ bookmarkedJobs }); // Revert
      useToastStore.getState().addToast('Failed to remove bookmark', 'error');
    }
  }
}));
