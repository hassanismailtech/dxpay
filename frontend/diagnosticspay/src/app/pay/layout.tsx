// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Toaster } from "react-hot-toast";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "DiagnosticsPay - Payment",
//   description: "Secure payment for diagnostic tests",
// };

// export default function PatientLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <head>
//         {/* Interswitch Web Pay SDK */}
//         <script 
//           src="https://newwebpay.interswitchng.com/plugin/browse-pay.js" 
//           async 
//         />
//       </head>
//       <body className="min-h-full bg-[--surface-subtle]">
//         <div className="min-h-screen">
//           {children}
//         </div>
//         <Toaster position="top-right" />
//       </body>
//     </html>
//   );
// }

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[--surface-subtle]">
      {children}
    </div>
  );
}