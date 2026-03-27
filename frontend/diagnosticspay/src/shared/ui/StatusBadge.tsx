import { cn } from '@/shared/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusVariants = {
  'Ready to Process': 'bg-green-100 text-green-700 border-green-200',
  'Sample Collected': 'bg-gray-100 text-gray-600 border-gray-200',
  'Paid': 'bg-green-100 text-green-700 border-green-200',
  'Awaiting': 'bg-amber-100 text-amber-700 border-amber-200',
  'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
  'Completed': 'bg-green-100 text-green-700 border-green-200',
  'Pending': 'bg-gray-100 text-gray-600 border-gray-200',
  'Failed': 'bg-red-100 text-red-700 border-red-200',
  'Success': 'bg-green-100 text-green-700 border-green-200',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusVariants[status as keyof typeof statusVariants] || 
                  'bg-gray-100 text-gray-600 border-gray-200';

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variant,
        className
      )}
    >
      {status}
    </span>
  );
}
