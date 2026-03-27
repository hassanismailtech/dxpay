import { api } from '@/shared/api/axiosClient';

export interface PaymentVerification {
  reference: string;
  amount: number;
  method: string;
  date_time: string;
  status: 'success' | 'failed';
}

export const paymentApi = {
  verifyPayment: async (txRef: string): Promise<PaymentVerification> => {
    const response = await api.get('/api/payment/verify', {
      params: { transaction_reference: txRef }
    });
    return response.data;
  }
};
