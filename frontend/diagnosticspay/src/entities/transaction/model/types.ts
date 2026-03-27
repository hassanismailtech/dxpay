export interface PaymentSplit {
  provider: string;
  amount: number;
  type: 'lab' | 'imaging' | 'admin';
}

export interface Transaction {
  id: string;           // "TXN-001"
  patient_name: string;
  tests: string[];
  amount: number;
  status: 'Paid' | 'Awaiting' | 'Processing';
  time: string;
  splits?: PaymentSplit[];
}

export interface DashboardData {
  totalRevenue: number;
  settledSplits: number;
  activeOrders: number;
  transactions: Transaction[];
}
