'use client';

import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    mq.addEventListener('change', (e) => setIsMobile(e.matches));
    return () => mq.removeEventListener('change', (e) => setIsMobile(e.matches));
  }, []);
  
  return isMobile;
}
