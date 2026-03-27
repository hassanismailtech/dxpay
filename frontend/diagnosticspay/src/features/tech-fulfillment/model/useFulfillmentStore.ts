import { create } from 'zustand';
import { Order } from '@/entities/order/model/types';
import { fulfillmentApi } from '../api/fulfillmentApi';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2024-001',
    patient_name: 'Adebayo Ogundimu',
    tests: [
      { id: 1, name: 'Full Blood Count', price: 7000, category: 'hematology', provider_id: 1 }
    ],
    total_amount: 7000,
    status: 'ready_to_process',
    created_at: '2024-03-27T09:30:00Z',
    time_elapsed: '14 mins ago'
  },
  {
    id: 'ORD-2024-004',
    patient_name: 'Ngozi Okonkwo',
    tests: [
      { id: 5, name: 'Malaria Parasite Test', price: 4000, category: 'chemistry', provider_id: 1 }
    ],
    total_amount: 4000,
    status: 'sample_collected',
    created_at: '2024-03-27T08:45:00Z',
    time_elapsed: '31 mins ago'
  },
  {
    id: 'ORD-2024-007',
    patient_name: 'Emeka Nwosu',
    tests: [
      { id: 6, name: 'Platelet Count', price: 5000, category: 'hematology', provider_id: 1 }
    ],
    total_amount: 5000,
    status: 'paid',
    created_at: '2024-03-27T09:55:00Z',
    time_elapsed: '5 mins ago'
  }
];

interface FulfillmentState {
  orders: Order[];
  activeDepartment: 'hematology' | 'mri' | 'imaging';
  activeFilter: 'queue' | 'history';
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  // Actions
  setDepartment: (dept: 'hematology' | 'mri' | 'imaging') => void;
  setFilter: (f: 'queue' | 'history') => void;
  setSearch: (q: string) => void;
  startTest: (orderId: string) => Promise<void>;
  markSample: (orderId: string) => Promise<void>;
  completeOrder: (orderId: string) => Promise<void>;
}

export const useFulfillmentStore = create<FulfillmentState>((set, get) => ({
  orders: MOCK_ORDERS,
  activeDepartment: 'hematology',
  activeFilter: 'queue',
  searchQuery: '',
  isLoading: false,
  error: null,

  setDepartment: (dept: 'hematology' | 'mri' | 'imaging') => 
    set({ activeDepartment: dept }),

  setFilter: (f: 'queue' | 'history') => 
    set({ activeFilter: f }),

  setSearch: (q: string) => 
    set({ searchQuery: q }),

  startTest: async (orderId: string) => {
    const { orders } = get();
    set({
      orders: orders.map(order =>
        order.id === orderId ? { ...order, status: 'processing' } : order
      )
    });
  },

  markSample: async (orderId: string) => {
    const { orders } = get();
    set({
      orders: orders.map(order =>
        order.id === orderId ? { ...order, status: 'sample_collected' } : order
      )
    });
  },

  completeOrder: async (orderId: string) => {
    const { orders } = get();
    set({
      orders: orders.map(order =>
        order.id === orderId ? { ...order, status: 'completed' } : order
      )
    });
  }
}));
