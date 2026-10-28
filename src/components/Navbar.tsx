import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Labs', path: '/labs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0C0C0C]/85 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo / Identity */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[#D7E2EA] hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
            <Shield size={16} className="text-[#BBCCD7]" />
          </div>
          <span className="font-black tracking-widest text-lg sm:text-xl uppercase">
            {PORTFOLIO_DATA.identity.onlineIdentity}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `text-sm lg:text-base font-medium uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-white border-b-2 border-[#BBCCD7] pb-1'
                    : 'text-[#D7E2EA]/75 hover:text-white hover:opacity-100'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* CTA / Quick Email */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`mailto:${PORTFOLIO_DATA.contact.primaryEmail}`}
            className="text-xs uppercase tracking-widest text-[#D7E2EA] border border-white/20 rounded-full px-5 py-2 hover:bg-white/10 hover:border-white transition-all font-medium"
          >
            Email Me
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#D7E2EA] p-2.5 rounded-xl hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C0C0C]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium uppercase tracking-wider py-3 px-3.5 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'text-white font-bold bg-white/10 border border-white/15'
                      : 'text-[#D7E2EA]/80 hover:text-white hover:bg-white/5 active:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#D7E2EA]/60">Direct Inquiries</span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </span>
            </div>
            <a
              href={`mailto:${PORTFOLIO_DATA.contact.primaryEmail}`}
              className="text-xs uppercase tracking-widest text-center text-white font-medium border border-white/20 rounded-xl py-3 px-4 hover:bg-white/10 active:bg-white/15 transition-all"
            >
              Email Mark Daniel
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
