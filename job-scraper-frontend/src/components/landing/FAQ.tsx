import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: "How does the AI job scraping work?",
    answer: "Our engine connects to LinkedIn, Indeed, ZipRecruiter, and Google Jobs via their APIs and advanced scraping techniques. It uses NLP to extract exact requirements — compensation, remote policies, tech stack — and scores each listing against your profile in real-time."
  },
  {
    question: "How is this different from LinkedIn job alerts?",
    answer: "LinkedIn only shows you LinkedIn jobs. JobHarvest searches 4+ platforms simultaneously, deduplicates listings, and filters by criteria LinkedIn doesn't support — like exact salary ranges, visa sponsorship, and company size. Think of it as a meta-search engine purpose-built for job seekers."
  },
  {
    question: "Is there a limit to how many jobs I can find?",
    answer: "It depends on your plan. Free users get a generous allowance to experience the platform. Our Pro and Elite tiers offer higher search limits and faster refresh rates — designed for active job seekers who want to maximize their pipeline."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. We use Razorpay for secure payments, and you can cancel your recurring subscription at any time from your Account Settings with a single click. No lock-in contracts, no hidden fees."
  },
  {
    question: "Do you apply to jobs automatically for me?",
    answer: "Currently, we focus on discovery and matching — providing direct links so you can apply instantly. Automated applications are on our roadmap and will be available with our Pro tier in the near future."
  },
  {
    question: "Is my data safe? Do you sell my search history?",
    answer: "Never. We use Google OAuth for secure authentication and store minimal data. Your search queries and saved jobs are private — we don't sell, share, or monetize your data in any way. Period."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className={styles.header}
        >
          <div className={styles.sectionBadge}>FAQ</div>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>Everything you need to know about JobHarvest.</p>
        </motion.div>

        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.05 }}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
              >
                <button 
                  className={styles.questionBtn} 
                  onClick={() => toggleOpen(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.question}>{faq.question}</span>
                  <ChevronDown 
                    size={18} 
                    className={`${styles.chevron} ${isOpen ? styles.open : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={styles.answerWrapper}
                    >
                      <p className={styles.answer}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
