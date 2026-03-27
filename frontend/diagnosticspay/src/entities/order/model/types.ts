import { DiagnosticTest } from '@/entities/test/model/types';

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'completed' | 'sample_collected';

export interface Order {
  id: string;           // e.g. "ORD-2024-001"
  patient_name: string;
  tests: DiagnosticTest[];
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  time_elapsed: string; // e.g. "14 mins ago"
}

export interface OrderItem {
  test_id: number;
  quantity: number;
}
