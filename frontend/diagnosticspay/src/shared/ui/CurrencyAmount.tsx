import { cn } from '@/shared/lib/utils';
import { formatNaira } from '@/shared/lib/utils';

interface CurrencyAmountProps {
  amount: number;
  className?: string;
  showSymbol?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeVariants = {
  sm: 'text-sm font-medium',
  md: 'text-base font-semibold',
  lg: 'text-lg font-bold',
};

export function CurrencyAmount({ 
  amount, 
  className, 
  showSymbol = true,
  size = 'md' 
}: CurrencyAmountProps) {
  return (
    <span className={cn(sizeVariants[size], 'text-gray-900', className)}>
      {showSymbol ? formatNaira(amount) : amount.toLocaleString('en-NG')}
    </span>
  );
}
