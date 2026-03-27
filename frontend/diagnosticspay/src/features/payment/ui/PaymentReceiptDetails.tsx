import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';
import { formatDateTime } from '@/shared/lib/utils';

interface PaymentReceiptDetailsProps {
  reference: string;
  amount: number;
  method: string;
  dateTime: string;
  className?: string;
}

const rows = (
  reference: string,
  amount: number,
  method: string,
  dateTime: string
) => [
  { label: 'Reference', value: reference },
  { label: 'Amount Paid', value: <CurrencyAmount amount={amount} />, highlight: true },
  { label: 'Payment Method', value: method },
  { label: 'Date & Time', value: formatDateTime(dateTime) },
];

export function PaymentReceiptDetails({
  reference,
  amount,
  method,
  dateTime,
}: PaymentReceiptDetailsProps) {
  return (
    <div className="divide-y divide-gray-100">
      {rows(reference, amount, method, dateTime).map(({ label, value, highlight }) => (
        <div
          key={label}
          className="flex justify-between items-center py-3.5"
        >
          <span className="text-sm text-gray-500">{label}</span>
          <span
            className={
              highlight
                ? 'text-base font-bold text-gray-900'
                : 'text-sm font-medium text-gray-800'
            }
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
