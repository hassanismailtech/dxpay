'use client';

import { Button } from '@/shared/ui/button';
import { Download } from 'lucide-react';

export function DownloadReceiptButton() {
  const handleDownload = () => {
    // For demo purposes, create a simple text receipt
    const receiptContent = `
DIAGNOSTICSPAY PAYMENT RECEIPT
================================
Payment Verified Successfully
Thank you for choosing our services
================================
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagnosticspay-receipt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      className="w-full"
    >
      <Download className="h-4 w-4 mr-2" />
      Download Receipt
    </Button>
  );
}
