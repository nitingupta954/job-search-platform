import { useState } from 'react';
import { Search, MapPin, Clock, Globe } from 'lucide-react';
import styles from './SearchFilterBar.module.css';
import type { SearchParams } from '../../types';

interface SearchFilterBarProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
  disabled: boolean;
}

export const SearchFilterBar = ({ onSearch, isLoading, disabled }: SearchFilterBarProps) => {
  const [term, setTerm] = useState(() => localStorage.getItem('default_term') || '');
  const [location, setLocation] = useState(() => localStorage.getItem('default_location') || '');
  const [hoursOld, setHoursOld] = useState(() => localStorage.getItem('default_hours_old') || '72');
  const [platform, setPlatform] = useState(() => localStorage.getItem('default_platform') || 'all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !location.trim()) return;
    
    onSearch({
      search_terms: [term.trim()],
      locations: [location.trim()],
      hours_old: parseInt(hoursOld),
      results_wanted: 15,
      ...(platform !== 'all' ? { site_names: [platform] } : {})
    });
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchBarInner}>
        
        {/* ROW 1 */}
        <div className={styles.searchRow}>
          {/* Keywords */}
          <div className={styles.fieldGroup}>
            <div className={styles.iconWrapper}>
              <Search size={18} />
            </div>
            <div className={styles.inputContainer}>
              <label>What</label>
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className={styles.input}
                disabled={disabled || isLoading}
                required
              />
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Location */}
          <div className={styles.fieldGroup}>
            <div className={styles.iconWrapper}>
              <MapPin size={18} />
            </div>
            <div className={styles.inputContainer}>
              <label>Where</label>
              <input
                type="text"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
                disabled={disabled || isLoading}
                required
              />
            </div>
          </div>

          {/* Spacer to align with Search button below */}
          <div className={styles.actionGroupSpacer}></div>
        </div>

        <div className={styles.horizontalDivider}></div>

        {/* ROW 2 */}
        <div className={styles.searchRow}>
          {/* Date Filter */}
          <div className={styles.fieldGroup}>
            <div className={styles.iconWrapper}>
              <Clock size={18} />
            </div>
            <div className={styles.inputContainer}>
              <label>When</label>
              <select 
                value={hoursOld} 
                onChange={(e) => setHoursOld(e.target.value)}
                className={styles.select}
                disabled={disabled || isLoading}
              >
                <option value="24">Past 24 hours</option>
                <option value="72">Past 3 days</option>
                <option value="168">Past 7 days</option>
                <option value="336">Past 14 days</option>
              </select>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Platform / Site */}
          <div className={styles.fieldGroup}>
            <div className={styles.iconWrapper}>
              <Globe size={18} />
            </div>
            <div className={styles.inputContainer}>
              <label>Platform</label>
              <select 
                value={platform} 
                onChange={(e) => setPlatform(e.target.value)}
                className={styles.select}
                disabled={disabled || isLoading}
              >
                <option value="all">All Platforms</option>
                <option value="linkedin">LinkedIn</option>
                <option value="indeed">Indeed</option>
                <option value="zip_recruiter">ZipRecruiter</option>
                <option value="google">Google</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className={styles.actionGroup}>
            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={disabled || isLoading || !term.trim() || !location.trim()}
            >
              {isLoading ? (
                <span className={styles.loader}></span>
              ) : (
                <>
                  <Search size={20} />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </form>
  );
};
