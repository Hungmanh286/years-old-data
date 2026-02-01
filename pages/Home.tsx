import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Database } from 'lucide-react';
import { PageProps } from '../types';

const HomePage: React.FC<PageProps> = ({ onNavigate }) => {
  const performanceMetrics = [
    { label: "Lợi nhuận TB/Năm", value: "35.4%", sub: "CAGR 3 Năm", color: "text-white" },
    { label: "Alpha (Vượt trội)", value: "+21.5%", sub: "So với VN-Index", color: "text-[#fad02c]" },
    { label: "Rủi ro (VaR 10%)", value: "-19.1%", sub: "Đã kiểm soát", color: "text-gray-400" },
  ];

  const insights = [
    {
      category: "Market Outlook",
      title: "Trật tự cũ và Kỷ nguyên mới",
      excerpt: "Thế giới hậu Thế chiến II chứng kiến sự trỗi dậy của Hoa Kỳ. Chúng ta đang đứng trước ngưỡng cửa của sự thay đổi trật tự dòng tiền toàn cầu.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      category: "Investment Strategy",
      title: "Chu kỳ Tín dụng & Lạm phát",
      excerpt: "Phân tích tác động của lãi suất thực dương lên khả năng trả nợ của khối doanh nghiệp sản xuất và chiến lược phòng thủ.",
      image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      category: "Global Macro",
      title: "Sự dịch chuyển chuỗi cung ứng",
      excerpt: "Cơ hội và thách thức cho các thị trường mới nổi khi dòng vốn FDI tái định hình cấu trúc kinh tế khu vực.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} activePage="home" transparent={true} />

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Architecture" 
            className="w-full h-full object-cover grayscale" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="container mx-auto px-6 md:px-8 relative z-10 pt-10">
          <div className="max-w-3xl border-l-2 border-[#fad02c] pl-8 md:pl-12">
            <p className="text-[#fad02c] font-medium tracking-[0.2em] uppercase mb-4 text-sm animate-fade-in-up">Quantitative & Macro Research</p>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-tight mb-8">
              We turn Data <br />into <span className="italic text-gray-400">Certainty.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              40 Years Old áp dụng các mô hình định lượng và phân tích vĩ mô chuyên sâu để tìm ra mối quan hệ nhân quả trong nền kinh tế.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate('article')} className="bg-[#fad02c] text-black px-8 py-4 font-semibold tracking-wide hover:bg-white transition-colors">
                Khám phá "Ourlook" tháng 3
              </button>
              <button onClick={() => onNavigate('services')} className="border border-white text-white px-8 py-4 font-semibold tracking-wide hover:bg-white hover:text-black transition-colors">
                Triết lý đầu tư
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE METRICS */}
      <section className="bg-[#111] text-white py-24 border-b border-gray-800">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl mb-6">Hiệu suất được kiểm chứng</h2>
              <p className="text-gray-400 leading-relaxed mb-8 font-light text-lg">
                Hệ thống "Cỗ máy đầu tư" của chúng tôi được thiết kế để tạo ra Alpha trong mọi điều kiện thị trường. Chúng tôi tập trung vào quản trị rủi ro đuôi (Tail risk).
              </p>
              <div className="flex flex-col md:flex-row justify-between gap-8 mt-12 border-t border-gray-800 pt-8">
                {performanceMetrics.map((metric, idx) => (
                  <div key={idx} className="flex-1">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{metric.label}</p>
                    <p className={`text-4xl lg:text-5xl font-serif ${metric.color}`}>{metric.value}</p>
                    <p className="text-sm text-gray-500 mt-2 font-mono opacity-70">{metric.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] p-8 border border-gray-800 relative shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                <h3 className="uppercase tracking-widest text-xs font-semibold text-gray-400">Cumulative Performance (2023 - Present)</h3>
                <div className="flex gap-2">
                  <span className="w-3 h-3 bg-[#fad02c]"></span> <span className="text-xs text-gray-400 mr-4">40YO Strategy</span>
                  <span className="w-3 h-3 bg-gray-600"></span> <span className="text-xs text-gray-400">VNI Adjusted</span>
                </div>
              </div>
              <div className="relative h-64 w-full flex items-end gap-1">
                <div className="absolute inset-0 grid grid-rows-4"> {[1, 2, 3, 4].map(i => <div key={i} className="border-t border-gray-800 w-full h-full"></div>)} </div>
                <div className="w-full flex justify-between items-end h-full px-4 relative z-10">
                  <div className="w-1/3 h-full flex items-end justify-center gap-4"> 
                    <div className="w-8 bg-[#fad02c] h-[35%] opacity-80"></div> 
                    <div className="w-8 bg-gray-700 h-[15%]"></div> 
                  </div>
                  <div className="w-1/3 h-full flex items-end justify-center gap-4"> 
                    <div className="w-8 bg-[#fad02c] h-[85%] opacity-80"></div> 
                    <div className="w-8 bg-gray-700 h-[45%]"></div> 
                  </div>
                  <div className="w-1/3 h-full flex items-end justify-center gap-4"> 
                    <div className="w-8 bg-[#fad02c] h-[100%] shadow-[0_0_15px_rgba(250,208,44,0.3)] relative"> 
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-black bg-[#fad02c] text-xs font-bold px-2 py-0.5">153.9%</span> 
                    </div> 
                    <div className="w-8 bg-gray-700 h-[72%]"></div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT SOLUTIONS */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <span className="text-[#fad02c] font-bold tracking-widest uppercase text-xs mb-2 block">Wealth Management</span>
              <h2 className="font-serif text-4xl text-black">Các giải pháp Đầu tư</h2>
            </div>
            <button onClick={() => onNavigate('services')} className="hidden md:flex items-center gap-2 border-b border-black pb-1 hover:text-[#fad02c] hover:border-[#fad02c] transition-colors mt-6 md:mt-0">
              So sánh chi tiết <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid lg:grid-cols-3 gap-0 border border-gray-200 bg-white shadow-sm">
            {[
              { title: "Low Risk Strategy", target: "25%", risk: "-20%", desc: "Bảo toàn vốn với mức tăng trưởng ổn định cao hơn thị trường." },
              { title: "Standard Strategy", target: "30%", risk: "-25%", desc: "Cân bằng tối ưu giữa tăng trưởng tài sản và kiểm soát rủi ro.", active: true },
              { title: "High Risk Strategy", target: "35%", risk: "-30%", desc: "Tối đa hóa lợi nhuận dài hạn cho nhà đầu tư chấp nhận biến động." }
            ].map((item, idx) => (
              <div key={idx} className={`p-10 border-r border-gray-200 relative group transition-all duration-300 ${item.active ? 'bg-black text-white' : 'hover:bg-gray-50'}`}>
                {item.active && <div className="absolute top-0 left-0 w-full h-1 bg-[#fad02c]"></div>}
                <h3 className={`font-serif text-2xl mb-4 ${item.active ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm mb-12 h-16 ${item.active ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest opacity-60">Target Return</span>
                    <div className={`text-3xl font-light ${item.active ? 'text-[#fad02c]' : 'text-gray-900'}`}>{item.target}</div>
                  </div>
                </div>
                <div className="mt-12 pt-6 border-t border-dashed border-gray-700/30">
                  <button onClick={() => onNavigate('services')} className={`w-full text-left flex justify-between items-center text-sm font-bold uppercase tracking-wider ${item.active ? 'text-white' : 'text-gray-900 group-hover:text-[#fad02c]'}`}>
                    Xem chi tiết <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-4xl text-black">Góc nhìn & Nghiên cứu</h2>
            <button onClick={() => onNavigate('research')} className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 hover:border-black transition-all">View All</button>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {insights.map((post, idx) => (
              <article key={idx} onClick={() => onNavigate('article')} className="group cursor-pointer flex flex-col">
                <div className="overflow-hidden mb-6 aspect-video bg-gray-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover image-filter transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="border-t border-black pt-4 mb-3"> <span className="text-xs font-bold text-[#fad02c] uppercase tracking-widest">{post.category}</span> </div>
                <h3 className="font-serif text-2xl font-medium leading-snug mb-3 group-hover:text-[#d4af37] transition-colors">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900">
                  <span className="group-hover:translate-x-2 transition-transform duration-300">Read Analysis</span> <ArrowRight size={12} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DATA LIBRARY PREVIEW */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-[#fad02c] font-bold tracking-widest uppercase text-xs mb-3 block">Data Library</span>
              <h2 className="font-serif text-4xl text-black mb-6">Dữ liệu không nói dối.</h2>
              <p className="text-gray-600 mb-8 font-light text-lg leading-relaxed">
                Truy cập kho dữ liệu kinh tế vĩ mô và thị trường được cập nhật thực. Chúng tôi cung cấp cái nhìn khách quan nhất về sức khỏe nền kinh tế.
              </p>
              <button onClick={() => onNavigate('charts')} className="flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#fad02c] hover:text-black transition-colors">
                <Database size={18} /> Explore Charts
              </button>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 shadow-xl border border-gray-100 relative">
                <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-serif text-2xl text-gray-900">US Recession Probability</h3>
                    <p className="text-xs text-gray-400 font-mono mt-1 uppercase">Source: NY Fed / 40 Years Old Data</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-light text-black">46.3%</div>
                    <div className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 mt-1 inline-block">ALERT ZONE</div>
                  </div>
                </div>
                <div className="h-64 w-full relative">
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-full h-px bg-gray-100"></div>)}
                    <div className="w-full h-px bg-gray-900"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between px-2 gap-1">
                    {[10, 15, 20, 45, 30, 60, 80, 50, 40, 35, 25, 46].map((h, i) => (
                      <div key={i} className="flex-1 bg-gray-200 hover:bg-[#fad02c] transition-colors relative group" style={{ height: `${h}%` }}></div>
                    ))}
                    <div className="flex-1 bg-black" style={{ height: '46.3%' }}></div>
                  </div>
                  <div className="absolute top-[50%] w-full border-t border-red-500 border-dashed opacity-50"></div>
                </div>
                <div className="flex justify-between mt-4 text-xs font-mono text-gray-400 uppercase">
                  <span>2015</span> <span>2020</span> <span>2025 (Forecast)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;