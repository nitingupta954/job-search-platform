import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import styles from './LandingCTA.module.css';

export const LandingCTA = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className={styles.ctaCard}
        >
          {/* Animated Background */}
          <div className={styles.gridPattern}></div>
          
          <div className={styles.content}>
            <div className={styles.badge}>
              <Sparkles size={14} /> LIMITED TIME — FREE TRIAL
            </div>
            <h2 className={styles.title}>Your Dream Job Won't Find Itself</h2>
            <p className={styles.subtitle}>
              Join 2,100+ professionals already using JobHarvest to get ahead of the competition. Start scraping in under 60 seconds.
            </p>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Enter your email" className={styles.emailInput} />
              <Link to="/login" className={styles.btn}>
                Start for free
              </Link>
            </div>
            <p className={styles.disclaimer}>No credit card required · Cancel anytime</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
