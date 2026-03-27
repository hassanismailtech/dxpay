'use client';

import { useState } from 'react';
import { useOrderStore } from '../model/useOrderStore';
import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, ExternalLink, FileText, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function OrderSummary() {
  const {
    patientName,
    selectedTests,
    orderId,
    paymentLink,
    isGenerating,
    error,
    setPatientName,
    removeTest,
    generateInvoice,
    reset,
  } = useOrderStore();

  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [localName, setLocalName] = useState(patientName);

  const subtotal = selectedTests.reduce((sum, t) => sum + t.price * t.quantity, 0);

  const handleNameChange = (v: string) => {
    setLocalName(v);
    setPatientName(v);
  };

  const handleGenerate = async () => {
    await generateInvoice();
    setShowModal(true);
  };

  const handleCopy = () => {
    if (!paymentLink) return;
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setLocalName('');
    setShowModal(false);
    reset();
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-6">
        {/* Live indicator */}
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Live Order Summary
          </h2>
        </div>

        {/* Patient Name */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Patient Name
          </label>
          <Input
            placeholder="Enter patient name..."
            value={localName}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>

        {/* Selected Tests */}
        <div className="mb-5 space-y-2 min-h-[60px]">
          {selectedTests.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No tests selected yet
            </p>
          ) : (
            selectedTests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between text-sm group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000] shrink-0" />
                  <span className="font-medium text-gray-800 truncate max-w-[140px]">
                    {test.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CurrencyAmount amount={test.price} size="sm" />
                  <button
                    onClick={() => removeTest(test.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        <div className="border-t border-gray-100 pt-4 mb-5 space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal ({selectedTests.length} tests)</span>
            <CurrencyAmount amount={subtotal} size="sm" />
          </div>
          <div className="flex justify-between font-bold text-base">
            <span>Total Due</span>
            <span className="text-[#CC0000]">
              <CurrencyAmount amount={subtotal} />
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={handleGenerate}
            disabled={!patientName || selectedTests.length === 0 || isGenerating}
            className="w-full bg-[#CC0000] hover:bg-red-700 text-white h-10 font-semibold"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Instant Payment & QR
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={handleReset}
            className="w-full text-gray-400 hover:text-gray-600 text-sm"
          >
            Clear Order
          </Button>
        </div>
      </div>

      {/* Payment Link Modal */}
      <Dialog open={showModal && !!paymentLink} onOpenChange={setShowModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">Payment Link Ready</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            <p className="text-sm text-gray-500 text-center">
              Share this link or QR code with{' '}
              <span className="font-medium text-gray-800">{patientName}</span>
            </p>

            {paymentLink && (
              <div className="p-3 bg-white border-2 border-gray-100 rounded-xl">
                <QRCodeSVG value={paymentLink} size={180} />
              </div>
            )}

            <div className="w-full flex items-center gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 truncate font-mono">
                {paymentLink}
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex-1 text-sm"
              >
                New Order
              </Button>
              <Button
                onClick={() => window.open(paymentLink!, '_blank')}
                className="flex-1 text-sm bg-[#CC0000] hover:bg-red-700 text-white"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Preview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
