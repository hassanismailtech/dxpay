'use client';

import { Order } from '@/entities/order/model/types';
import { OrderStatusBadge } from '@/entities/order/ui/OrderStatusBadge';
import { Button } from '@/shared/ui/button';
import { EmptyState } from '@/shared/ui/EmptyState';
import { FlaskConical } from 'lucide-react';

interface OrdersTableDesktopProps {
  orders: Order[];
  onStartTest: (orderId: string) => void;
  onMarkSample: (orderId: string) => void;
  onCompleteOrder: (orderId: string) => void;
  className?: string;
}

export function OrdersTableDesktop({
  orders,
  onStartTest,
  onMarkSample,
  onCompleteOrder,
  className
}: OrdersTableDesktopProps) {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders found"
        description="No verified and paid orders in the queue"
        icon={<FlaskConical className="h-12 w-12 text-gray-400" />}
        className={className}
      />
    );
  }

  const getActionButtons = (order: Order) => {
    switch (order.status) {
      case 'paid':
        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => onStartTest(order.id)}
              className="bg-[--brand-primary] hover:bg-red-700 text-white"
            >
              Start
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMarkSample(order.id)}
            >
              Sample
            </Button>
          </div>
        );
      case 'sample_collected':
        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => onStartTest(order.id)}
              className="bg-[--brand-primary] hover:bg-red-700 text-white"
            >
              Start
            </Button>
          </div>
        );
      case 'processing':
        return (
          <Button
            size="sm"
            onClick={() => onCompleteOrder(order.id)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Complete Order
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Verified & Paid Orders ({orders.length})
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Elapsed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.patient_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs truncate">
                    {order.tests.map(test => test.name).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.time_elapsed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getActionButtons(order)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
