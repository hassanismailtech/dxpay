import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { DesktopSidebar } from '@/widgets/app-shell/DesktopSidebar';
import { MobileBottomNav } from '@/widgets/app-shell/MobileBottomNav';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'DiagnosticsPay | Medical Lab Payment Platform',
  description: 'Seamless payment processing for medical diagnostics and laboratory services',
};

export const viewport: Viewport = {
  themeColor: '#002C5F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Interswitch Web Pay SDK */}
        <script
          src="https://newwebpay.interswitchng.com/plugin/browse-pay.js"
          async
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen bg-background">
          <DesktopSidebar />
          <main className="flex-1 lg:ml-65 min-h-screen pb-20 lg:pb-0">
            {children}
          </main>
        </div>
        <MobileBottomNav />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}