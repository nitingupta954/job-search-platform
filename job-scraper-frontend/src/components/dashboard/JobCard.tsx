import { MapPin, Calendar, ExternalLink, Globe, DollarSign, Building, Bookmark } from 'lucide-react';
import type { Job } from '../../types';
import { useBookmarksStore } from '../../store/useBookmarksStore';
import styles from './JobCard.module.css';

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const getInitial = (name: string) => name ? name.charAt(0).toUpperCase() : 'C';
  const { bookmarkedJobs, toggleBookmark } = useBookmarksStore();
  const isBookmarked = !!bookmarkedJobs[job.job_url];
  
  // Format the date robustly
  let formattedDate = job.date_posted || 'Recently';
  if (job.date_posted) {
    const parsed = new Date(job.date_posted);
    if (!isNaN(parsed.getTime())) {
      // Valid date
      const diffTime = Math.abs(new Date().getTime() - parsed.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) formattedDate = 'Today';
      else if (diffDays === 1) formattedDate = 'Yesterday';
      else if (diffDays < 7) formattedDate = `${diffDays} days ago`;
      else formattedDate = parsed.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }

  // Generate a consistent pastel background color based on company name
  const getCardBgColor = (name: string) => {
    const colors = [
      'var(--pastel-blue)', 
      'var(--pastel-mint)', 
      'var(--pastel-pink)', 
      'var(--pastel-purple)', 
      'var(--pastel-grey)', 
      'var(--pastel-peach)'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const cardBg = getCardBgColor(job.company || 'Company');
  const isRemote = job.remote === true || String(job.remote).toLowerCase() === 'true';

  return (
    <div className={styles.card} style={{ backgroundColor: cardBg }}>
      <div className={styles.header}>
        <div className={styles.companyLogo}>
          {getInitial(job.company)}
        </div>
        <div className={styles.titleArea}>
          <h3 className={styles.jobTitle} title={job.job_title}>{job.job_title}</h3>
          <div className={styles.company}>{job.company}</div>
        </div>
        <button 
          className={`${styles.bookmarkButton} ${isBookmarked ? styles.bookmarked : ''}`}
          onClick={() => toggleBookmark(job)}
          title={isBookmarked ? "Remove from saved jobs" : "Save job"}
        >
          <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className={styles.tags}>
        {isRemote ? (
          <span className={`${styles.tag} ${styles.remote}`}>
            <Globe size={12} /> Remote
          </span>
        ) : job.location ? (
          <span className={`${styles.tag} ${styles.location}`}>
            <MapPin size={12} /> {job.location}
          </span>
        ) : null}
        
        {job.salary && job.salary !== 'N/A' && (
          <span className={`${styles.tag} ${styles.salary}`}>
            <DollarSign size={12} /> {job.salary}
          </span>
        )}
        
        {job.job_type && job.job_type !== 'N/A' && (
          <span className={`${styles.tag} ${styles.type}`}>
            <Building size={12} /> {job.job_type.split(',')[0]}
          </span>
        )}
      </div>
      
      <div className={styles.footer}>
        <div className={styles.footerInfo}>
          <div className={styles.source}>
            via <span className={styles.sourceSite}>{job.source_site || 'Web'}</span>
          </div>
          <div className={styles.date}>
            <Calendar size={12} /> {formattedDate}
          </div>
        </div>
        
        <div className={styles.footerActions}>
          <button className={styles.detailsBtn}>Details</button>
          <a 
            href={job.job_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.applyBtn}
          >
            Apply Now <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};
