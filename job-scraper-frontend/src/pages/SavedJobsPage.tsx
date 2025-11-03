import { useEffect, useState } from 'react';
import { BookmarkIcon } from 'lucide-react';
import { JobCard } from '../components/dashboard/JobCard';
import { bookmarksService } from '../api/bookmarks';
import type { BookmarkedJob } from '../api/bookmarks';
import { useBookmarksStore } from '../store/useBookmarksStore';
import { Spinner } from '../components/shared/Spinner';
import styles from './SavedJobsPage.module.css';

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState<BookmarkedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { bookmarkedJobs } = useBookmarksStore();

  useEffect(() => {
    fetchSavedJobs();
  }, []);
  
  // Re-fetch or filter jobs if the bookmarkedJobs map changes
  // This ensures that if a user un-bookmarks a job on this page, it disappears
  useEffect(() => {
    setJobs(prevJobs => prevJobs.filter(job => !!bookmarkedJobs[job.job_url]));
  }, [bookmarkedJobs]);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      // Fetch the first 100 for now, can implement pagination later
      const response = await bookmarksService.getBookmarks(1, 100);
      setJobs(response.bookmarks);
    } catch (error) {
      console.error('Failed to fetch saved jobs', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Saved Jobs</h1>
        <p className={styles.subtitle}>Keep track of your favorite opportunities.</p>
      </div>

      {loading ? (
        <Spinner />
      ) : jobs.length === 0 ? (
        <div className={styles.emptyState}>
          <BookmarkIcon size={48} className={styles.emptyIcon} />
          <h2 className={styles.emptyTitle}>No saved jobs yet</h2>
          <p className={styles.emptyText}>
            Bookmark jobs from your search results to keep track of them here. 
            They will stay saved even if the original listing expires.
          </p>
        </div>
      ) : (
        <div className={styles.jobsGrid}>
          {jobs.map(job => (
            <JobCard 
              key={job.id} 
              job={{
                job_url: job.job_url,
                job_title: job.job_title,
                company: job.company,
                location: job.location || '',
                salary: job.salary || '',
                job_type: job.job_type || '',
                source_site: job.source_site || '',
                date_posted: job.created_at,
                remote: false, // Infer based on location if needed, but not critical
                posted_via: '',
                description: ''
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
