import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav 
        className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-10 ${
          scrolled ? 'opacity-90' : 'opacity-100'
        }`}
        style={{ pointerEvents: 'none' }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <a 
            href="/" 
            className="text-lg tracking-wider text-[rgba(245,250,230,0.8)] pointer-events-auto"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            KrishiMitra
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-7 pointer-events-auto items-center">
            <Link to="/dashboard" className="text-[11px] tracking-[2px] uppercase text-[rgba(215,230,190,0.55)] hover:text-accent font-medium transition-colors">
              Dashboard
            </Link>
            <Link to="/weather" className="text-[11px] tracking-[2px] uppercase text-[rgba(215,230,190,0.55)] hover:text-accent font-medium transition-colors">
              Weather
            </Link>
            <Link to="/assistant" className="text-[11px] tracking-[2px] uppercase text-[rgba(215,230,190,0.55)] hover:text-accent font-medium transition-colors">
              AI Assistant
            </Link>
            <a href="/login.html" className="px-4 py-2 text-[11px] tracking-[2px] uppercase text-accent border border-[rgba(180,210,140,0.25)] rounded-full hover:bg-[rgba(40,65,40,0.5)] transition-all">
              Login
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden pointer-events-auto w-9 h-9 bg-[rgba(15,25,15,0.4)] backdrop-blur-md border border-[rgba(140,180,120,0.15)] rounded-lg flex items-center justify-center text-[rgba(215,230,190,0.7)]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
          <Link to="/dashboard" className="text-sm tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">
            Dashboard
          </Link>
          <Link to="/weather" className="text-sm tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">
            Weather
          </Link>
          <Link to="/assistant" className="text-sm tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">
            AI Assistant
          </Link>
          <a href="/login.html" className="mt-4 px-6 py-3 text-xs tracking-[2px] uppercase text-accent border border-[rgba(180,210,140,0.25)] rounded-full hover:bg-[rgba(40,65,40,0.5)] transition-all">
            Login
          </a>
        </div>
      )}
    </>
  );
};

export default Navigation;
