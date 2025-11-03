import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}

export const Spinner = ({ size = 'md', fullPage = false }: SpinnerProps) => {
  const containerClass = fullPage ? styles.fullPageContainer : styles.container;
  
  return (
    <div className={containerClass}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
    </div>
  );
};
