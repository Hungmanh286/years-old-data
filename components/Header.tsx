
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

  const scrollToContact = () => {
    if (location.pathname !== '/services') {
      navigate('/services', { state: { scrollTo: 'contact-form' } });
    } else {
      const element = document.getElementById('contact-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${bgColor} ${borderColor} py-4`}>
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/home')}>
          <svg width="184" height="32" viewBox="0 0 184 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#FAD02C" />
            <path d="M24.3333 11.8333L17.25 18.9166L13.0833 14.7499L7.66666 20.1666" stroke="#111827" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19.3333 11.8333H24.3333V16.8333" stroke="#111827" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M40.9438 20.4831V18.0991L46.9214 8.68182H48.9768V11.9817H47.7603L43.992 17.9453V18.0572H52.4865V20.4831H40.9438ZM47.8163 23V19.756L47.8722 18.7004V8.68182H50.7107V23H47.8163ZM60.1175 23.3146C58.915 23.3099 57.8802 23.014 57.0133 22.4267C56.1511 21.8394 55.4869 20.9888 55.0208 19.8749C54.5594 18.7609 54.331 17.4209 54.3357 15.8549C54.3357 14.2935 54.5664 12.9628 55.0278 11.8629C55.4939 10.7629 56.1581 9.92627 57.0203 9.35298C57.8872 8.77504 58.9196 8.48606 60.1175 8.48606C61.3153 8.48606 62.3454 8.77504 63.2076 9.35298C64.0745 9.93093 64.741 10.7699 65.2071 11.8699C65.6732 12.9652 65.9039 14.2935 65.8993 15.8549C65.8993 17.4256 65.6662 18.7679 65.2001 19.8819C64.7387 20.9958 64.0769 21.8464 63.2146 22.4337C62.3524 23.021 61.32 23.3146 60.1175 23.3146ZM60.1175 20.8047C60.9378 20.8047 61.5926 20.3922 62.082 19.5673C62.5714 18.7423 62.8138 17.5048 62.8091 15.8549C62.8091 14.7689 62.6973 13.8647 62.4735 13.1423C62.2545 12.4198 61.9422 11.8768 61.5367 11.5133C61.1359 11.1497 60.6628 10.968 60.1175 10.968C59.3018 10.968 58.6493 11.3758 58.1599 12.1915C57.6705 13.0071 57.4235 14.2282 57.4188 15.8549C57.4188 16.9549 57.5284 17.873 57.7474 18.6095C57.9711 19.3412 58.2857 19.8912 58.6912 20.2594C59.0967 20.623 59.5721 20.8047 60.1175 20.8047ZM71.8594 8.68182H75.2501L78.5151 14.8481H78.6549L81.9198 8.68182H85.3106L80.0881 17.9383V23H77.0819V17.9383L71.8594 8.68182ZM86.9641 23V8.68182H96.612V11.1777H89.9913V14.5895H96.1157V17.0854H89.9913V20.5041H96.64V23H86.9641ZM101.487 23H98.2428L103.186 8.68182H107.087L112.023 23H108.779L105.192 11.9537H105.08L101.487 23ZM101.284 17.372H108.946V19.7351H101.284V17.372ZM113.746 23V8.68182H119.395C120.476 8.68182 121.399 8.87524 122.164 9.2621C122.933 9.64429 123.517 10.1873 123.918 10.8911C124.324 11.5902 124.527 12.4128 124.527 13.359C124.527 14.3098 124.321 15.1278 123.911 15.8129C123.501 16.4934 122.907 17.0154 122.129 17.379C121.355 17.7425 120.418 17.9243 119.318 17.9243H115.536V15.4913H118.829C119.407 15.4913 119.887 15.4121 120.269 15.2536C120.651 15.0952 120.935 14.8575 121.122 14.5405C121.313 14.2236 121.408 13.8297 121.408 13.359C121.408 12.8836 121.313 12.4828 121.122 12.1565C120.935 11.8302 120.649 11.5832 120.262 11.4154C119.88 11.243 119.397 11.1567 118.815 11.1567H116.773V23H113.746ZM121.478 16.4841L125.037 23H121.695L118.213 16.4841H121.478ZM134.433 12.7997C134.377 12.2357 134.137 11.7976 133.713 11.4853C133.289 11.1731 132.713 11.0169 131.986 11.0169C131.492 11.0169 131.075 11.0868 130.735 11.2267C130.395 11.3618 130.134 11.5506 129.952 11.7929C129.775 12.0353 129.686 12.3103 129.686 12.6179C129.677 12.8743 129.73 13.098 129.847 13.2891C129.968 13.4802 130.134 13.6456 130.343 13.7855C130.553 13.9206 130.795 14.0395 131.07 14.142C131.345 14.2399 131.639 14.3238 131.951 14.3937L133.238 14.7013C133.862 14.8412 134.436 15.0276 134.958 15.2606C135.48 15.4937 135.932 15.7803 136.314 16.1206C136.696 16.4608 136.992 16.8616 137.202 17.3231C137.416 17.7845 137.526 18.3135 137.53 18.9101C137.526 19.7863 137.302 20.5461 136.859 21.1893C136.421 21.8278 135.787 22.3242 134.958 22.6784C134.133 23.028 133.138 23.2027 131.972 23.2027C130.816 23.2027 129.81 23.0256 128.952 22.6714C128.099 22.3172 127.433 21.7928 126.953 21.0984C126.477 20.3992 126.228 19.5346 126.204 18.5046H129.134C129.166 18.9847 129.304 19.3855 129.546 19.7071C129.793 20.024 130.122 20.2641 130.532 20.4272C130.947 20.5857 131.415 20.6649 131.937 20.6649C132.45 20.6649 132.895 20.5903 133.273 20.4412C133.655 20.292 133.951 20.0846 134.161 19.819C134.37 19.5533 134.475 19.248 134.475 18.9031C134.475 18.5815 134.38 18.3112 134.189 18.0921C134.002 17.873 133.727 17.6866 133.364 17.5328C133.005 17.379 132.564 17.2392 132.042 17.1133L130.483 16.7218C129.276 16.4282 128.323 15.9691 127.624 15.3445C126.925 14.72 126.577 13.8787 126.582 12.8207C126.577 11.9537 126.808 11.1964 127.274 10.5485C127.745 9.90063 128.39 9.39493 129.211 9.03138C130.031 8.66784 130.963 8.48606 132.007 8.48606C133.07 8.48606 133.997 8.66784 134.79 9.03138C135.587 9.39493 136.207 9.90063 136.649 10.5485C137.092 11.1964 137.321 11.9468 137.335 12.7997H134.433ZM157.281 15.8409C157.281 17.4023 156.985 18.7306 156.393 19.8259C155.806 20.9213 155.004 21.7579 153.988 22.3358C152.976 22.9091 151.839 23.1958 150.576 23.1958C149.304 23.1958 148.162 22.9068 147.15 22.3288C146.139 21.7509 145.34 20.9143 144.752 19.819C144.165 18.7237 143.871 17.3976 143.871 15.8409C143.871 14.2795 144.165 12.9512 144.752 11.8559C145.34 10.7606 146.139 9.92627 147.15 9.35298C148.162 8.77504 149.304 8.48606 150.576 8.48606C151.839 8.48606 152.976 8.77504 153.988 9.35298C155.004 9.92627 155.806 10.7606 156.393 11.8559C156.985 12.9512 157.281 14.2795 157.281 15.8409ZM154.212 15.8409C154.212 14.8295 154.06 13.9766 153.757 13.2821C153.459 12.5876 153.037 12.0609 152.492 11.7021C151.946 11.3432 151.308 11.1637 150.576 11.1637C149.844 11.1637 149.206 11.3432 148.661 11.7021C148.115 12.0609 147.691 12.5876 147.388 13.2821C147.09 13.9766 146.941 14.8295 146.941 15.8409C146.941 16.8523 147.09 17.7053 147.388 18.3997C147.691 19.0942 148.115 19.6209 148.661 19.9798C149.206 20.3386 149.844 20.5181 150.576 20.5181C151.308 20.5181 151.946 20.3386 152.492 19.9798C153.037 19.6209 153.459 19.0942 153.757 18.3997C154.06 17.7053 154.212 16.8523 154.212 15.8409ZM159.523 23V8.68182H162.55V20.5041H168.689V23H159.523ZM175.769 23H170.694V8.68182H175.811C177.251 8.68182 178.491 8.96846 179.531 9.54175C180.57 10.1104 181.369 10.9284 181.929 11.9957C182.493 13.063 182.775 14.3401 182.775 15.8269C182.775 17.3184 182.493 18.6001 181.929 19.6721C181.369 20.7441 180.565 21.5668 179.517 22.1401C178.473 22.7134 177.223 23 175.769 23ZM173.721 20.4062H175.643C176.538 20.4062 177.291 20.2478 177.902 19.9308C178.517 19.6092 178.978 19.1128 179.286 18.4417C179.598 17.7658 179.754 16.8943 179.754 15.8269C179.754 14.7689 179.598 13.9043 179.286 13.2332C178.978 12.562 178.519 12.0679 177.909 11.751C177.298 11.4341 176.545 11.2756 175.65 11.2756H173.721V20.4062Z" fill={isTransparent ? "#FFFFFF" : "#111827"} />
          </svg>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 font-medium text-sm tracking-wide">

          <button
            className={`flex items-center gap-1 hover:text-[#fad02c] transition-colors ${textColor} ${location.pathname === '/research' ? 'text-[#fad02c] font-bold' : ''}`}
            onClick={() => navigate('/research')}
          >
            Reasearch
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
            onClick={scrollToContact}
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
              onClick={() => { scrollToContact(); setIsMenuOpen(false); }}
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
