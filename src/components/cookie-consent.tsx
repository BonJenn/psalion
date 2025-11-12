'use client';

import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [isMounted, setIsMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = typeof window !== 'undefined' ? window.localStorage.getItem('cookieConsent') : null;
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // If localStorage is blocked, still show once
      setVisible(true);
    }
  }, []);

  if (!isMounted || !visible) return null;

  const handle = (value: 'accepted' | 'rejected') => {
    try {
      window.localStorage.setItem('cookieConsent', value);
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 max-w-sm w-[92vw] sm:w-auto"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="rounded-lg border border-gray-200 bg-white shadow-lg p-4">
        <p className="text-sm text-gray-800">
          We use cookies to enhance your experience. Click &apos;Accept&apos; to continue or &apos;Reject&apos; to reject non-essential cookies.
        </p>
        <div className="mt-3 flex items-center gap-2 justify-end">
          <button
            onClick={() => handle('rejected')}
            className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-900 text-sm hover:bg-gray-100 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => handle('accepted')}
            className="px-3 py-1.5 rounded-md bg-black text-white text-sm hover:bg-gray-900 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}


