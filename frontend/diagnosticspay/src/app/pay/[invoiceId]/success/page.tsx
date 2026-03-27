'use client';

import { useSearchParams } from 'next/navigation';
import { PaymentSuccessBanner } from '@/features/payment/ui/PaymentSuccessBanner';
import { PaymentReceiptDetails } from '@/features/payment/ui/PaymentReceiptDetails';
import { ResultsReadyNotice } from '@/features/payment/ui/ResultsReadyNotice';
import { DownloadReceiptButton } from '@/features/payment/ui/DownloadReceiptButton';
import { Button } from '@/shared/ui/button';
import { Home } from 'lucide-react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const txnref = searchParams?.get('txnref') || 'Unknown';
  
  // Mock payment details for demo
  const paymentDetails = {
    reference: txnref,
    amount: 30500,
    method: 'Interswitch',
    dateTime: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-[--surface-subtle] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <PaymentSuccessBanner />
        
        <PaymentReceiptDetails {...paymentDetails} />
        
        <ResultsReadyNotice />
        
        <DownloadReceiptButton />
        
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>DiagnosticsPay</p>
          <p>Thank you for choosing our services</p>
        </div>
      </div>
    </div>
  );
}
