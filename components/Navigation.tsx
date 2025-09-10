'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  href: string;
  label: string;
  subItems?: {
    href: string;
    label: string;
  }[];
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Alt sayfalar için navigation her zaman beyaz background kullanmalı
  const isSubPage = pathname.includes('/rotada/') || 
    pathname.includes('/rota-aciklamasi') || 
    pathname.includes('/seyahat-tavsiyeleri') || 
    pathname.includes('/album');
  
  const shouldUseLightBackground = isScrolled || isSubPage;

  const navItems: NavItem[] = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/rota-aciklamasi', label: 'Rota Açıklaması' },
    { 
      href: '/rotada', 
      label: 'Rotada',
      subItems: [
        { href: '/rotada/theth-valbone', label: 'Theth - Valbonë' },
        { href: '/rotada/valbone-cerem', label: 'Valbonë - Çerem' },
        { href: '/rotada/cerem-doberdol', label: 'Çerem - Dobërdol' },
        { href: '/rotada/doberdol-milishevc', label: 'Dobërdol - Milishevc' },
        { href: '/rotada/milishevc-reka-allages', label: 'Milishevc - Reka e Allagës' },
        { href: '/rotada/reka-allages-kucishte', label: 'Reka e Allagës - Kuçishtë' },
        { href: '/rotada/kucishte-babino-polje', label: 'Kuçishtë - Babino Polje' },
        { href: '/rotada/babino-polje-plav', label: 'Babino Polje - Plav (Hrid Gölü)' },
        { href: '/rotada/plav-vusanje', label: 'Plav - Vusanje (Gri Ada)' },
        { href: '/rotada/vusanje-theth', label: 'Vusanje - Theth' },
      ]
    },
    { href: '/seyahat-tavsiyeleri', label: 'Seyahat Tavsiyeleri' },
    { href: '/album', label: 'Albüm' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      shouldUseLightBackground ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">BZ</span>
            </div>
            <span className={`font-display font-bold text-xl ${
              shouldUseLightBackground ? 'text-gray-900' : 'text-white'
            }`}>
              Balkanların Zirveleri
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`font-medium transition-colors hover:text-primary-500 ${
                    shouldUseLightBackground ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
                {item.subItems && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                    <div className="py-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              shouldUseLightBackground ? 'text-gray-900' : 'text-white'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 text-gray-700 hover:text-primary-500 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <div className="ml-4 mt-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-2 text-sm text-gray-600 hover:text-primary-500 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}