'use client';

import { cn } from '@/shared/lib/utils';
import { DiagnosticTest } from '../model/types';
import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';
import { Button } from '@/shared/ui/button';

interface TestListItemProps {
  test: DiagnosticTest;
  isSelected?: boolean;
  quantity?: number;
  onAdd?: () => void;
  onRemove?: () => void;
  onUpdateQuantity?: (quantity: number) => void;
  showActions?: boolean;
  className?: string;
}

export function TestListItem({
  test,
  isSelected = false,
  quantity = 1,
  onAdd,
  onRemove,
  onUpdateQuantity,
  showActions = true,
  className
}: TestListItemProps) {
  return (
    <div className={cn(
      'flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors',
      isSelected && 'border-[--brand-primary] bg-red-50',
      className
    )}>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{test.name}</h3>
        <p className="text-sm text-gray-500 capitalize">{test.category}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <CurrencyAmount amount={test.price} />
        
        {showActions && (
          <div className="flex items-center space-x-2">
            {isSelected ? (
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity?.(Math.max(0, quantity - 1))}
                  className="h-8 w-8 p-0"
                >
                  -
                </Button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity?.(quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  +
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRemove}
                  className="ml-2 text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Button
                onClick={onAdd}
                size="sm"
                className="bg-[--brand-primary] hover:bg-red-700"
              >
                Add
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
