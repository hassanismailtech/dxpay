'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';
import { usePaymentStore } from '../model/usePaymentStore';
import { env } from '@/shared/config/env';

interface PayButtonProps {
  invoiceId: string;
  amount: number;
  className?: string;
}

declare global {
  interface Window { 
    webpayCheckout: (config: object) => void;
  }
}

export function PayButton({ invoiceId, amount, className }: PayButtonProps) {
  const { paymentStatus, verifyPayment } = usePaymentStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    if (typeof window.webpayCheckout === 'undefined') {
      alert('Payment system is not available. Please try again later.');
      return;
    }

    setIsProcessing(true);

    window.webpayCheckout({
      merchant_code: env.NEXT_PUBLIC_INTERSWITCH_MERCHANT_CODE || 'MX12345',
      pay_item_id: '101',
      txn_ref: invoiceId,
      amount: amount * 100, // Convert to kobo
      currency: 566, // NGN
      site_redirect_url: `${env.NEXT_PUBLIC_FRONTEND_URL}/pay/${invoiceId}/success`,
      mode: 'TEST',
      onComplete: async (response: any) => {
        if (response.resp === '00') {
          try {
            await verifyPayment(invoiceId);
            window.location.href = `/pay/${invoiceId}/success?txnref=${invoiceId}`;
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment completed but verification failed. Please contact support.');
          }
        } else {
          alert('Payment failed. Please try again.');
        }
        setIsProcessing(false);
      },
      onClose: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <Button
      onClick={handlePay}
      disabled={isProcessing || paymentStatus === 'loading'}
      className={`w-full bg-[--brand-primary] hover:bg-red-700 text-lg py-3 ${className}`}
    >
      {isProcessing || paymentStatus === 'loading' ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </>
      ) : (
        <>
          Pay <CurrencyAmount amount={amount} showSymbol={false} />
        </>
      )}
    </Button>
  );
}
