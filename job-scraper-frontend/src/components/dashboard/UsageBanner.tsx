import { AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import styles from './UsageBanner.module.css';

export const UsageBanner = () => {
  const usage = useAuthStore((state) => state.usage);

  if (!usage) return null;

  const percentage = (usage.used / usage.limit) * 100;
  const isNearLimit = percentage >= 80;
  const isExhausted = usage.used >= usage.limit;

  if (isExhausted) {
    return (
      <div className={`${styles.banner} ${styles.exhausted}`}>
        <div className={styles.content}>
          <AlertCircle size={20} className={styles.icon} />
          <div>
            <strong>You've reached your monthly search limit.</strong> Upgrade your plan to continue discovering jobs.
          </div>
        </div>
        <Link to="/pricing" className={styles.upgradeBtn}>Upgrade Plan</Link>
      </div>
    );
  }

  if (isNearLimit) {
    return (
      <div className={`${styles.banner} ${styles.warning}`}>
        <div className={styles.content}>
          <AlertCircle size={20} className={styles.icon} />
          <div>
            <strong>Running low on searches.</strong> You have {usage.remaining} left out of {usage.limit} this month.
          </div>
        </div>
        <Link to="/pricing" className={styles.upgradeBtnOutline}>Upgrade Plan</Link>
      </div>
    );
  }

  return null;
};
