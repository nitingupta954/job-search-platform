import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import styles from './SocialProof.module.css';

const testimonials = [
  {
    quote: "JobHarvest surfaced a role at a Series-B startup that wasn't even on LinkedIn yet. I applied first and got the offer within a week.",
    author: "Sarah Jennings",
    role: "Senior Full-Stack Developer",
    company: "Now at Stripe",
    rating: 5,
  },
  {
    quote: "The precision filtering is insane. I set 'Remote + React + $130k+' and only got relevant hits. No more sifting through garbage.",
    author: "Michael Torres",
    role: "Data Scientist",
    company: "Now at Airbnb",
    rating: 5,
  },
  {
    quote: "As someone relocating from India to the US, the visa sponsorship filter alone was worth the subscription. Saved me months.",
    author: "Priya Sharma",
    role: "ML Engineer",
    company: "Now at Google",
    rating: 5,
  },
];

const companyNames = ['Google', 'Meta', 'Stripe', 'Airbnb', 'Netflix', 'Uber', 'Shopify'];

export const SocialProof = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Big Stat */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className={styles.bigStat}
        >
          <div className={styles.bigStatNumber}>12,000+</div>
          <div className={styles.bigStatLabel}>offers received through JobHarvest by our users</div>
        </motion.div>

        {/* Company Logos */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={styles.logoBar}
        >
          <span className={styles.logoBarLabel}>Trusted by engineers at</span>
          <div className={styles.companyNames}>
            {companyNames.map((name) => (
              <span key={name} className={styles.companyName}>{name}</span>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className={styles.header}
        >
          <div className={styles.sectionBadge}>TESTIMONIALS</div>
          <h2 className={styles.title}>Loved by job seekers worldwide</h2>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12 }}
              className={styles.card}
            >
              <Quote size={24} className={styles.quoteIcon} />
              <div className={styles.stars}>
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={15} fill="currentColor" />
                ))}
              </div>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.authorInfo}>
                <div className={styles.avatar}>
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className={styles.author}>{t.author}</div>
                  <div className={styles.role}>{t.role}</div>
                  <div className={styles.company}>{t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
