import { api } from '@/shared/api/axiosClient';
import { Invoice } from '@/features/payment/model/usePaymentStore';

export interface PaymentVerification {
  reference: string;
  amount: number;
  method: string;
  date_time: string;
  status: 'success' | 'failed';
}

export const paymentApi = {
  fetchInvoice: async (invoiceId: string): Promise<Invoice> => {
    const response = await api.get(`/api/invoices/${invoiceId}`);
    return response.data;
  },

  verifyPayment: async (txRef: string): Promise<PaymentVerification> => {
    const response = await api.get('/api/payment/verify', {
      params: { transaction_reference: txRef }
    });
    return response.data;
  }
};
