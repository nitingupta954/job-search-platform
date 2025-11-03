import styles from './JobResultsSkeleton.module.css';

export const JobResultsSkeleton = () => {
  const skeletons = Array(6).fill(null);

  return (
    <div className={styles.grid}>
      {skeletons.map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logoSkeleton}></div>
            <div className={styles.headerInfo}>
              <div className={`${styles.lineSkeleton} ${styles.titleSkeleton}`}></div>
              <div className={`${styles.lineSkeleton} ${styles.subtitleSkeleton}`}></div>
            </div>
          </div>
          <div className={styles.metaData}>
            <div className={`${styles.lineSkeleton} ${styles.metaSkeleton}`}></div>
            <div className={`${styles.lineSkeleton} ${styles.metaSkeleton}`}></div>
          </div>
          <div className={styles.tagsContainer}>
            <div className={`${styles.tagSkeleton}`}></div>
            <div className={`${styles.tagSkeleton}`}></div>
          </div>
          <div className={styles.footer}>
            <div className={styles.btnSkeleton}></div>
          </div>
        </div>
      ))}
    </div>
  );
};
