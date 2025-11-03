import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play, Briefcase, TrendingUp, Search, Bell, Settings, Bookmark, MapPin, DollarSign, Shield, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* Animated Background */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.bgGlow3} />
      <div className={styles.bgGrid} />

      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={styles.badge}
        >
          <Sparkles size={14} className={styles.sparkle} />
          <span>AI-POWERED JOB INTELLIGENCE</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className={styles.title}
        >
          Stop Scrolling Job Boards.{' '}
          <span className={styles.highlight}>Let AI Hunt For You.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className={styles.subtitle}
        >
          JobHarvest scrapes LinkedIn, Indeed, ZipRecruiter & Google Jobs in real-time — 
          filtering by your exact role, location, and salary expectations. Your next career move, delivered.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className={styles.ctaGroup}
        >
          <Link to="/login" className={styles.primaryCta}>
            Start Free Trial <ArrowRight size={18} />
          </Link>
          <a href="#how-it-works" className={styles.secondaryCta}>
            <Play size={16} /> See How It Works
          </a>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className={styles.trustBar}
        >
          <div className={styles.trustItem}>
            <Zap size={16} className={styles.trustIcon} />
            <span><strong>48,000+</strong> Jobs Scraped</span>
          </div>
          <div className={styles.trustDivider} />
          <div className={styles.trustItem}>
            <Users size={16} className={styles.trustIcon} />
            <span><strong>2,100+</strong> Active Users</span>
          </div>
          <div className={styles.trustDivider} />
          <div className={styles.trustItem}>
            <Shield size={16} className={styles.trustIcon} />
            <span><strong>4</strong> Platforms Covered</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className={styles.imageWrapper}
        >
          <div className={styles.mockupContainer}>
             <div className={styles.mockupHeader}>
               <div className={styles.dots}>
                 <span className={styles.dot}></span>
                 <span className={styles.dot}></span>
                 <span className={styles.dot}></span>
               </div>
               <div className={styles.mockupUrl}>app.jobharvest.ai</div>
             </div>
             
             <div className={styles.mockupBody}>
                <div className={styles.mockupSidebar}>
                  <div className={styles.sidebarItemActive}><Search size={16}/> Find Jobs</div>
                  <div className={styles.sidebarItem}><Bookmark size={16}/> Saved (12)</div>
                  <div className={styles.sidebarItem}><Bell size={16}/> Alerts</div>
                  <div className={styles.sidebarItem}><Settings size={16}/> Preferences</div>
                </div>
                
                <div className={styles.mockupMain}>
                  <div className={styles.mockupStatsRow}>
                    <div className={styles.mockupStatCard}>
                      <Briefcase size={20} className={styles.statIcon} />
                      <div>
                        <div className={styles.statValue}>1,204</div>
                        <div className={styles.statLabel}>Jobs Found</div>
                      </div>
                    </div>
                    <div className={styles.mockupStatCard}>
                      <TrendingUp size={20} className={`${styles.statIcon} ${styles.statIconGreen}`} />
                      <div>
                        <div className={styles.statValue}>98%</div>
                        <div className={styles.statLabel}>Match Rate</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.mockupGrid}>
                     {[
                       { role: 'Senior Frontend Engineer', company: 'TechNova', location: 'Remote', salary: '$140k - $160k', color: '#4F46E5', match: '99%' },
                       { role: 'Full Stack Developer', company: 'DataSphere', location: 'New York, NY', salary: '$130k - $150k', color: '#8B5CF6', match: '96%' },
                       { role: 'React Engineer', company: 'CloudBase', location: 'Remote', salary: '$120k - $145k', color: '#059669', match: '94%' },
                       { role: 'Software Engineer II', company: 'AI Labs', location: 'San Francisco', salary: '$150k - $180k', color: '#F59E0B', match: '91%' }
                     ].map((job, i) => (
                       <div key={i} className={styles.mockupJobCard}>
                         <div className={styles.jobLogoBadge} style={{ backgroundColor: job.color }}>
                           {job.company.charAt(0)}
                         </div>
                         <div className={styles.jobContent}>
                           <div className={styles.jobHeader}>
                             <div className={styles.jobTitle}>{job.role}</div>
                             <div className={styles.jobMatch}>{job.match} Match</div>
                           </div>
                           <div className={styles.jobCompany}>{job.company}</div>
                           <div className={styles.jobMeta}>
                             <span className={styles.metaBadge}><MapPin size={12}/> {job.location}</span>
                             <span className={styles.metaBadge}><DollarSign size={12}/> {job.salary}</span>
                           </div>
                         </div>
                       </div>
                     ))}
                  </div>
                </div>
             </div>
          </div>
          {/* Glow behind mockup */}
          <div className={styles.mockupGlow} />
        </motion.div>
      </div>
    </section>
  );
};
