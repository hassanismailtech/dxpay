import { api } from '@/shared/api/axiosClient';
import { DiagnosticTest } from '@/entities/test/model/types';
import { Order, OrderItem } from '@/entities/order/model/types';

export const orderApi = {
  fetchTests: async (category?: string): Promise<DiagnosticTest[]> => {
    const params = category ? { category } : {};
    const response = await api.get('/api/tests', { params });
    return response.data;
  },

  createOrder: async (patientName: string, testIds: number[]): Promise<Order> => {
    const response = await api.post('/api/orders', {
      patient_name: patientName,
      test_ids: testIds
    });
    return response.data;
  },

  generateInvoice: async (orderId: string): Promise<{ payment_link: string }> => {
    const response = await api.post('/api/invoices', {
      order_id: orderId
    });
    return response.data;
  }
};
