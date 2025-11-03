import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../api/auth';
import { Briefcase, User, LogOut, Settings, Menu, X, Bookmark } from 'lucide-react';
import { Modal } from '../shared/Modal';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { isAuthenticated, user, usage, clearSession } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.error('Logout failed:', e);
    } finally {
      clearSession();
      setIsLogoutModalOpen(false);
      navigate('/');
      setIsMobileMenuOpen(false);
    }
  };

  const navClass = `${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isLanding && !scrolled ? styles.transparent : ''}`;

  return (
    <nav className={navClass}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIconWrapper}>
            <Briefcase size={18} className={styles.logoIcon} />
          </div>
          <span className={styles.logoText}>JobHarvest</span>
        </Link>
        
        {/* Desktop Links */}
        <div className={styles.desktopLinks}>
          <a href="/#features" className={styles.navLink}>Features</a>
          <Link to="/pricing" className={styles.navLink}>Pricing</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
              <Link to="/saved-jobs" className={styles.navLink}>
                <Bookmark size={16} /> Saved
              </Link>
              {usage && (
                <div className={styles.usagePill}>
                  <span className={styles.usageValue}>{usage.used}</span>
                  <span className={styles.usageSep}>/</span>
                  <span>{usage.limit}</span>
                </div>
              )}
              <div className={styles.avatarDropdown}>
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt="Profile" className={styles.avatarImg} />
                ) : (
                  <div className={styles.avatarPlaceholder}><User size={16} /></div>
                )}
                <div className={styles.dropdownMenu}>
                  <Link to="/settings" className={styles.dropdownItem}>
                    <Settings size={15} /> Settings
                  </Link>
                  <button onClick={() => setIsLogoutModalOpen(true)} className={styles.dropdownItem}>
                    <LogOut size={15} /> Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className={styles.primaryBtn}>
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className={styles.mobileMenuBtn} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <a href="/#features" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
          Features
        </a>
        <Link to="/pricing" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
          Pricing
        </Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </Link>
            <Link to="/saved-jobs" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Saved Jobs
            </Link>
            <Link to="/settings" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Settings
            </Link>
            {usage && (
              <div className={styles.mobileUsage}>
                Searches: <strong>{usage.used}</strong> / {usage.limit}
              </div>
            )}
            <button onClick={() => setIsLogoutModalOpen(true)} className={styles.mobileLogoutBtn}>
              <LogOut size={18} /> Sign out
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.mobilePrimaryBtn} onClick={() => setIsMobileMenuOpen(false)}>
            Get Started Free
          </Link>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <Modal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        title="Sign Out"
      >
        <p className={styles.modalText}>Are you sure you want to sign out of your account?</p>
        <div className={styles.modalActions}>
          <button 
            className={styles.modalCancelBtn} 
            onClick={() => setIsLogoutModalOpen(false)}
          >
            Cancel
          </button>
          <button 
            className={styles.modalConfirmBtn} 
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </Modal>
    </nav>
  );
};
