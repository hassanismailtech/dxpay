import { StatusBadge } from '@/shared/ui/StatusBadge';
import { OrderStatus } from '../model/types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusMapping: Record<OrderStatus, string> = {
  'pending': 'Pending',
  'paid': 'Paid',
  'processing': 'Processing',
  'completed': 'Completed',
  'sample_collected': 'Sample Collected',
};

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const displayStatus = statusMapping[status] || status;
  
  return (
    <StatusBadge 
      status={displayStatus}
      className={className}
    />
  );
}
