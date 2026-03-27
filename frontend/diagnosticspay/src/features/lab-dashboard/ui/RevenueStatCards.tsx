import { Wallet, CheckCircle2, Clock } from 'lucide-react';
import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';
import { cn } from '@/shared/lib/utils';

interface RevenueStatCardsProps {
  totalRevenue?: number;
  settledSplits?: number;
  activeOrders?: number;
  className?: string;
}

const stats = (revenue: number, settled: number, active: number) => [
  {
    title: "Today's Revenue",
    value: <CurrencyAmount amount={revenue} size="lg" />,
    subtext: '+12.5%',
    subtextColor: 'text-green-600',
    icon: Wallet,
    iconBg: 'bg-red-50',
    iconColor: 'text-[#CC0000]',
  },
  {
    title: 'Settled Splits',
    value: <CurrencyAmount amount={settled} size="lg" />,
    subtext: '80% of total',
    subtextColor: 'text-green-600',
    icon: CheckCircle2,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: 'Active Orders',
    value: <span className="text-2xl font-bold text-gray-900">{active}</span>,
    subtext: '6 awaiting',
    subtextColor: 'text-amber-600',
    icon: Clock,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
];

export function RevenueStatCards({
  totalRevenue = 224000,
  settledSplits = 179200,
  activeOrders = 24,
  className,
}: RevenueStatCardsProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}>
      {stats(totalRevenue, settledSplits, activeOrders).map((s, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4"
        >
          <div className={cn('p-3 rounded-xl shrink-0', s.iconBg)}>
            <s.icon className={cn('h-5 w-5', s.iconColor)} />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{s.title}</p>
            {s.value}
            <p className={cn('text-xs mt-1', s.subtextColor)}>
              ↑ {s.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
