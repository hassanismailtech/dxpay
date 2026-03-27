import { PaymentSplit } from '@/entities/transaction/model/types';
import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';

interface SplitEngineExpanderProps {
  splits: PaymentSplit[];
  totalAmount: number;
}

const typeStyles: Record<string, { bar: string; dot: string; label: string }> = {
  lab:     { bar: 'bg-[#1A2235]',  dot: 'bg-[#1A2235]',  label: 'Lab Services' },
  imaging: { bar: 'bg-[#CC0000]',  dot: 'bg-[#CC0000]',  label: 'Imaging' },
  admin:   { bar: 'bg-gray-300',   dot: 'bg-gray-300',   label: 'Admin Fee' },
};

export function SplitEngineExpander({ splits, totalAmount }: SplitEngineExpanderProps) {
  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Split Engine Logic
      </p>

      {/* Visual bar */}
      <div className="flex h-2 rounded-full overflow-hidden mb-4 gap-0.5">
        {splits.map((s, i) => {
          const pct = totalAmount > 0 ? (s.amount / totalAmount) * 100 : 0;
          return pct > 0 ? (
            <div
              key={i}
              className={`${typeStyles[s.type]?.bar ?? 'bg-gray-200'} rounded-full`}
              style={{ width: `${pct}%` }}
            />
          ) : null;
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {splits.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${typeStyles[s.type]?.dot ?? 'bg-gray-300'}`}
            />
            <span className="text-xs text-gray-600">
              {typeStyles[s.type]?.label ?? s.provider}
            </span>
            <CurrencyAmount amount={s.amount} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
