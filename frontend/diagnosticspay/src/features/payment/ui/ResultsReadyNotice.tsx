import { Clock } from 'lucide-react';

export function ResultsReadyNotice() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3 shrink-0" />
        <div>
          <h3 className="font-medium text-blue-800 mb-1">Results Timeline</h3>
          <p className="text-blue-700 text-sm">
            Results will be ready within 24-48 hours. You will receive a notification when your test results are available for collection.
          </p>
        </div>
      </div>
    </div>
  );
}
