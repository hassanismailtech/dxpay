import { create } from 'zustand';
import { Transaction, DashboardData } from '@/entities/transaction/model/types';
import { dashboardApi } from '../api/dashboardApi';

interface DashboardState {
  stats: {
    totalRevenue: number;
    settledSplits: number;
    activeOrders: number;
  } | null;
  transactions: Transaction[];
  expandedTxnId: string | null;
  isLoading: boolean;
  error: string | null;
  // Actions
  fetchData: (providerId: number) => Promise<void>;
  toggleExpand: (id: string) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  stats: null,
  transactions: [],
  expandedTxnId: null,
  isLoading: false,
  error: null,

  fetchData: async (providerId: number) => {
    set({ isLoading: true, error: null });
    try {
      const data: DashboardData = await dashboardApi.fetchDashboard(providerId);
      set({
        stats: {
          totalRevenue: data.total_revenue || 224000,
          settledSplits: data.total_revenue ? data.total_revenue * 0.8 : 179200, 
    activeOrders: data.number_of_tests || 24
        },
        transactions: data.transactions,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch dashboard data',
        isLoading: false
      });
    }
  },

  toggleExpand: (id: string) => {
    const { expandedTxnId } = get();
    set({ expandedTxnId: expandedTxnId === id ? null : id });
  }
}));
