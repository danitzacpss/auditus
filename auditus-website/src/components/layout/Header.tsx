'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { MenuIcon, CloseIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icon';
import { NAVIGATION, CONTACT_INFO } from '@/data/constants';
import { getWhatsAppUrl } from '@/lib/utils';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-blue-200'
            : 'header-gradient'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-primary-blue rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-primary-blue font-primary">
                  Centro Auditus
                </span>
                <p className="text-xs text-secondary-turquoise font-secondary -mt-1 font-medium">
                  Cuidado Auditivo Profesional
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAVIGATION.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary-600',
                      'font-secondary py-2 px-1',
                      isActiveLink(item.href)
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    )}
                  >
                    {item.label}
                  </Link>

                  {/* Dropdown menu for services */}
                  {item.children && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-medium border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-secondary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="btn-secondary flex items-center space-x-2 text-sm"
              >
                <PhoneIcon size="sm" />
                <span>Llamar</span>
              </a>

              <a
                href={getWhatsAppUrl(CONTACT_INFO.whatsapp, 'Hola, me interesa agendar una cita para evaluación auditiva.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center space-x-2 text-sm"
              >
                <WhatsAppIcon size="sm" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors relative z-[70]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon size="md" /> : <MenuIcon size="md" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed left-0 right-0 top-16 bg-white border-t border-gray-200 shadow-lg z-[60] max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="px-4 py-6 space-y-4">
              {NAVIGATION.map((item) => (
                <div key={item.href} className="space-y-2">
                  <Link
                    href={item.href}
                    className={cn(
                      'block text-lg font-medium py-2 transition-colors font-secondary',
                      isActiveLink(item.href)
                        ? 'text-primary-600 border-l-4 border-primary-600 pl-4'
                        : 'text-gray-700 hover:text-primary-600 pl-4'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>

                  {/* Mobile submenu */}
                  {item.children && (
                    <div className="ml-8 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block text-base text-gray-600 py-2 hover:text-primary-600 transition-colors font-secondary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA Section */}
              <div className="pt-6 mt-6 border-t border-gray-200 space-y-4">
                <Button
                  variant="outline"
                  size="md"
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <PhoneIcon size="sm" />
                  <span>Llamar Ahora</span>
                </Button>
                
                <Button
                  size="md"
                  href={getWhatsAppUrl(CONTACT_INFO.whatsapp, 'Hola, me interesa agendar una cita')}
                  external
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <WhatsAppIcon size="sm" />
                  <span>Contactar por WhatsApp</span>
                </Button>

                {/* Contact Info */}
                <div className="pt-4 text-center">
                  <p className="text-sm text-gray-600 font-secondary">
                    {CONTACT_INFO.address.street}, {CONTACT_INFO.address.office}
                  </p>
                  <p className="text-sm text-gray-600 font-secondary">
                    {CONTACT_INFO.address.city}
                  </p>
                  <p className="text-sm text-primary-600 font-medium font-secondary mt-2">
                    {CONTACT_INFO.phone}
                  </p>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Sticky CTA Bar - Fixed at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-strong no-print">
        <div className="px-4 py-3 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            href={`tel:${CONTACT_INFO.phone}`}
            className="flex-1 flex items-center justify-center space-x-2"
          >
            <PhoneIcon size="sm" />
            <span>Llamar</span>
          </Button>
          
          <Button
            size="sm"
            href={getWhatsAppUrl(CONTACT_INFO.whatsapp, 'Hola, me interesa agendar una cita')}
            external
            className="flex-1 flex items-center justify-center space-x-2"
          >
            <WhatsAppIcon size="sm" />
            <span>WhatsApp</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;