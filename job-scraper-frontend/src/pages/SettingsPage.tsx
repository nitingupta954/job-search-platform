import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { authService } from '../api/auth';
import { User, Activity, CreditCard, LogOut, Sliders } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const { user, usage, clearSession } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  // Scraper defaults state
  const [defaultTerm, setDefaultTerm] = useState('');
  const [defaultLocation, setDefaultLocation] = useState('');
  const [defaultHoursOld, setDefaultHoursOld] = useState('72');
  const [defaultPlatform, setDefaultPlatform] = useState('all');

  // Load preferences from localStorage on mount
  useEffect(() => {
    setDefaultTerm(localStorage.getItem('default_term') || '');
    setDefaultLocation(localStorage.getItem('default_location') || '');
    setDefaultHoursOld(localStorage.getItem('default_hours_old') || '72');
    setDefaultPlatform(localStorage.getItem('default_platform') || 'all');
  }, []);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('default_term', defaultTerm.trim());
    localStorage.setItem('default_location', defaultLocation.trim());
    localStorage.setItem('default_hours_old', defaultHoursOld);
    localStorage.setItem('default_platform', defaultPlatform);
    
    addToast('Search preferences saved successfully!', 'success');
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout failed on server', err);
    } finally {
      clearSession();
      addToast('Logged out successfully', 'info');
      navigate('/');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const usagePercent = usage ? (usage.used / usage.limit) * 100 : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Account Settings</h1>
        <p className={styles.subtitle}>Manage your profile, usage, and billing.</p>
      </div>

      <div className={styles.grid}>
        {/* Profile Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <User size={20} className={styles.icon} />
            </div>
            <h2 className={styles.cardTitle}>Profile Information</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Name</span>
              <span className={styles.value}>{user?.name}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Usage Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <Activity size={20} className={styles.icon} />
            </div>
            <h2 className={styles.cardTitle}>Current Usage</h2>
          </div>
          <div className={styles.cardBody}>
            {usage ? (
              <>
                <div className={styles.usageStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{usage.used}</span>
                    <span className={styles.statLabel}>Used</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{usage.remaining}</span>
                    <span className={styles.statLabel}>Remaining</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{usage.limit}</span>
                    <span className={styles.statLabel}>Limit</span>
                  </div>
                </div>
                
                <div className={styles.progressBarBg}>
                  <div 
                    className={`${styles.progressBarFill} ${usagePercent > 80 ? styles.progressBarDanger : ''}`}
                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                  ></div>
                </div>
                
                <div className={styles.resetInfo}>
                  Resets on {formatDate(usage.resets_on)}
                </div>
              </>
            ) : (
              <div>Loading usage...</div>
            )}
          </div>
        </div>

        {/* Plan Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <CreditCard size={20} className={styles.icon} />
            </div>
            <h2 className={styles.cardTitle}>Billing & Plan</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.planInfo}>
              <span className={styles.planName}>{usage?.plan_name || 'Free'} Plan</span>
              <span className={styles.planStatus}>Active</span>
            </div>
            <button 
              className={styles.upgradeBtn}
              onClick={() => navigate('/pricing')}
            >
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Scraper Defaults Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <Sliders size={20} className={styles.icon} />
            </div>
            <h2 className={styles.cardTitle}>Scraper Defaults</h2>
          </div>
          <div className={styles.cardBody}>
            <form onSubmit={handleSavePreferences} className={styles.preferencesForm}>
              <p className={styles.preferenceDescription}>
                Set your default search keywords, location, and platform to avoid typing them every time you use the search dashboard.
              </p>

              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="default-term">Default Keywords / Job Title</label>
                <input
                  id="default-term"
                  type="text"
                  placeholder="e.g., React Developer, Senior Manager"
                  value={defaultTerm}
                  onChange={(e) => setDefaultTerm(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="default-location">Default Location</label>
                <input
                  id="default-location"
                  type="text"
                  placeholder="e.g., Remote, San Francisco"
                  value={defaultLocation}
                  onChange={(e) => setDefaultLocation(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formFieldRow}>
                <div className={styles.formField}>
                  <label className={styles.formLabel} htmlFor="default-hours">Timeframe</label>
                  <select
                    id="default-hours"
                    value={defaultHoursOld}
                    onChange={(e) => setDefaultHoursOld(e.target.value)}
                    className={styles.select}
                  >
                    <option value="24">Past 24 hours</option>
                    <option value="72">Past 3 days</option>
                    <option value="168">Past week</option>
                    <option value="336">Past two weeks</option>
                  </select>
                </div>

                <div className={styles.formField}>
                  <label className={styles.formLabel} htmlFor="default-platform">Preferred Platform</label>
                  <select
                    id="default-platform"
                    value={defaultPlatform}
                    onChange={(e) => setDefaultPlatform(e.target.value)}
                    className={styles.select}
                  >
                    <option value="all">All Platforms</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="indeed">Indeed</option>
                    <option value="zip_recruiter">ZipRecruiter</option>
                    <option value="google">Google Jobs</option>
                  </select>
                </div>
              </div>

              <button type="submit" className={styles.saveBtn}>
                Save Preferences
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
