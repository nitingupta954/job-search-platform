import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css'; 

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Newsletter Row */}
      <div className={styles.newsletterRow}>
        <div className={styles.newsletterContainer}>
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>Stay ahead of the market</h3>
            <p className={styles.newsletterSubtitle}>Get weekly insights on job trends and hiring patterns.</p>
          </div>
          <div className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className={styles.emailInput}
              aria-label="Email address for newsletter"
            />
            <button className={styles.subscribeBtn}>
              Subscribe <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.gridSection}>
          {/* Brand Column */}
          <div className={styles.brandColumn}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIconWrapper}>
                <Briefcase size={16} />
              </div>
              <span className={styles.logoText}>JobHarvest</span>
            </Link>
            <p className={styles.brandDescription}>
              AI-powered job discovery engine. Scraping 4+ platforms in real-time to find your next career move.
            </p>
          </div>

          {/* Product Column */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Product</h4>
            <a href="/#features" className={styles.link}>Features</a>
            <Link to="/pricing" className={styles.link}>Pricing</Link>
            <Link to="/dashboard" className={styles.link}>Dashboard</Link>
            <Link to="/saved-jobs" className={styles.link}>Saved Jobs</Link>
          </div>

        </div>
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} JobHarvest Inc. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Built with ❤️ for job seekers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};
