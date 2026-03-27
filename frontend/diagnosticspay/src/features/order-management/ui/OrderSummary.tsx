'use client';

import { useOrderStore } from '../model/useOrderStore';
import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { QrCode, FileText } from 'lucide-react';

export function OrderSummary() {
  const {
    patientName,
    selectedTests,
    isGenerating,
    error,
    setPatientName,
    generateInvoice,
    reset
  } = useOrderStore();

  const [localPatientName, setLocalPatientName] = useState(patientName);

  const subtotal = selectedTests.reduce((sum, test) => sum + (test.price * test.quantity), 0);
  const total = subtotal; // No tax for now

  const handlePatientNameChange = (name: string) => {
    setLocalPatientName(name);
    setPatientName(name);
  };

  const handleGenerateInvoice = async () => {
    if (!patientName || selectedTests.length === 0) {
      return;
    }
    await generateInvoice();
  };

  const handleReset = () => {
    setLocalPatientName('');
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      {/* Patient Name Input */}
      <div className="mb-6">
        <label htmlFor="patient-name" className="block text-sm font-medium text-gray-700 mb-2">
          Patient Name
        </label>
        <Input
          id="patient-name"
          type="text"
          placeholder="Enter patient name"
          value={localPatientName}
          onChange={(e) => handlePatientNameChange(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Selected Tests */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Tests ({selectedTests.length})</h3>
        {selectedTests.length === 0 ? (
          <p className="text-gray-500 text-sm">No tests selected</p>
        ) : (
          <div className="space-y-2">
            {selectedTests.map((test) => (
              <div key={test.id} className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">{test.name}</span>
                  <span className="text-gray-500 ml-2">x{test.quantity}</span>
                </div>
                <CurrencyAmount amount={test.price * test.quantity} size="sm" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal</span>
          <CurrencyAmount amount={subtotal} />
        </div>
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Due</span>
          <CurrencyAmount amount={total} />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleGenerateInvoice}
          disabled={!patientName || selectedTests.length === 0 || isGenerating}
          className="w-full bg-[--brand-primary] hover:bg-red-700"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              Generate Instant Payment & QR
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full"
        >
          Clear Order
        </Button>
      </div>
    </div>
  );
}
