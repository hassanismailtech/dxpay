import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';

interface InvoiceLineItemsProps {
  tests: Array<{
    name: string;
    price: number;
  }>;
  className?: string;
}

export function InvoiceLineItems({ tests, className }: InvoiceLineItemsProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 mb-6 ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Diagnostic Tests</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {tests.map((test, index) => (
          <div key={index} className="px-6 py-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">{test.name}</p>
            </div>
            <CurrencyAmount amount={test.price} />
          </div>
        ))}
      </div>
    </div>
  );
}
