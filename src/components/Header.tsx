import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  bagCount: number;
  onOpenBag: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Shop', href: '#shop' },
  { label: 'Collections', href: '#collections' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC<HeaderProps> = ({ bagCount, onOpenBag }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#faf7f0]/95 backdrop-blur-sm border-b border-[#d8cebc]">
      <div className="max-w-[1600px] mx-auto h-16 md:h-20 px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="text-base sm:text-lg font-bold tracking-[0.2em] text-[#161412] whitespace-nowrap shrink-0 uppercase"
        >
          HAMILTON EMPIRE
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-[0.02em] text-[#161412]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:underline underline-offset-4 decoration-[#8f7035] transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open Shopping Bag (${bagCount} items)`}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-3 sm:px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase text-[#161412] bg-[#fffdf9] border border-[#d8cebc] hover:border-[#8f7035] transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#8f7035]" strokeWidth={1.6} />
            <span className="hidden sm:inline">Shopping Bag</span>
            <span className="tabular-nums font-semibold">({bagCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#161412] bg-[#fffdf9] border border-[#d8cebc] hover:border-[#8f7035]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-[#d8cebc] bg-[#faf7f0] px-4 py-3 flex flex-wrap gap-x-6 gap-y-2"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#161412] hover:underline underline-offset-4 decoration-[#8f7035] whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
