import styles from './SEOContent.module.css';

export const SEOContent = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>The Ultimate Job Searching Platform for Modern Professionals</h2>
          
          <p className={styles.paragraph}>
            In today's competitive market, relying on a single <strong>job searching platform</strong> is no longer enough. JobHarvest revolutionizes your career hunt by acting as an intelligent aggregator and AI job matcher. We scrape thousands of listings from LinkedIn, Indeed, ZipRecruiter, and Google Jobs in real-time, centralizing the entire process.
          </p>
          
          <h3 className={styles.subtitle}>Why JobHarvest is the Best Job Search Engine</h3>
          <p className={styles.paragraph}>
            Unlike traditional job boards, our AI-powered job discovery engine doesn't just show you lists of jobs. It understands your unique profile, skills, and salary expectations to deliver high-quality, matched opportunities directly to your dashboard. Whether you are looking for remote tech jobs, executive roles, or freelance opportunities, our automated job scraper ensures you never miss a posting.
          </p>

          <h3 className={styles.subtitle}>Automate Your Career Growth</h3>
          <p className={styles.paragraph}>
            Stop manually refreshing multiple browser tabs. By utilizing JobHarvest as your primary job searching platform, you gain access to intelligent filtering, real-time alerts, and market insights. Join thousands of job seekers who have streamlined their job hunt and accelerated their career growth using our state-of-the-art AI matching technology.
          </p>
        </div>
      </div>
    </section>
  );
};
