import { create } from 'zustand';
import { Order } from '@/entities/order/model/types';
import { fulfillmentApi } from '../api/fulfillmentApi';

interface FulfillmentState {
  orders: Order[];
  activeDepartment: 'hematology' | 'mri' | 'imaging';
  activeFilter: 'queue' | 'history';
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  // Actions
  fetchOrders: () => Promise<void>;
  setDepartment: (dept: 'hematology' | 'mri' | 'imaging') => void;
  setFilter: (f: 'queue' | 'history') => void;
  setSearch: (q: string) => void;
  startTest: (orderId: string) => Promise<void>;
  markSample: (orderId: string) => Promise<void>;
  completeOrder: (orderId: string) => Promise<void>;
}

export const useFulfillmentStore = create<FulfillmentState>((set, get) => ({
  orders: [],
  activeDepartment: 'hematology',
  activeFilter: 'queue',
  searchQuery: '',
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const orders = await fulfillmentApi.fetchPaidOrders();
      set({ orders, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch orders',
        isLoading: false
      });
    }
  },

  setDepartment: (dept: 'hematology' | 'mri' | 'imaging') => 
    set({ activeDepartment: dept }),

  setFilter: (f: 'queue' | 'history') => 
    set({ activeFilter: f }),

  setSearch: (q: string) => 
    set({ searchQuery: q }),

  startTest: async (orderId: string) => {
    try {
      await fulfillmentApi.updateOrderStatus(orderId, 'processing');
      const { orders } = get();
      set({
        orders: orders.map(order =>
          order.id === orderId ? { ...order, status: 'processing' } : order
        )
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to start test'
      });
    }
  },

  markSample: async (orderId: string) => {
    try {
      await fulfillmentApi.updateOrderStatus(orderId, 'sample_collected');
      const { orders } = get();
      set({
        orders: orders.map(order =>
          order.id === orderId ? { ...order, status: 'sample_collected' } : order
        )
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to mark sample'
      });
    }
  },

  completeOrder: async (orderId: string) => {
    try {
      await fulfillmentApi.updateOrderStatus(orderId, 'completed');
      const { orders } = get();
      set({
        orders: orders.map(order =>
          order.id === orderId ? { ...order, status: 'completed' } : order
        )
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to complete order'
      });
    }
  }
}));
