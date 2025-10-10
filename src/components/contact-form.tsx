'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { submitContactForm } from '@/lib/actions';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  inquiryType: string;
  message: string;
  newsletter: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    message: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSubmitStatus('idle');

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.inquiryType) {
      setError('Please select an inquiry type.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          inquiryType: '',
          message: '',
          newsletter: false
        });
        setSubmitStatus('success');
      } else {
        setError(result.error || 'An error occurred while sending your message. Please try again.');
        setSubmitStatus('error');
      }
    } catch (err) {
      setError('An error occurred while sending your message. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    'General Inquiry',
    'Psalion Yield',
    'Psalion VC',
    'Bespoke Services',
    'Partnership',
    'Media Inquiry',
    'Other'
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600">
          Ready to explore our investment solutions? We'd love to hear from you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            <CheckCircle size={20} />
            Thank you for your message! We'll get back to you within 24 hours.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company/Institution</Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Enter your company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="inquiryType">Inquiry Type *</Label>
          <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an inquiry type" />
            </SelectTrigger>
            <SelectContent>
              {inquiryTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Tell us about your investment needs and objectives..."
            rows={6}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="newsletter"
            checked={formData.newsletter}
            onChange={(e) => handleInputChange('newsletter', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="newsletter" className="text-sm text-gray-600">
            I would like to receive updates about Psalion's investment opportunities and market insights.
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          By submitting this form, you agree to our{' '}
          <a href="/legal/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/legal/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </div>
  );
}
