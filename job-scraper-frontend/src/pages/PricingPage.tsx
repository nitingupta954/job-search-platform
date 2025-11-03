import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { paymentsService } from '../api/payments';
import { Check, Crown } from 'lucide-react';
import type { Plan } from '../types';
import styles from './PricingPage.module.css';

declare global {
  interface Window { Razorpay: new (options: Record<string, unknown>) => { open: () => void }; }
}

// ─── Hardcoded plan data — no backend call needed ────────────────────────────
const STATIC_PLANS: Plan[] = [
  {
    id: 1,
    name: 'Starter',
    price_inr: 0,
    monthly_search_limit: 10,
  },
  {
    id: 2,
    name: 'Pro',
    price_inr: 499,
    monthly_search_limit: 100,
    razorpay_plan_id: 'plan_pro_monthly',
  },
  {
    id: 3,
    name: 'Elite',
    price_inr: 999,
    monthly_search_limit: 500,
    razorpay_plan_id: 'plan_elite_monthly',
  },
];

// Per-plan feature bullets (manually curated)
const PLAN_FEATURES: Record<number, { desc: string; features: string[] }> = {
  1: {
    desc: 'Perfect for getting started with AI job search.',
    features: [
      '10 searches per month',
      'Real-time multi-platform scraping',
      'Community support',
    ],
  },
  2: {
    desc: 'For serious job hunters who want every edge.',
    features: [
      '100 searches per month',
      'Real-time multi-platform scraping',
      'Priority support',
      'AI-powered skill matching',
      'Bookmark & track applications',
    ],
  },
  3: {
    desc: 'Maximum power for career accelerators.',
    features: [
      '500 searches per month',
      'Real-time multi-platform scraping',
      'Priority support',
      'AI-powered skill matching',
      'Bookmark & track applications',
      'Dedicated account manager',
      'Early access to new features',
    ],
  },
};
// ─────────────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, setUsage } = useAuthStore();
  const { addToast } = useToastStore();
  const [processingPlanId, setProcessingPlanId] = useState<number | null>(null);

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        return resolve(true);
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async (plan: Plan) => {
    if (!isAuthenticated) {
      addToast('Please sign in first.', 'info');
      navigate('/login');
      return;
    }

    setProcessingPlanId(plan.id);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Failed to load Razorpay');

      const order = await paymentsService.createOrder(plan.id);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: order.id,
        name: 'JobHarvest',
        description: `${plan.name} Plan`,
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: { color: '#4F46E5' },
        handler: async (response: Record<string, string>) => {
          try {
            await paymentsService.verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            const usageData = await import('../api/users').then(m => m.usersService.getUsage());
            setUsage(usageData);
            addToast('Subscription activated!', 'success');
            navigate('/payment-success');
          } catch (err) {
            console.error(err);
            addToast('Payment verification failed. Contact support.', 'error');
          }
        },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setProcessingPlanId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.sectionBadge}><Crown size={14} /> PRICING</div>
        <h1 className={styles.title}>
          Choose the plan that fits <span className={styles.titleAccent}>your ambition</span>
        </h1>
        <p className={styles.subtitle}>
          All plans include full access to our multi-platform search engine. Upgrade or cancel anytime.
        </p>
      </div>

      <div className={styles.cardsRow}>
        {STATIC_PLANS.map((plan, i) => {
          const meta = PLAN_FEATURES[plan.id];
          const isPopular = i === 1;
          return (
            <div key={plan.id} className={`${styles.card} ${isPopular ? styles.popularCard : ''}`}>
              {isPopular && <div className={styles.popularBadge}>MOST POPULAR</div>}

              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.priceContainer}>
                <span className={styles.currency}>₹</span>
                <span className={styles.price}>{plan.price_inr}</span>
                <span className={styles.interval}>/mo</span>
              </div>

              <p className={styles.planDesc}>{meta.desc}</p>

              <ul className={styles.featureList}>
                {meta.features.map((feature) => (
                  <li key={feature} className={styles.featureItem}>
                    <Check size={16} className={styles.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`${styles.actionBtn} ${isPopular ? styles.primaryBtn : ''}`}
                onClick={() => handleSubscribe(plan)}
                disabled={processingPlanId === plan.id}
              >
                {processingPlanId === plan.id
                  ? 'Processing...'
                  : plan.price_inr === 0
                  ? 'Get Started Free'
                  : 'Start Free Trial'}
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.guarantee}>
        <p>🛡️ 7-day money-back guarantee · No questions asked</p>
      </div>
    </div>
  );
}

