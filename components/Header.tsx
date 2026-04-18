
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  activePage?: string;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ activePage, transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileInsightOpen, setMobileInsightOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${bgColor} ${borderColor} py-4`}>
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/home')}>
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

          <button
            className={`flex items-center gap-1 hover:text-[#fad02c] transition-colors ${textColor} ${location.pathname === '/research' ? 'text-[#fad02c] font-bold' : ''}`}
            onClick={() => navigate('/research')}
          >
            Insight
          </button>

          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(`/${item.id}`)}
              className={`transition-colors hover:text-[#fad02c] ${location.pathname === `/${item.id}` ? 'text-[#fad02c] font-bold' : textColor}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => navigate('/services')}
            className={`px-6 py-2 border transition-all duration-300 font-medium text-sm tracking-wide ${isTransparent
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

          <button
            className="text-left font-serif text-xl font-bold text-gray-900 py-4 border-b border-gray-100"
            onClick={() => { navigate('/research'); setIsMenuOpen(false); }}
          >
            Insight
          </button>

          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { navigate(`/${item.id}`); setIsMenuOpen(false); }}
              className="text-left font-serif text-xl font-bold text-gray-900 py-4 border-b border-gray-100"
            >
              {item.label}
            </button>
          ))}

          <div className="mt-8">
            <button
              onClick={() => { navigate('/services'); setIsMenuOpen(false); }}
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
