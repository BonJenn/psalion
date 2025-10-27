'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactFormModal from './contact-form-modal';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 64, left: 16 });
  const [menuWidth, setMenuWidth] = useState<number>(320);
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === null;

  // No body scroll lock; allow normal page scrolling when menu is open

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (buttonRef.current && buttonRef.current.contains(t)) return;
      if (panelRef.current && panelRef.current.contains(t)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [isOpen]);

  const navItems = [
    { href: '/psalion-vc', label: 'Psalion VC' },
    { href: '/psalion-yield', label: 'Psalion Yield' },
    { href: '/bespoke-services', label: 'Bespoke Services' },
    { href: '/#team', label: 'Team' },
    { href: '/mentions', label: 'Press Mentions' },
    { href: '/#clients', label: 'Clients' },
    { href: 'contact', label: 'Contact', isContact: true },
  ];

  // Resolve page-specific logo based on current route
  const logoSrc = (() => {
    // Home (root)
    if (pathname === '/' || pathname === null) {
      return '/psalion_logos/Psalion/vertical/on%20white/2025.svg';
    }
    // Services
    if (pathname.startsWith('/bespoke-services')) {
      return '/psalion_logos/Services/vertical/on%20white.svg';
    }
    // VC
    if (pathname.startsWith('/psalion-vc')) {
      return '/psalion_logos/VC/vertical/on%20white.svg';
    }
    // Yield
    if (pathname.startsWith('/psalion-yield')) {
      return '/psalion_logos/Yield/vertical/on%20white.svg';
    }
    // Fallback to home branding
    return '/psalion_logos/Psalion/vertical/on%20white/2025.svg';
  })();

  const handleLinkClick = (href: string, isContact?: boolean) => {
    setIsOpen(false);
    
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

  return (
    <>
      <nav className={`relative z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo (page-specific) */}
            <Link href="/" className="flex items-center">
              <Image
                src={logoSrc}
                alt="Psalion"
                width={100}
                height={30}
                className="h-8 w-auto translate-y-[20px]"
                priority
              />
            </Link>

            {/* Hamburger Menu Button + anchored dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon-sm"
                className={`p-0 size-[40px] rounded-lg border transition-colors duration-200 translate-y-[20px] group ${
                  isOpen ? 'bg-black border-black text-white' : 'bg-white border-gray-200 hover:bg-black hover:border-black'
                }`}
                aria-label="Toggle menu"
                onClick={() => setIsOpen(!isOpen)}
                ref={buttonRef}
              >
                {isOpen ? (
                  <X className="size-[22px] text-white" />
                ) : (
                  <div className="flex flex-col items-stretch justify-center px-[8px]">
                    <span className="block h-[2px] w-[18px] rounded-full bg-gray-900 group-hover:bg-white transition-colors duration-200" />
                    <span className="block h-[2px] w-[18px] rounded-full bg-gray-900 group-hover:bg-white transition-colors duration-200 mt-[4px]" />
                    <span className="block h-[2px] w-[9px] rounded-full bg-gray-900 group-hover:bg-white transition-colors duration-200 mt-[4px] self-end" />
                  </div>
                )}
              </Button>

              {isOpen && (
                <div
                  ref={panelRef}
                  className="absolute right-0 mt-6 w-[320px] max-w-[calc(100vw-32px)] rounded-lg shadow-xl border border-gray-800 bg-[#2a2a2a] text-white"
                >
                  <div className="p-6">
                    <div className="space-y-1">
                      {navItems.map((item) => (
                        item.isContact ? (
                          <button
                            key={item.href}
                            className="block w-full text-left px-4 py-3 text-white hover:bg-[#1f1f1f] rounded-md transition-colors duration-200 font-medium"
                            onClick={() => handleLinkClick(item.href, item.isContact)}
                          >
                            {item.label}
                          </button>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-3 text-white hover:bg-[#1f1f1f] rounded-md transition-colors duration-200 font-medium"
                            onClick={() => handleLinkClick(item.href)}
                          >
                            {item.label}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* No full-screen overlay; panel is anchored to the button */}

      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
