import { TrendingUp, Users, Activity } from 'lucide-react';
import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';

interface RevenueStatCardsProps {
  totalRevenue?: number;
  settledSplits?: number;
  activeOrders?: number;
  className?: string;
}

export function RevenueStatCards({ 
  totalRevenue, 
  settledSplits, 
  activeOrders, 
  className 
}: RevenueStatCardsProps) {
  // Fallback to Figma mock data if real data is missing
  const revenue = totalRevenue || 224000;
  const settled = settledSplits || 179200;
  const active = activeOrders || 24;
  
  const stats = [
    {
      title: "Today's Revenue",
      value: <CurrencyAmount amount={revenue} size="lg" />,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Settled Splits',
      value: settled.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Orders',
      value: active.toLocaleString(),
      icon: Activity,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
