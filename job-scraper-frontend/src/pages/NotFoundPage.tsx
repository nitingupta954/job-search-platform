import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.subtitle}>
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primaryBtn}>
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/dashboard" className={styles.secondaryBtn}>
            <Search size={18} /> Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
