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
}) {
  const { fullName, email, phone, userType, message } = params;
  
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
    return { ok: true, id: doc._id };
  } catch (err) {
    console.error('Failed to save contact form', err);
    return { ok: false };
  }
}


