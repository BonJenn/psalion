'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, AlertCircle } from 'lucide-react';
import { submitInvestorAccessRequest } from '@/lib/actions';

interface InvestorGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessGranted: () => void;
}

export default function InvestorGateModal({ isOpen, onClose, onAccessGranted }: InvestorGateModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    accreditation: false,
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate validation
    if (!formData.name || !formData.email || !formData.company) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.accreditation || !formData.terms) {
      setError('Please confirm your accreditation status and accept the terms.');
      setIsSubmitting(false);
      return;
    }

    // Submit investor access request
    try {
      const result = await submitInvestorAccessRequest(formData);
      
      if (result.success) {
        onAccessGranted();
        onClose();
      } else {
        setError(result.error || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <DialogTitle className="text-xl">Professional Investor Access</DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">
            This content is restricted to professional investors only. Please verify your credentials to continue.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company/Institution *</Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Enter your company name"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="accreditation"
                checked={formData.accreditation}
                onCheckedChange={(checked) => handleInputChange('accreditation', checked as boolean)}
              />
              <Label htmlFor="accreditation" className="text-sm">
                I confirm that I am a professional investor as defined by applicable regulations
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.terms}
                onCheckedChange={(checked) => handleInputChange('terms', checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the <a href="/legal/terms" className="text-blue-600 hover:underline" target="_blank">Terms of Service</a> and <a href="/legal/privacy" className="text-blue-600 hover:underline" target="_blank">Privacy Policy</a>
              </Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Request Access'}
            </Button>
          </div>
        </form>

        <div className="text-xs text-gray-500 text-center pt-2">
          By submitting this form, you acknowledge that you meet the professional investor criteria and agree to our terms.
        </div>
      </DialogContent>
    </Dialog>
  );
}
