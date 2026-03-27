// Typed environment variable exports
export const env = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
  NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
  NEXT_PUBLIC_INTERSWITCH_MERCHANT_CODE: process.env.NEXT_PUBLIC_INTERSWITCH_MERCHANT_CODE || '',
} as const;
