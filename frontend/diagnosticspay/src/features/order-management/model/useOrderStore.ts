import { create } from 'zustand';
import { DiagnosticTest } from '@/entities/test/model/types';
import { orderApi } from '../api/orderApi';

interface OrderState {
  patientName: string;
  selectedTests: Array<DiagnosticTest & { quantity: number }>;
  orderId: string | null;
  paymentLink: string | null;
  isGenerating: boolean;
  error: string | null;
  // Actions
  setPatientName: (name: string) => void;
  addTest: (test: DiagnosticTest) => void;
  removeTest: (testId: number) => void;
  updateQuantity: (testId: number, qty: number) => void;
  generateInvoice: () => Promise<void>;
  reset: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  patientName: '',
  selectedTests: [],
  orderId: null,
  paymentLink: null,
  isGenerating: false,
  error: null,

  setPatientName: (name: string) => set({ patientName: name }),

  addTest: (test: DiagnosticTest) => {
    const { selectedTests } = get();
    const exists = selectedTests.find(t => t.id === test.id);
    if (!exists) {
      set({ selectedTests: [...selectedTests, { ...test, quantity: 1 }] });
    }
  },

  removeTest: (testId: number) => {
    const { selectedTests } = get();
    set({ selectedTests: selectedTests.filter(t => t.id !== testId) });
  },

  updateQuantity: (testId: number, qty: number) => {
    const { selectedTests } = get();
    if (qty === 0) {
      get().removeTest(testId);
    } else {
      set({
        selectedTests: selectedTests.map(t =>
          t.id === testId ? { ...t, quantity: qty } : t
        )
      });
    }
  },

  generateInvoice: async () => {
    const { patientName, selectedTests } = get();
    if (!patientName || selectedTests.length === 0) {
      set({ error: 'Patient name and at least one test are required' });
      return;
    }

    set({ isGenerating: true, error: null });
    try {
      const order = await orderApi.createOrder(
        patientName,
        selectedTests.map(t => t.id)
      );
      
      const invoice = await orderApi.generateInvoice(order.id);
      
      set({
        orderId: order.id,
        paymentLink: invoice.payment_link,
        isGenerating: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to generate invoice',
        isGenerating: false
      });
    }
  },

  reset: () => set({
    patientName: '',
    selectedTests: [],
    orderId: null,
    paymentLink: null,
    error: null
  })
}));
