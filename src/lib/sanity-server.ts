"use server";

import { createClient } from 'next-sanity';
import { dataset, projectId, apiVersion } from '@/sanity/env';

export async function saveNewsletterEmail(params: { email: string; sourcePage?: string }) {
  const { email, sourcePage } = params;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Invalid email');
  }
  
  // Create write-enabled client inside the server action
  const sanityWriteClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
  
  try {
    const doc = await sanityWriteClient.create({
      _type: 'newsletterSignup',
      email,
      sourcePage,
      createdAt: new Date().toISOString(),
    });
    return { ok: true, id: doc._id };
  } catch (err) {
    console.error('Failed to save newsletter email', err);
    return { ok: false };
  }
}

export async function saveContactForm(params: {
  fullName: string;
  email: string;
  phone?: string;
  userType: 'investor' | 'founder';
  message: string;
  captchaToken?: string;
}) {
  const { fullName, email, phone, userType, message, captchaToken } = params;
  // Verify Cloudflare Turnstile captcha if configured
  if (process.env.TURNSTILE_SECRET_KEY) {
    try {
      const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: captchaToken || '',
        }),
        cache: 'no-store',
      });
      const data = await resp.json().catch(() => ({ success: false }));
      if (!data?.success) {
        throw new Error('Captcha verification failed');
      }
    } catch (e) {
      console.error('Turnstile verification error', e);
      throw new Error('Captcha verification failed');
    }
  }
  
  if (!fullName || !email || !message) {
    throw new Error('Required fields missing');
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Invalid email');
  }
  
  // Create write-enabled client inside the server action
  const sanityWriteClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
  
  try {
    const doc = await sanityWriteClient.create({
      _type: 'contactForm',
      fullName,
      email,
      phone: phone || '',
      userType,
      message,
      submittedAt: new Date().toISOString(),
    });

    // Send email (await to avoid serverless teardown dropping the request)
    await sendContactEmail({ fullName, email, phone, userType, message, docId: doc._id });

    return { ok: true, id: doc._id };
  } catch (err) {
    console.error('Failed to save contact form', err);
    return { ok: false };
  }
}

async function sendContactEmail(args: {
  fullName: string;
  email: string;
  phone?: string;
  userType: 'investor' | 'founder';
  message: string;
  docId?: string;
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.CONTACT_TO_EMAIL;
  const FROM = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!RESEND_API_KEY || !TO) {
    console.warn('[contact-email] Missing env: ', { hasKey: !!RESEND_API_KEY, hasTo: !!TO });
    return;
  }

  const subject = `New contact form submission: ${args.fullName}`;
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(args.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(args.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(args.phone || '')}</p>
    <p><strong>User Type:</strong> ${escapeHtml(args.userType)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(args.message).replace(/\n/g, '<br/>')}</p>
    ${args.docId ? `<p style="color:#888">Sanity doc id: ${args.docId}</p>` : ''}
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject,
      html,
    }),
    cache: 'no-store',
  });

  const text = await res.text().catch(() => '');
  if (!res.ok) {
    console.error('[contact-email] Resend failed', { status: res.status, body: text.slice(0, 500) });
    throw new Error(`Resend error ${res.status}`);
  } else {
    console.log('[contact-email] Resend accepted', { status: res.status, body: text.slice(0, 500) });
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


