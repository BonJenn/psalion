'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactFormModal from './contact-form-modal';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/psalion-yield', label: 'Psalion Yield' },
    { href: '/psalion-vc', label: 'Psalion VC' },
    { href: '/bespoke-services', label: 'Bespoke Services' },
    { href: '/#team', label: 'Team' },
    { href: '/mentions', label: 'Press Mentions' },
    { href: '/#clients', label: 'Clients' },
    { href: 'contact', label: 'Contact', isContact: true },
  ];

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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-semibold text-lg">Psalion</span>
            </Link>

            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile/Desktop Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dark Gray Menu Panel */}
          <div className="absolute top-16 right-4 bg-gray-800 rounded-lg shadow-xl min-w-[280px] max-w-[320px]">
            <div className="p-6">
              <div className="space-y-1">
                {navItems.map((item) => (
                  item.isContact ? (
                    <button
                      key={item.href}
                      className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                      onClick={() => handleLinkClick(item.href, item.isContact)}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-white hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                      onClick={() => handleLinkClick(item.href)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
