import { useToastStore } from '../../store/useToastStore';
import { XCircle, CheckCircle, Info, X } from 'lucide-react';
import styles from './Toast.module.css';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          <div className={styles.icon}>
            {toast.type === 'success' && <CheckCircle size={20} />}
            {toast.type === 'error' && <XCircle size={20} />}
            {toast.type === 'info' && <Info size={20} />}
          </div>
          <div className={styles.message}>{toast.message}</div>
          <button className={styles.closeBtn} onClick={() => removeToast(toast.id)}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
