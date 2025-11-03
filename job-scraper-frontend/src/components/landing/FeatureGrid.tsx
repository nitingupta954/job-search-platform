import { Bot, Zap, Filter, LayoutDashboard, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styles from './FeatureGrid.module.css';

const features = [
  {
    icon: <Bot size={24} />,
    title: 'Autonomous AI Scraper',
    description: 'Our agents monitor thousands of job boards, career pages, and aggregators around the clock — surfacing hidden roles you\'d never find manually.',
    gradient: 'var(--color-primary)',
    featured: true,
  },
  {
    icon: <Filter size={24} />,
    title: 'Precision Filtering',
    description: 'Filter by visa sponsorship, remote policy, salary range, tech stack, company size, and more. Only see roles that actually match you.',
    gradient: 'var(--color-primary)',
  },
  {
    icon: <Zap size={24} />,
    title: 'Real-Time Alerts',
    description: 'Get notified the minute a matching role is posted. Early applicants are 40% more likely to get interviews.',
    gradient: 'var(--color-accent)',
  },
  {
    icon: <LayoutDashboard size={24} />,
    title: 'Application Pipeline',
    description: 'Bookmark roles, track application status, and keep your job search organized — all from one dashboard.',
    gradient: 'var(--color-primary)',
  },
  {
    icon: <Globe size={24} />,
    title: 'Multi-Platform Search',
    description: 'Simultaneously search LinkedIn, Indeed, ZipRecruiter, and Google Jobs. One search, four platforms, zero tab-switching.',
    gradient: 'var(--color-primary)',
  },
  {
    icon: <Shield size={24} />,
    title: 'Privacy First',
    description: 'Your data stays yours. We use Google OAuth for secure sign-in and never share your search history with third parties.',
    gradient: 'var(--color-primary)',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const FeatureGrid = () => {
  return (
    <section id="features" className={styles.featureSection}>
      <div className={styles.container}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={styles.header}
        >
          <motion.div variants={itemVariants} className={styles.sectionBadge}>FEATURES</motion.div>
          <motion.h2 variants={itemVariants} className={styles.title}>
            Everything you need to <span className={styles.titleAccent}>outpace the competition</span>
          </motion.h2>
          <motion.p variants={itemVariants} className={styles.subtitle}>
            Stop juggling 10 tabs. JobHarvest replaces your entire manual search workflow with a single AI-powered engine.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className={`${styles.card} ${feature.featured ? styles.featuredCard : ''}`}
            >
              <div className={styles.cardGlow} />
              <div className={styles.iconWrapper} style={{ background: feature.gradient }}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
