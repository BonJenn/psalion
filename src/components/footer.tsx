'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ContactFormModal from './contact-form-modal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleLinkClick = (href: string, isContact?: boolean) => {
    if (isContact) {
      setIsContactModalOpen(true);
      return;
    }
    
    // Handle anchor links with smooth scrolling
    if (href.startsWith('/#')) {
      const targetId = href.substring(2); // Remove '/#' to get the ID
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const footerSections = [
    {
      title: 'Products',
      links: [
        { href: '/psalion-yield', label: 'Psalion Yield' },
        { href: '/psalion-vc', label: 'Psalion VC' },
        { href: '/bespoke-services', label: 'Bespoke Services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/#team', label: 'Team' },
        { href: '/#clients', label: 'Clients' },
        { href: '/mentions', label: 'Press Mentions' },
        { href: '#', label: 'Contact', isContact: true },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '/legal/privacy', label: 'Privacy Policy' },
        { href: '/legal/terms', label: 'Terms of Service' },
        { href: '/legal/cookies', label: 'Cookie Policy' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/psalion_logo.png"
                alt="Psalion"
                width={160}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>
    
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.isContact ? (
                      <button
                        onClick={() => handleLinkClick(link.href, link.isContact)}
                        className="text-gray-600 hover:text-black transition-colors duration-200 text-sm text-left"
                      >
                        {link.label}
                      </button>
                    ) : link.href.startsWith('/#') ? (
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="text-gray-600 hover:text-black transition-colors duration-200 text-sm text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-black transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Psalion. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/legal/privacy"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/legal/cookies"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
      
      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </footer>
  );
}
