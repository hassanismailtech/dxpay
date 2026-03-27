import { PaymentSplit } from '@/entities/transaction/model/types';
import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';
import { Info } from 'lucide-react';

interface SplitEngineExpanderProps {
  splits: PaymentSplit[];
}

const typeColors = {
  lab: 'bg-blue-100 text-blue-800',
  imaging: 'bg-purple-100 text-purple-800',
  admin: 'bg-gray-100 text-gray-800',
};

export function SplitEngineExpander({ splits }: SplitEngineExpanderProps) {
  return (
    <div className="bg-gray-50 border-l-4 border-blue-500 py-4">
      <div className="flex items-center mb-3 px-6">
        <Info className="h-4 w-4 text-blue-500 mr-2" />
        <span className="text-sm font-medium text-gray-700">Payment Split Details</span>
      </div>
      
      <div className="space-y-2 px-6">
        {splits.map((split, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[split.type]}`}>
                {split.type}
              </span>
              <span className="text-sm text-gray-700">{split.provider}</span>
            </div>
            <CurrencyAmount amount={split.amount} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
