
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavigateFunction } from '../types';

interface HeaderProps {
  onNavigate: NavigateFunction;
  activePage?: string;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activePage, transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileInsightOpen, setMobileInsightOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = transparent && !scrolled && !isMenuOpen;
  const textColor = isTransparent ? 'text-white' : 'text-black';
  const bgColor = isTransparent ? 'bg-transparent' : 'bg-white shadow-sm';
  const borderColor = isTransparent ? 'border-transparent' : 'border-b border-gray-100';

  const navItems = [
    { id: 'charts', label: 'Data Library' },
    { id: 'services', label: 'Services' },
  ];

  const insightCategories = [
    "Market Outlook",
    "Investment Strategy",
    "Global Macro"
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${bgColor} ${borderColor} py-4`}>
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate('home')}>
          <div className={`w-10 h-10 border flex items-center justify-center transition-colors duration-300 ${isTransparent ? 'border-white' : 'border-black'}`}>
            <span className={`font-serif font-bold text-lg ${isTransparent ? 'text-[#fad02c]' : 'text-black'}`}>40</span>
          </div>
          <div className="flex flex-col">
            <span className={`font-serif font-bold tracking-widest text-lg leading-none uppercase ${textColor}`}>Years Old</span>
            <span className={`text-[10px] tracking-[0.2em] uppercase ${isTransparent ? 'text-gray-300' : 'text-gray-500'}`}>Investment Research</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 font-medium text-sm tracking-wide">
          
          {/* Insight Dropdown */}
          <div className="group relative h-full py-4">
             <button 
                className={`flex items-center gap-1 hover:text-[#fad02c] transition-colors ${textColor} ${activePage === 'research' ? 'text-[#fad02c] font-bold' : ''}`}
                onClick={() => onNavigate('research')}
             >
              Insight <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 w-56 bg-white shadow-xl border-t-2 border-[#fad02c] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
               <div className="py-2 flex flex-col">
                 {insightCategories.map((cat) => (
                    <button 
                        key={cat}
                        onClick={(e) => { e.stopPropagation(); onNavigate('research'); }}
                        className="text-left px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#fad02c] transition-colors border-b border-gray-50 last:border-0"
                    >
                        {cat}
                    </button>
                 ))}
                 <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate('research'); }}
                    className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-black hover:bg-gray-50 hover:text-[#fad02c] transition-colors"
                 >
                    View All Research
                 </button>
               </div>
            </div>
          </div>

          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`transition-colors hover:text-[#fad02c] ${activePage === item.id ? 'text-[#fad02c] font-bold' : textColor}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => onNavigate('services')}
            className={`px-6 py-2 border transition-all duration-300 font-medium text-sm tracking-wide ${
              isTransparent
                ? 'border-white text-white hover:bg-[#fad02c] hover:border-[#fad02c] hover:text-black'
                : 'border-black text-black hover:bg-black hover:text-[#fad02c]'
            }`}
          >
            Partner with Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className={`lg:hidden ${textColor}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-0 lg:hidden h-[calc(100vh-80px)] overflow-y-auto">
          
          {/* Mobile Insight Accordion */}
          <div className="border-b border-gray-100 py-4">
             <button 
                className="w-full flex justify-between items-center font-serif text-xl font-bold text-gray-900"
                onClick={() => setMobileInsightOpen(!mobileInsightOpen)}
             >
                Insight <ChevronDown size={20} className={`transition-transform duration-300 ${mobileInsightOpen ? 'rotate-180' : ''}`} />
             </button>
             <div className={`overflow-hidden transition-all duration-300 ${mobileInsightOpen ? 'max-h-48 mt-4' : 'max-h-0'}`}>
                <div className="flex flex-col gap-3 pl-4">
                    {insightCategories.map(cat => (
                        <button key={cat} onClick={() => { onNavigate('research'); setIsMenuOpen(false); }} className="text-left text-sm text-gray-600 hover:text-[#fad02c]">
                            {cat}
                        </button>
                    ))}
                    <button onClick={() => { onNavigate('research'); setIsMenuOpen(false); }} className="text-left text-sm font-bold uppercase tracking-widest text-black mt-2">
                        View All
                    </button>
                </div>
             </div>
          </div>

          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setIsMenuOpen(false); }}
              className="text-left font-serif text-xl font-bold text-gray-900 py-4 border-b border-gray-100"
            >
              {item.label}
            </button>
          ))}
          
          <div className="mt-8">
            <button
                onClick={() => { onNavigate('services'); setIsMenuOpen(false); }}
                className="w-full bg-black text-[#fad02c] py-4 font-bold uppercase tracking-widest text-sm"
            >
                Partner with Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
