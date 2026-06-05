import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login.html';
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

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
            {currentUser ? (
              <button onClick={handleLogout} className="px-4 py-2 text-[11px] tracking-[2px] uppercase text-red-400 border border-[rgba(248,113,113,0.25)] rounded-full hover:bg-[rgba(248,113,113,0.1)] transition-all">
                Logout
              </button>
            ) : (
              <a href="/login.html" className="px-4 py-2 text-[11px] tracking-[2px] uppercase text-accent border border-[rgba(180,210,140,0.25)] rounded-full hover:bg-[rgba(40,65,40,0.5)] transition-all">
                Login
              </a>
            )}

            {/* Three Bar Dropdown Menu */}
            <div className="relative inline-block pointer-events-auto ml-2">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-transparent border border-[rgba(180,210,140,0.25)] rounded-md p-1.5 cursor-pointer text-[rgba(215,230,190,0.7)] flex items-center justify-center transition-all hover:bg-[rgba(40,65,40,0.5)] hover:text-accent"
              >
                <Menu size={18} />
              </button>
              
              {isOpen && (
                <div className="absolute top-[40px] right-0 bg-[rgba(10,18,10,0.85)] backdrop-blur-md border border-[rgba(140,180,120,0.15)] rounded-lg min-w-[200px] flex flex-col py-2 z-[1000] shadow-2xl animate-fade-in">
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] border-b border-[rgba(140,180,120,0.05)] transition-colors">Dashboard</Link>
                  <Link to="/assistant" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] border-b border-[rgba(140,180,120,0.05)] transition-colors">AI Assistant</Link>
                  <Link to="/disease" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] border-b border-[rgba(140,180,120,0.05)] transition-colors">Disease Detection</Link>
                  <Link to="/crop" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] border-b border-[rgba(140,180,120,0.05)] transition-colors">Crop Recommendation</Link>
                  <Link to="/weather" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] border-b border-[rgba(140,180,120,0.05)] transition-colors">Weather Intelligence</Link>
                  <Link to="/irrigation" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] border-b border-[rgba(140,180,120,0.05)] transition-colors">Irrigation Advisor</Link>
                  <Link to="/market" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] border-b border-[rgba(140,180,120,0.05)] transition-colors">Market Intelligence</Link>
                  <Link to="/schemes" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] border-b border-[rgba(140,180,120,0.05)] transition-colors">Government Schemes</Link>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] border-b border-[rgba(140,180,120,0.05)] transition-colors">Farmer Profile</Link>
                  <Link to="/alerts" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] border-b border-[rgba(140,180,120,0.05)] transition-colors">Alerts Center</Link>
                  <Link to="/analytics" onClick={() => setIsOpen(false)} className="text-[rgba(215,230,190,0.7)] hover:text-accent hover:bg-[rgba(40,65,40,0.4)] px-5 py-2.5 text-[13px] tracking-[1px] transition-colors">Analytics</Link>
                </div>
              )}
            </div>
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
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-6 overflow-y-auto py-10">
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">Dashboard</Link>
          <Link to="/assistant" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">AI Assistant</Link>
          <Link to="/disease" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">Disease Detection</Link>
          <Link to="/crop" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">Crop Recommendation</Link>
          <Link to="/weather" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">Weather Intelligence</Link>
          <Link to="/irrigation" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">Irrigation Advisor</Link>
          <Link to="/market" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">Market Intelligence</Link>
          <Link to="/schemes" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">Government Schemes</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">Farmer Profile</Link>
          <Link to="/alerts" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">Alerts Center</Link>
          <Link to="/analytics" onClick={() => setIsOpen(false)} className="text-[13px] tracking-[3px] uppercase text-[rgba(215,230,190,0.7)] hover:text-accent transition-colors">Analytics</Link>
          
          <div className="w-12 h-px bg-[rgba(140,180,120,0.2)] my-2"></div>
          
          {currentUser ? (
            <button onClick={handleLogout} className="px-6 py-2.5 text-[11px] tracking-[2px] uppercase text-red-400 border border-[rgba(248,113,113,0.25)] rounded-full hover:bg-[rgba(248,113,113,0.1)] transition-all">
              Logout
            </button>
          ) : (
            <a href="/login.html" className="px-6 py-2.5 text-[11px] tracking-[2px] uppercase text-accent border border-[rgba(180,210,140,0.25)] rounded-full hover:bg-[rgba(40,65,40,0.5)] transition-all">
              Login
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default Navigation;
