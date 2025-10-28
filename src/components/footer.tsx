'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import ContactFormModal from './contact-form-modal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Match header logo selection
  const logoSrc = (() => {
    if (pathname === '/' || pathname === null) {
      return '/psalion_logos/Psalion/vertical/on%20white/2025.svg';
    }
    if (pathname.startsWith('/bespoke-services')) {
      return '/psalion_logos/Services/vertical/on%20white.svg';
    }
    if (pathname.startsWith('/psalion-vc')) {
      return '/psalion_logos/VC/vertical/on%20white.svg';
    }
    if (pathname.startsWith('/psalion-yield')) {
      return '/psalion_logos/Yield/vertical/on%20white.svg';
    }
    return '/psalion_logos/Psalion/vertical/on%20white/2025.svg';
  })();

  const handleLinkClick = (href: string, isContact?: boolean) => {
    if (isContact) {
      setIsContactModalOpen(true);
      return;
    }
    
    // Handle anchor links with smooth scrolling
    if (href.startsWith('/#')) {
      const targetId = href.substring(2); // Remove '/#' to get the ID
      // If we're not on the homepage, navigate there first with hash
      if (pathname !== '/') {
        router.push(`/#${targetId}`);
        return;
      }
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const footerSections = [
    {
      title: 'Products',
      links: [
        { href: '/psalion-vc', label: 'Psalion VC' },
        { href: '/psalion-yield', label: 'Psalion Yield' },
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
    <footer className="bg-gray-50 border-t border-gray-200" style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4 justify-center md:justify-start">
              <Image
                src={logoSrc}
                alt="Psalion"
                width={80}
                height={25}
                className="h-6 w-auto"
                priority
              />
            </Link>
    
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="text-center md:text-left">
              <h3 className="font-semibold text-gray-900 mb-4 text-center md:text-left">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.isContact ? (
                      <button
                        onClick={() => handleLinkClick(link.href, link.isContact)}
                        className="group text-gray-600 hover:text-black transition-colors duration-200 text-sm text-center md:text-left"
                      >
                        <span className="relative inline-block px-0.5 bg-gradient-to-r from-blue-100 to-blue-100 bg-left bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-[background-size] duration-300">
                          {link.label}
                        </span>
                      </button>
                    ) : link.href.startsWith('/#') ? (
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="group text-gray-600 hover:text-black transition-colors duration-200 text-sm text-center md:text-left"
                      >
                        <span className="relative inline-block px-0.5 bg-gradient-to-r from-blue-100 to-blue-100 bg-left bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-[background-size] duration-300">
                          {link.label}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="group text-gray-600 hover:text-black transition-colors duration-200 text-sm"
                      >
                        <span className="relative inline-block px-0.5 bg-gradient-to-r from-blue-100 to-blue-100 bg-left bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-[background-size] duration-300">
                          {link.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Psalion. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 justify-center md:justify-end">
            <Link
              href="/legal/privacy"
              className="group text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              <span className="relative inline-block px-0.5 bg-gradient-to-r from-blue-100 to-blue-100 bg-left bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-[background-size] duration-300">Privacy</span>
            </Link>
            <Link
              href="/legal/terms"
              className="group text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              <span className="relative inline-block px-0.5 bg-gradient-to-r from-blue-100 to-blue-100 bg-left bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-[background-size] duration-300">Terms</span>
            </Link>
            <Link
              href="/legal/cookies"
              className="group text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              <span className="relative inline-block px-0.5 bg-gradient-to-r from-blue-100 to-blue-100 bg-left bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-[background-size] duration-300">Cookies</span>
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
