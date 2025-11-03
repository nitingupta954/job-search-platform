import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { authService } from '../api/auth';
import { usersService } from '../api/users';
import { Briefcase, Search, Shield, Zap } from 'lucide-react';
import { Spinner } from '../components/shared/Spinner';
import styles from './LoginPage.module.css';

const features = [
  { icon: <Search size={20} />, text: 'Search 4+ platforms simultaneously' },
  { icon: <Zap size={20} />, text: 'Real-time AI-powered scraping' },
  { icon: <Shield size={20} />, text: 'Privacy-first, no data sharing' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, setSession, setUsage } = useAuthStore();
  const { addToast } = useToastStore();
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      addToast('Google Sign-In failed. Please try again.', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const authData = await authService.googleSignIn(credentialResponse.credential);
      setSession(authData.user, authData.access_token);
      
      try {
        const usageData = await usersService.getUsage();
        setUsage(usageData);
      } catch (usageErr) {
        console.error('Failed to fetch usage stats', usageErr);
      }
      
      addToast(`Welcome back, ${authData.user.name}!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      addToast('Authentication failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    addToast('Google Sign-In was unsuccessful.', 'error');
  };

  return (
    <div className={styles.container}>
      {/* Left Panel — Brand */}
      <div className={styles.leftPanel}>
        <div className={styles.leftGlow1} />
        <div className={styles.leftGlow2} />
        <div className={styles.leftContent}>
          <div className={styles.leftLogo}>
            <div className={styles.leftLogoIcon}>
              <Briefcase size={24} />
            </div>
            <span className={styles.leftLogoText}>JobHarvest</span>
          </div>
          <h2 className={styles.leftTitle}>Your next career move, <span className={styles.leftHighlight}>automated.</span></h2>
          <p className={styles.leftSubtitle}>Join thousands of professionals who found their dream roles faster with AI-powered job intelligence.</p>
          
          <div className={styles.featureList}>
            {features.map((f, i) => (
              <div key={i} className={styles.featureItem}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>Sign in to continue to your dashboard</p>
          </div>
          
          <div className={styles.authAction}>
            {loading ? (
              <Spinner />
            ) : (
              <div className={styles.googleBtnWrapper}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="outline"
                  size="large"
                  shape="rectangular"
                  text="signin_with"
                  width="320"
                />
              </div>
            )}
          </div>
          
          <div className={styles.footer}>
            <p>By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
