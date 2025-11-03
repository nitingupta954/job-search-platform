import { Crosshair, Cpu, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './HowItWorks.module.css';

const steps = [
  {
    icon: <Crosshair size={28} />,
    number: '01',
    title: 'Define Your Criteria',
    description: 'Tell us what you want — role, location, salary range, and preferred platforms. Set it once; we remember it forever.',
    color: 'var(--color-primary)',
  },
  {
    icon: <Cpu size={28} />,
    number: '02',
    title: 'AI Scrapes & Matches',
    description: 'Our engine runs in real-time across LinkedIn, Indeed, ZipRecruiter & Google Jobs — scoring every listing against your exact profile.',
    color: 'var(--color-primary)',
  },
  {
    icon: <Rocket size={28} />,
    number: '03',
    title: 'Review & Apply First',
    description: 'Get a curated feed of top matches. Bookmark favorites, and apply directly — before the competition even sees the listing.',
    color: 'var(--color-primary)',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <div className={styles.sectionBadge}>HOW IT WORKS</div>
          <h2 className={styles.title}>Three steps. Zero effort.</h2>
          <p className={styles.subtitle}>From setup to your first matched role in under 60 seconds.</p>
        </motion.div>
        
        <div className={styles.stepsWrapper}>
          {/* Connecting Line */}
          <div className={styles.connectorLine} />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={styles.step}
            >
              <div className={styles.stepNumber} style={{ color: step.color }}>{step.number}</div>
              <div className={styles.iconWrapper} style={{ background: step.color }}>
                {step.icon}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
