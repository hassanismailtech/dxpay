import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';
import { formatDateTime } from '@/shared/lib/utils';

interface PaymentReceiptDetailsProps {
  reference: string;
  amount: number;
  method: string;
  dateTime: string;
  className?: string;
}

export function PaymentReceiptDetails({ 
  reference, 
  amount, 
  method, 
  dateTime, 
  className 
}: PaymentReceiptDetailsProps) {
  return (
    <div className={`bg-white p-6 rounded-lg border border-gray-200 mb-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Reference Number</span>
          <span className="font-medium text-gray-900">{reference}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Amount Paid</span>
          <CurrencyAmount amount={amount} />
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Payment Method</span>
          <span className="font-medium text-gray-900">{method}</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Date & Time</span>
          <span className="font-medium text-gray-900">{formatDateTime(dateTime)}</span>
        </div>
      </div>
    </div>
  );
}
