import { CheckCircle } from 'lucide-react';

export function PaymentSuccessBanner() {
  return (
    <div className="bg-[#16A34A] rounded-t-2xl mx-0 mb-0 px-6 pt-10 pb-8 text-center">
      <div className="flex justify-center mb-5">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 border-4 border-white/30">
          <CheckCircle className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
        Payment Verified
      </h1>
      <p className="text-green-100 text-sm">
        Your transaction was successful
      </p>
    </div>
  );
}
