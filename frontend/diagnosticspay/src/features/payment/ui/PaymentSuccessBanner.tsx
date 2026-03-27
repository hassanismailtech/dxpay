import { CheckCircle } from 'lucide-react';

export function PaymentSuccessBanner() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-green-800 text-center mb-2">
        Payment Verified
      </h1>
      <p className="text-green-600 text-center">
        Your payment has been successfully processed
      </p>
    </div>
  );
}
