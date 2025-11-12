'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { saveContactForm } from '@/lib/sanity-server';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userType: 'investor' as 'investor' | 'founder',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      userType: e.target.value as 'investor' | 'founder'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    setSubmitError('');
    setIsSubmitting(true);

    try {
      if (!captchaToken) {
        throw new Error('Please complete the captcha');
      }
      await saveContactForm({ ...formData, captchaToken });
      setIsSubmitted(true);
      // Reset form after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          userType: 'investor',
          message: ''
        });
        setCaptchaToken('');
        try {
          // Reset captcha widget if available
          if (typeof window !== 'undefined' && (window as any).turnstile && widgetIdRef.current !== null) {
            (window as any).turnstile.reset(widgetIdRef.current);
          }
        } catch {}
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Lazy-load and render Cloudflare Turnstile
  useEffect(() => {
    if (!isOpen) return;
    const render = () => {
      try {
        if (!turnstileContainerRef.current) return;
        if ((window as any).turnstile) {
          // @ts-ignore
          widgetIdRef.current = (window as any).turnstile.render(turnstileContainerRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
            callback: (token: string) => setCaptchaToken(token),
            'error-callback': () => setCaptchaToken(''),
            theme: 'dark',
          });
        }
      } catch {
        // no-op
      }
    };

    // Load script if needed
    if (typeof window !== 'undefined' && !(window as any).turnstile) {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.defer = true;
      s.onload = render;
      document.body.appendChild(s);
      return () => {
        try { document.body.removeChild(s); } catch {}
      };
    } else {
      render();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-white text-xl font-semibold mb-6">Get in Touch</h2>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="text-green-400 text-lg font-medium mb-2">Thank you!</div>
            <div className="text-gray-300">Your message has been sent successfully.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
                Phone Number <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+33 00000000"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600"
              />
            </div>

            {/* User Type Radio Buttons */}
            <div>
              <div className="flex space-x-6 mb-2">
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="investor"
                    checked={formData.userType === 'investor'}
                    onChange={handleRadioChange}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 focus:ring-blue-500"
                  />
                  <span className="text-sm">I am an Investor</span>
                </label>
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="founder"
                    checked={formData.userType === 'founder'}
                    onChange={handleRadioChange}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 focus:ring-blue-500"
                  />
                  <span className="text-sm">I am a Founder</span>
                </label>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="I'm interested in..."
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600 resize-none"
              />
            </div>

            {/* Captcha */}
            <div>
              <div ref={turnstileContainerRef} className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}></div>
              {attemptedSubmit && !captchaToken && (
                <p className="mt-2 text-sm text-red-400">Please complete the captcha before submitting.</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !captchaToken}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
            {submitError && (
              <p className="text-sm text-red-400">{submitError}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
