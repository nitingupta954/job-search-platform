import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { paymentsService } from '../../api/payments';
import type { Plan } from '../../types';
import { Spinner } from '../shared/Spinner';
import styles from './PricingPreview.module.css';

export const PricingPreview = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await paymentsService.getPlans();
        setPlans(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load plans', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className={styles.header}
        >
          <div className={styles.sectionBadge}>PRICING</div>
          <h2 className={styles.title}>Simple, transparent pricing</h2>
          <p className={styles.subtitle}>Start free. Upgrade when you need more power.</p>
        </motion.div>

        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.cardsRow}>
            {plans.map((plan, i) => (
              <motion.div 
                key={plan.id} 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${styles.card} ${i === 1 ? styles.popularCard : ''}`}
              >
                {i === 1 && <div className={styles.popularBadge}>MOST POPULAR</div>}
                
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.price}>{plan.price_inr}</span>
                  <span className={styles.interval}>/mo</span>
                </div>
                
                <p className={styles.planDesc}>
                  {i === 0 ? 'Perfect for getting started with AI job search.' : 
                   i === 1 ? 'For serious job hunters who want every edge.' : 
                   'Maximum power for career accelerators.'}
                </p>
                
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <Check size={16} className={styles.checkIcon} />
                    <span><strong>{plan.monthly_search_limit}</strong> searches / month</span>
                  </li>
                  <li className={styles.featureItem}>
                    <Check size={16} className={styles.checkIcon} />
                    <span>Real-time scraping</span>
                  </li>
                  <li className={styles.featureItem}>
                    <Check size={16} className={styles.checkIcon} />
                    <span>{i === 0 ? '4 platforms' : 'Priority support'}</span>
                  </li>
                  {i >= 1 && (
                    <li className={styles.featureItem}>
                      <Check size={16} className={styles.checkIcon} />
                      <span>AI skill matching</span>
                    </li>
                  )}
                </ul>
                
                <Link to="/pricing" className={`${styles.actionBtn} ${i === 1 ? styles.primaryBtn : ''}`}>
                  {i === 0 ? 'Get Started' : 'Start Free Trial'}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className={styles.footerLink}>
          <Link to="/pricing">
            Compare all features <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
