import { api } from '@/shared/api/axiosClient';

export interface Invoice {
  id: string;
  patient_name: string;
  provider_name: string;
  invoice_number: string;
  date: string;
  tests: Array<{
    name: string;
    price: number;
  }>;
  subtotal: number;
  total: number;
}

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
