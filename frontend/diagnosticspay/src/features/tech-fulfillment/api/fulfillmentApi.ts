import { api } from '@/shared/api/axiosClient';
import { Order } from '@/entities/order/model/types';

export const fulfillmentApi = {
  fetchPaidOrders: async (): Promise<Order[]> => {
    const response = await api.get('/api/orders?status=paid');
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string): Promise<Order> => {
    const response = await api.patch(`/api/orders/${id}/status`, { status });
    return response.data;
  }
};
