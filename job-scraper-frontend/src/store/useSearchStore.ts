import { create } from 'zustand';
import type { Job } from '../types';

interface SearchState {
  jobs: Job[];
  hasSearched: boolean;
  setJobs: (jobs: Job[]) => void;
  setHasSearched: (searched: boolean) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  jobs: [],
  hasSearched: false,
  setJobs: (jobs) => set({ jobs }),
  setHasSearched: (searched) => set({ hasSearched: searched }),
}));
