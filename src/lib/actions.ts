'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType: string;
  message: string;
  newsletter: boolean;
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message || !formData.inquiryType) {
      return {
        success: false,
        error: 'Please fill in all required fields.'
      };
    }

    // Send email to Psalion team
    const emailToTeam = await resend.emails.send({
      from: 'contact@psalion.com',
      to: ['info@psalion.com', 'investors@psalion.com'],
      subject: `New Contact Form Submission - ${formData.inquiryType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            <p><strong>Inquiry Type:</strong> ${formData.inquiryType}</p>
            <p><strong>Newsletter Signup:</strong> ${formData.newsletter ? 'Yes' : 'No'}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This message was sent from the Psalion website contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    });

    // Send confirmation email to the user
    const emailToUser = await resend.emails.send({
      from: 'noreply@psalion.com',
      to: formData.email,
      subject: 'Thank you for contacting Psalion Capital',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background-color: #3b82f6; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <span style="color: white; font-size: 24px; font-weight: bold;">P</span>
            </div>
            <h1 style="color: #1f2937; margin: 0;">Psalion Capital</h1>
          </div>
          
          <h2 style="color: #1f2937;">Thank you for your inquiry</h2>
          
          <p style="color: #374151; line-height: 1.6;">
            Dear ${formData.firstName},
          </p>
          
          <p style="color: #374151; line-height: 1.6;">
            Thank you for reaching out to Psalion Capital. We have received your inquiry regarding <strong>${formData.inquiryType}</strong> and will review it carefully.
          </p>
          
          <p style="color: #374151; line-height: 1.6;">
            Our team typically responds to all inquiries within 24 hours during business days. For urgent matters, please call us directly at +1 (555) 123-4567.
          </p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">What happens next?</h3>
            <ul style="color: #374151; margin: 0; padding-left: 20px;">
              <li>Our team will review your inquiry</li>
              <li>We'll verify your professional investor status if applicable</li>
              <li>A senior team member will contact you directly</li>
              <li>We'll schedule a consultation to discuss your needs</li>
            </ul>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            If you have any questions in the meantime, please don't hesitate to contact us.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Best regards,<br>
              The Psalion Capital Team
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px; font-size: 12px; color: #6b7280;">
            <p style="margin: 0;">
              <strong>Psalion Capital</strong><br>
              123 Financial District, New York, NY 10004<br>
              Phone: +1 (555) 123-4567 | Email: info@psalion.com
            </p>
          </div>
        </div>
      `
    });

    if (emailToTeam.error || emailToUser.error) {
      console.error('Email sending error:', emailToTeam.error || emailToUser.error);
      return {
        success: false,
        error: 'Failed to send email. Please try again or contact us directly.'
      };
    }

    return {
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
    };

  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again or contact us directly.'
    };
  }
}

export async function submitInvestorAccessRequest(formData: {
  name: string;
  email: string;
  company: string;
  accreditation: boolean;
  terms: boolean;
}) {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.company) {
      return {
        success: false,
        error: 'Please fill in all required fields.'
      };
    }

    if (!formData.accreditation || !formData.terms) {
      return {
        success: false,
        error: 'Please confirm your accreditation status and accept the terms.'
      };
    }

    // Send email to Psalion team
    const emailToTeam = await resend.emails.send({
      from: 'investors@psalion.com',
      to: ['info@psalion.com', 'compliance@psalion.com'],
      subject: 'Professional Investor Access Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            Professional Investor Access Request
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Investor Information</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Company:</strong> ${formData.company}</p>
            <p><strong>Accreditation Confirmed:</strong> Yes</p>
            <p><strong>Terms Accepted:</strong> Yes</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-weight: 500;">
              <strong>Action Required:</strong> Please review this request and verify the investor's accreditation status before granting access to restricted content.
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This request was submitted from the Psalion website investor gate.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    });

    if (emailToTeam.error) {
      console.error('Email sending error:', emailToTeam.error);
      return {
        success: false,
        error: 'Failed to submit request. Please try again or contact us directly.'
      };
    }

    return {
      success: true,
      message: 'Your access request has been submitted. We will review your credentials and respond within 24 hours.'
    };

  } catch (error) {
    console.error('Investor access request error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again or contact us directly.'
    };
  }
}
