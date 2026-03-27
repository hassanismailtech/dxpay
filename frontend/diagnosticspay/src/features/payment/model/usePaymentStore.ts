import { create } from 'zustand';
import { PaymentVerification } from '../api/paymentApi';
import { paymentApi } from '../api/paymentApi';

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

interface PaymentState {
  invoice: Invoice | null;
  paymentStatus: 'idle' | 'loading' | 'success' | 'failed';
  verification: PaymentVerification | null;
  error: string | null;
  // Actions
  setInvoice: (invoice: Invoice) => void;
  verifyPayment: (txRef: string) => Promise<void>;
  reset: () => void;
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  invoice: null,
  paymentStatus: 'idle',
  verification: null,
  error: null,

  setInvoice: (invoice: Invoice) => set({ invoice }),

  verifyPayment: async (txRef: string) => {
    set({ paymentStatus: 'loading', error: null });
    try {
      const verification = await paymentApi.verifyPayment(txRef);
      set({
        verification,
        paymentStatus: verification.status === 'success' ? 'success' : 'failed'
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Payment verification failed',
        paymentStatus: 'failed'
      });
    }
  },

  reset: () => set({
    invoice: null,
    paymentStatus: 'idle',
    verification: null,
    error: null
  })
}));
