'use client';

import { DiagnosticTest } from '@/entities/test/model/types';
import { cn } from '@/shared/lib/utils';

interface QuickAddGridProps {
  tests: DiagnosticTest[];
  onAddTest: (test: DiagnosticTest) => void;
  className?: string;
}

const quickAddTests = [
  { name: 'Full Blood Count', category: 'hematology', icon: '🩸' },
  { name: 'Liver Function', category: 'hematology', icon: '🫀' },
  { name: 'Kidney Function', category: 'hematology', icon: '' },
  { name: 'Blood Sugar', category: 'hematology', icon: '🍬' },
  { name: 'Lipid Profile', category: 'hematology', icon: '🧬' },
  { name: 'Thyroid Test', category: 'hematology', icon: '' },
  { name: 'X-Ray', category: 'imaging', icon: '📷' },
  { name: 'Ultrasound', category: 'imaging', icon: '🔊' },
];

export function QuickAddGrid({ tests, onAddTest, className }: QuickAddGridProps) {
  const handleQuickAdd = (quickTest: typeof quickAddTests[0]) => {
    const matchingTest = tests.find(
      test => test.name.toLowerCase().includes(quickTest.name.toLowerCase()) ||
               test.name.toLowerCase().includes(quickTest.name.split(' ')[0].toLowerCase())
    );
    
    if (matchingTest) {
      onAddTest(matchingTest);
    }
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${className}`}>
      {quickAddTests.map((quickTest, index) => (
        <button
          key={index}
          onClick={() => handleQuickAdd(quickTest)}
          className="p-4 bg-white border border-gray-200 rounded-lg hover:border-[--brand-primary] hover:bg-red-50 transition-colors text-center"
        >
          <div className="text-2xl mb-2">{quickTest.icon}</div>
          <div className="text-xs font-medium text-gray-900">{quickTest.name}</div>
        </button>
      ))}
    </div>
  );
}
