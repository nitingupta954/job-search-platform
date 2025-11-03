import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useSearchStore } from '../store/useSearchStore';
import { SearchFilterBar } from '../components/dashboard/SearchFilterBar';
import { JobCard } from '../components/dashboard/JobCard';
import { UsageBanner } from '../components/dashboard/UsageBanner';
import { JobResultsSkeleton } from '../components/dashboard/JobResultsSkeleton';
import { EmptyState } from '../components/shared/EmptyState';
import { Search, Briefcase, Sparkles } from 'lucide-react';
import type { Job, SearchParams } from '../types';
import { jobsService } from '../api/jobs';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { user, usage } = useAuthStore();
  const { jobs, hasSearched, setHasSearched, setJobs } = useSearchStore();
  const [isSearching, setIsSearching] = useState(false);
  const totalResults = jobs.length;

  const handleSearch = async (params: SearchParams) => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      const response = await jobsService.searchJobs(params);
      if (response && response.success && response.data) {
        setJobs(response.data);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error('Failed to search jobs:', error);
      setJobs([]);
    } finally {
      setIsSearching(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className={styles.container}>
      {/* Welcome Header */}
      <div className={styles.welcomeHeader}>
        <div className={styles.welcomeLeft}>
          <h1 className={styles.welcomeTitle}>
            {getGreeting()}, <span className={styles.userName}>{firstName}</span> 👋
          </h1>
          <p className={styles.welcomeSubtitle}>Here's your job search command center.</p>
        </div>
        {usage && (
          <div className={styles.quickStats}>
            <div className={styles.statCard}>
              <Briefcase size={18} className={styles.statCardIcon} />
              <div>
                <div className={styles.statCardValue}>{totalResults || 0}</div>
                <div className={styles.statCardLabel}>Jobs Found</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <Search size={18} className={styles.statCardIcon} />
              <div>
                <div className={styles.statCardValue}>{usage.used}</div>
                <div className={styles.statCardLabel}>Searches Used</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <UsageBanner />
      <SearchFilterBar onSearch={handleSearch} isLoading={isSearching} disabled={false} />

      {isSearching ? (
        <JobResultsSkeleton />
      ) : jobs.length > 0 ? (
        <>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              <Sparkles size={18} className={styles.resultsIcon} />
              {totalResults} {totalResults === 1 ? 'result' : 'results'} found
            </h2>
          </div>
          <div className={styles.jobGrid}>
            {jobs.map((job: Job, index: number) => (
              <JobCard key={`${job.job_url}-${index}`} job={job} />
            ))}
          </div>
        </>
      ) : hasSearched ? (
        <EmptyState 
          icon={<Search />}
          title="No results found"
          description="Try broadening your search terms, changing the location, or selecting different platforms."
        />
      ) : (
        <div className={styles.initialState}>
          <div className={styles.initialIcon}>
            <Search size={32} />
          </div>
          <h2 className={styles.initialTitle}>Ready to find your next role?</h2>
          <p className={styles.initialSubtitle}>
            Enter a job title and location above to start scraping across LinkedIn, Indeed, ZipRecruiter, and Google Jobs.
          </p>
        </div>
      )}
    </div>
  );
}
