'use client';

import { useSearchParams } from 'next/navigation';
import { PaymentSuccessBanner } from '@/features/payment/ui/PaymentSuccessBanner';
import { PaymentReceiptDetails } from '@/features/payment/ui/PaymentReceiptDetails';
import { ResultsReadyNotice } from '@/features/payment/ui/ResultsReadyNotice';
import { DownloadReceiptButton } from '@/features/payment/ui/DownloadReceiptButton';
import { Activity } from 'lucide-react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const txnref = searchParams?.get('txnref') || '';
  const amount = Number(searchParams?.get('amount') || 30500);

  // Generate a human-readable reference from the TXN id
  const shortRef = txnref
    ? 'DP-' + txnref.replace('TXN-', '').slice(0, 12).toUpperCase()
    : 'DP-LKA8B3-X9F2';

  const paymentDetails = {
    reference: shortRef,
    amount: amount,
    method: 'Interswitch',
    dateTime: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Main card with banner */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          <PaymentSuccessBanner />
          <div className="p-6 space-y-0">
            <PaymentReceiptDetails {...paymentDetails} />
          </div>
        </div>

        <ResultsReadyNotice />
        <DownloadReceiptButton />

        {/* Branding footer */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Activity className="h-4 w-4 text-[#CC0000]" />
            <span className="font-medium text-gray-600">DiagnosticsPay</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Thank you for choosing our services
          </p>
        </div>
      </div>
    </div>
  );
}
