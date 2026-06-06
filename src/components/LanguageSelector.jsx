import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const [lang, setLang] = useState('en');

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
    
    if (selectedLang === 'en') {
        document.cookie = `googtrans=/en/en; path=/`;
        document.cookie = `googtrans=/en/en; domain=.${window.location.hostname}; path=/`;
    } else {
        document.cookie = `googtrans=/en/${selectedLang}; path=/`;
        document.cookie = `googtrans=/en/${selectedLang}; domain=.${window.location.hostname}; path=/`;
    }
    window.location.reload();
  };

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      setLang(match[1]);
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] group pointer-events-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-accent opacity-20 rounded-full blur-md group-hover:opacity-40 transition-opacity"></div>
        <div className="relative flex items-center bg-[rgba(20,30,20,0.8)] backdrop-blur-md border border-[rgba(180,210,140,0.3)] rounded-full pl-3 pr-2 py-1.5 shadow-xl hover:border-[rgba(180,210,140,0.6)] transition-all">
          <Globe className="text-accent w-4 h-4 mr-2" />
          <select 
            className="bg-transparent text-[11px] font-medium uppercase tracking-[1.5px] text-[rgba(240,250,220,0.9)] outline-none cursor-pointer appearance-none pr-4"
            value={lang}
            onChange={handleLanguageChange}
            style={{ 
               backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b4d28c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'right center',
               backgroundSize: '12px'
            }}
          >
            <option value="en" className="bg-black text-white">English</option>
            <option value="hi" className="bg-black text-white">हिंदी</option>
            <option value="mr" className="bg-black text-white">मराठी</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
