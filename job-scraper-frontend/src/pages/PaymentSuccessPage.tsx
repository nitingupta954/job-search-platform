import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import styles from './PaymentSuccessPage.module.css';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  // Auto-redirect after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <CheckCircle size={48} />
        </div>
        <div className={styles.confettiDot} style={{ top: '10%', left: '15%', animationDelay: '0s' }} />
        <div className={styles.confettiDot} style={{ top: '20%', right: '20%', animationDelay: '0.3s' }} />
        <div className={styles.confettiDot} style={{ bottom: '25%', left: '25%', animationDelay: '0.6s' }} />
        <div className={styles.confettiDot} style={{ bottom: '15%', right: '15%', animationDelay: '0.9s' }} />
        
        <h1 className={styles.title}>Payment Successful!</h1>
        <p className={styles.subtitle}>
          Welcome to the premium experience. Your account has been upgraded and you now have access to all pro features.
        </p>
        
        <div className={styles.nextSteps}>
          <h3 className={styles.nextStepsTitle}><Sparkles size={16} /> What's next?</h3>
          <ul className={styles.stepsList}>
            <li>Your search limit has been increased</li>
            <li>Priority scraping is now active</li>
            <li>AI skill matching is enabled</li>
          </ul>
        </div>
        
        <Link to="/dashboard" className={styles.btn}>
          Go to Dashboard <ArrowRight size={18} />
        </Link>
        <p className={styles.autoRedirect}>Redirecting to dashboard in a few seconds...</p>
      </div>
    </div>
  );
}
