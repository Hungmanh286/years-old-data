import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { ArrowRight, Search, Mail, Calendar } from 'lucide-react';

const ResearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredSeries = [
    {
      id: 1,
      title: "Trật tự cũ & Kỷ nguyên mới",
      subtitle: "GEOPOLITICS PARADIGM SHIFT",
      desc: "Chúng ta đang sống trong giai đoạn chuyển giao quyền lực toàn cầu.",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      overlayImage: "https://images.unsplash.com/photo-1605218427306-022ba8c53243?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 2,
      title: "Cỗ máy Đầu tư: Sự thật & Dữ liệu",
      subtitle: "SYSTEMATIC INVESTMENT",
      desc: "Loại bỏ cảm tính ra khỏi quyết định đầu tư.",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      overlayImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 3,
      title: "Vòng xoáy Lạm phát & Tiền tệ",
      subtitle: "CIRCULATION OF MONEY",
      desc: "Theo dấu dòng tiền để hiểu sức khỏe nền kinh tế.",
      image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      overlayImage: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    }
  ];

  const regions = ["THẾ GIỚI", "MỸ", "TRUNG QUỐC", "EU", "NHẬT BẢN", "VIỆT NAM", "KHÁC"];
  const seriesList = ["Circulation of money", "Trade war", "Outlook", "Market Update"];
  const archives = [
    { year: 2025, months: ["Tháng 5", "Tháng 4", "Tháng 3", "Tháng 2", "Tháng 1"] },
    { year: 2024, months: ["Tháng 12", "Tháng 11", "Tháng 10"] }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSeries.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const articles = [
    {
      id: 1,
      title: "Cập nhật khu vực sản xuất và việc làm US trong tháng 3",
      excerpt: "Chỉ số PMI Sản xuất là thước đo quan trọng phản ánh sức khỏe của lĩnh vực sản xuất.",
      date: "04 May 2025",
      category: "Mỹ",
      series: "Outlook",
      image: "https://images.unsplash.com/photo-1565514020176-dbf2277f2c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Sự trỗi dậy của Trật tự Tiền tệ Mới",
      excerpt: "Phân tích sự dịch chuyển dòng vốn toàn cầu khi các ngân hàng trung ương đa dạng hóa dự trữ.",
      date: "01 May 2025",
      category: "Thế giới",
      series: "Circulation of money",
      image: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Chiến tranh thương mại: Ai là người chiến thắng?",
      excerpt: "Tác động của thuế quan mới lên chuỗi cung ứng công nghệ.",
      date: "28 Apr 2025",
      category: "Trung Quốc",
      series: "Trade war",
      image: "https://images.unsplash.com/photo-1526304640152-d4619684e884?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Navigation Controls */}
      <div className="fixed bottom-8 right-8 z-50">
        <Navigation />
      </div>

      <div className="h-24"></div>

      {/* FEATURED SLIDER */}
      <section className="bg-white pb-12 pt-6">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-black font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#fad02c]"></span> Featured Series
          </h2>
          <div className="relative bg-gray-50 border border-gray-200 overflow-hidden h-[500px]">
            {featuredSeries.map((slide, index) => (
              <div key={slide.id} className={`grid lg:grid-cols-12 transition-opacity duration-700 absolute inset-0 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <div className="lg:col-span-4 p-10 lg:p-16 flex flex-col justify-center bg-white z-20">
                  <span className="text-[#fad02c] font-bold tracking-widest uppercase text-xs mb-4">{slide.subtitle}</span>
                  <h3 className="font-serif text-3xl md:text-4xl text-black mb-6 leading-tight">{slide.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 font-light line-clamp-4">{slide.desc}</p>
                  <button onClick={() => navigate('/article')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-black pb-1 w-fit hover:text-[#fad02c] hover:border-[#fad02c] transition-all">
                    Explore Series <ArrowRight size={14} />
                  </button>
                </div>
                <div className="lg:col-span-8 relative h-full">
                  <div className="absolute inset-0 w-2/3">
                    <img src={slide.image} alt="Background" className="w-full h-full object-cover grayscale opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute inset-y-0 right-0 w-2/3 overflow-hidden" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}>
                    <img src={slide.overlayImage} alt="Modern" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute bottom-0 left-0 w-full lg:w-1/3 p-8 z-30 flex items-center justify-between gap-4">
              <div className="flex gap-2 flex-1">
                {featuredSeries.map((_, idx) => (
                  <div key={idx} className="h-1 bg-gray-200 flex-1 rounded-full overflow-hidden">
                    <div className={`h-full bg-black transition-all duration-300 ${idx === currentSlide ? 'animate-progress' : idx < currentSlide ? 'w-full' : 'w-0'}`} style={{ animationDuration: '8s' }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <h2 className="font-serif text-2xl">Bài viết mới nhất</h2>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {articles.length} Results</span>
              </div>
              <div className="space-y-12">
                {articles.map((article) => (
                  <article key={article.id} onClick={() => navigate('/article')} className="group cursor-pointer grid md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-5 overflow-hidden aspect-[4/3] bg-gray-100 relative">
                      <div className="absolute top-0 left-0 bg-black text-white text-[10px] font-bold px-3 py-1 z-10 uppercase tracking-widest">{article.category}</div>
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="md:col-span-7 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 font-medium">
                        <span className="text-[#fad02c] font-bold uppercase tracking-wider">{article.series}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold leading-snug mb-3 group-hover:text-[#d4af37] transition-colors">{article.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 font-light">{article.excerpt}</p>
                      <div className="mt-auto">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-all">
                          Đọc chi tiết <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* UPDATED SIDEBAR */}
            <div className="lg:col-span-4 space-y-12">
              {/* Search */}
              <div className="bg-gray-50 p-6 border border-gray-100">
                <h3 className="font-serif text-xl mb-4">Tìm kiếm</h3>
                <div className="relative">
                  <input type="text" placeholder="Tìm theo tiêu đề, nội dung..." className="w-full bg-white border border-gray-300 py-3 pl-4 pr-10 text-sm focus:outline-none focus:border-black transition-colors" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              {/* Khu vực (Regions) */}
              <div>
                <h3 className="font-serif text-xl mb-6 border-b border-black pb-2">Khu vực</h3>
                <div className="flex flex-wrap gap-2">
                  {regions.map((region, idx) => (
                    <button key={idx} className="border border-gray-200 px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider hover:border-black hover:text-black transition-colors">
                      {region}
                    </button>
                  ))}
                </div>
              </div>
              {/* Chuỗi bài (Series) */}
              <div>
                <h3 className="font-serif text-xl mb-6 border-b border-black pb-2">Chuỗi bài (Series)</h3>
                <ul className="space-y-3">
                  {seriesList.map((series, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#fad02c] cursor-pointer transition-colors group">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-[#fad02c] transition-colors"></div>
                      {series}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Lưu trữ (Archives) */}
              <div>
                <h3 className="font-serif text-xl mb-6 border-b border-black pb-2">Lưu trữ</h3>
                <div className="space-y-6">
                  {archives.map((group, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-sm mb-3 text-black">{group.year}</h4>
                      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-500">
                        {group.months.map((month, mIdx) => (
                          <div key={mIdx} className="hover:text-[#fad02c] cursor-pointer transition-colors">
                            {month}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Newsletter */}
              <div className="bg-black text-white p-8 text-center">
                <Mail className="mx-auto text-[#fad02c] mb-4" size={32} />
                <h3 className="font-serif text-2xl mb-2 text-[#fad02c]">Newsletter</h3>
                <p className="text-gray-400 text-xs mb-6 leading-relaxed">Nhận các phân tích thị trường mới nhất và các báo cáo độc quyền trực tiếp vào hộp thư của bạn.</p>
                <input type="email" placeholder="Địa chỉ Email của bạn" className="w-full bg-[#1a1a1a] border border-gray-700 text-white text-sm py-3 px-4 mb-3 focus:outline-none focus:border-[#fad02c]" />
                <button className="w-full bg-[#fad02c] text-black font-bold text-sm uppercase tracking-widest py-3 hover:bg-white transition-colors">Đăng ký ngay</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ResearchPage;