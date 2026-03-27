import { DiagnosticTest } from '@/entities/test/model/types';
import { TestListItem } from '@/entities/test/ui/TestListItem';
import { useOrderStore } from '../model/useOrderStore';

interface TestCatalogListProps {
  tests: DiagnosticTest[];
  className?: string;
}

export function TestCatalogList({ tests, className }: TestCatalogListProps) {
  const { selectedTests, addTest, removeTest, updateQuantity } = useOrderStore();

  return (
    <div className={`space-y-2 ${className}`}>
      {tests.map((test) => {
        const selectedTest = selectedTests.find(t => t.id === test.id);
        const isSelected = !!selectedTest;
        const quantity = selectedTest?.quantity || 1;

        return (
          <TestListItem
            key={test.id}
            test={test}
            isSelected={isSelected}
            quantity={quantity}
            onAdd={() => addTest(test)}
            onRemove={() => removeTest(test.id)}
            onUpdateQuantity={(qty) => updateQuantity(test.id, qty)}
          />
        );
      })}
    </div>
  );
}
