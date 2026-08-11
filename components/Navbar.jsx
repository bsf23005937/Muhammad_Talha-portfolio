'use client';
import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/portfolio' },
  { label: 'More Work', href: '/portfolio#more-work' },
  { label: 'Skills', href: '/#skills' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg shadow-purple-100/40">
      <div className="bg-[#A47DFF] px-4 py-2 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs font-medium sm:text-sm">
          <span>Personal developer portfolio</span>
          <Link href="/contact" className="rounded-full bg-white/15 px-3 py-1 font-semibold hover:bg-white/25">
            Start a project
          </Link>
        </div>
      </div>
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="group flex items-center gap-3" aria-label="Muhammad Talha portfolio home">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A47DFF] text-sm font-bold tracking-tight text-white shadow-lg shadow-purple-100 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                MT
              </span>
              <span className="leading-tight">
                <span className="block text-base font-bold tracking-tight text-gray-900">Muhammad Talha</span>
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Portfolio</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="relative text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-[#A47DFF]">
                  {link.label}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-[#A47DFF] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="/contact" 
                className="hidden rounded-full bg-[#A47DFF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-600 sm:block"
              >
                Start a project
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-2xl border border-purple-100 p-2 text-gray-700 transition hover:border-[#A47DFF] hover:text-[#A47DFF] lg:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="border-t border-gray-100 py-4 lg:hidden">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-purple-50 hover:text-[#A47DFF]"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 rounded-2xl bg-[#A47DFF] px-6 py-3 text-center font-semibold text-white shadow-lg shadow-purple-100 transition-all active:scale-95"
                >
                  Start a project
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
