import { apiClient } from './client';
import type { Plan } from '../types';

export const paymentsService = {
  getPlans: async (): Promise<Plan[]> => {
    const { data } = await apiClient.get<Plan[]>('/api/payments/plans');
    return data;
  },
  
  createOrder: async (planId: number): Promise<{ id: string; amount: number; currency: string }> => {
    const { data } = await apiClient.post<{ id: string; amount: number; currency: string }>('/api/payments/create-order', { plan_id: planId });
    return data;
  },

  verifyPayment: async (paymentDetails: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }): Promise<{ success: boolean; subscription_id?: string }> => {
    const { data } = await apiClient.post<{ success: boolean; subscription_id?: string }>('/api/payments/verify', paymentDetails);
    return data;
  }
};
