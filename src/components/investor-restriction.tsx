'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function InvestorRestriction() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const confirmed = typeof window !== 'undefined' && window.localStorage.getItem('investorConfirmed');
      if (!confirmed) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    try {
      window.localStorage.setItem('investorConfirmed', 'true');
    } catch {}
    setOpen(false);
  };

  const handleDecline = () => {
    try {
      window.localStorage.setItem('investorConfirmed', 'false');
    } catch {}
    // Redirect user away
    window.location.href = 'https://www.google.com';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Investor Restriction</DialogTitle>
          <DialogDescription className="text-gray-600 mt-4 space-y-6">
            <p>
              Psalion products are only available to professional investors (as defined in the relevant jurisdiction).
            </p>
            <p>
              By using this website, I confirm that I am a professional investor (as defined in the relevant jurisdiction) and that I use this website for information purpose only.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button onClick={handleConfirm} className="w-full bg-black text-white hover:bg-gray-800">
            Yes, I am a professional investor
          </Button>
          <Button onClick={handleDecline} variant="outline" className="w-full">
            No, I am not a professional investor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


