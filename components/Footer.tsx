import React from 'react';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';

const Footer = () => (
  <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-800">
    <div className="container mx-auto px-6 md:px-8">
      <div className="grid md:grid-cols-3 gap-12 border-b border-gray-800 pb-12 mb-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-[#fad02c] flex items-center justify-center">
              <span className="font-serif font-bold text-[#fad02c] text-xl">40</span>
            </div>
            <span className="font-serif tracking-widest uppercase text-sm">Years Old</span>
          </div>
          <p className="font-serif text-xl text-white mb-4 italic">"Kiến thức + Dữ liệu = Sự thật"</p>
          <p className="text-gray-500 text-xs uppercase tracking-widest leading-relaxed">Investment Research & Wealth Management</p>
        </div>
        
        <div className="md:col-span-1 md:pl-10">
          <h4 className="text-[#fad02c] font-bold uppercase tracking-widest text-xs mb-6">Khám phá</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li><a href="#" className="hover:text-white transition-colors">Nghiên cứu Vĩ mô</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Thư viện Biểu đồ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Dịch vụ Quản lý</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Báo cáo Mẫu</a></li>
          </ul>
        </div>

        <div className="md:col-span-1 md:text-right">
          <h4 className="text-[#fad02c] font-bold uppercase tracking-widest text-xs mb-6">Liên hệ</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li className="flex items-center gap-3 md:justify-end"><span>support@40yo.vn</span><Mail size={16} className="text-[#fad02c]" /></li>
            <li className="flex items-center gap-3 md:justify-end"><span>0901 080 494</span><Phone size={16} className="text-[#fad02c]" /></li>
            <li className="flex items-center gap-3 md:justify-end"><span>facebook.com/40yo.vn</span><Facebook size={16} className="text-[#fad02c]" /></li>
            <li className="flex items-start gap-3 md:justify-end mt-4"><span className="leading-relaxed">Tầng 1, chung cư No11A,<br />phường Phúc Lợi, Hà Nội</span><MapPin size={16} className="text-[#fad02c] mt-1" /></li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
        <p>© 2025 40 Years Old. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;