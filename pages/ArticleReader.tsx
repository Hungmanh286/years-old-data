import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronRight, Clock, Download, Facebook, Link as LinkIcon, Printer } from 'lucide-react';
import { PageProps } from '../types';

const ArticleReaderPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const articleData = {
    title: "Cập nhật khu vực sản xuất và việc làm US trong tháng 3",
    subtitle: "Dữ liệu PMI và Non-farm payroll cho thấy sự phân hóa rõ rệt giữa nền kinh tế thực và kỳ vọng của phố Wall.",
    date: "04 May 2025",
    category: "Mỹ",
    series: "Outlook",
    author: "40 Years Old Research Team",
    readTime: "8 phút đọc",
    related: [
      { title: "Lạm phát Mỹ: Đỉnh hay chưa?", date: "01 May 2025" },
      { title: "Fed và lộ trình lãi suất cuối năm 2025", date: "28 Apr 2025" },
      { title: "Dòng vốn ETF đảo chiều", date: "20 Apr 2025" }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 h-1 bg-[#fad02c] z-[60] transition-all duration-100" style={{ width: `${scrollProgress}%` }}></div>
      <Header onNavigate={onNavigate} activePage="research" />
      <div className="h-28"></div>

      <section className="pb-12 border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-8">
            <button onClick={() => onNavigate('home')} className="hover:text-black cursor-pointer">Trang chủ</button>
            <ChevronRight size={12} />
            <button onClick={() => onNavigate('research')} className="hover:text-black cursor-pointer">Nghiên cứu</button>
            <ChevronRight size={12} />
            <span className="text-[#fad02c] font-bold">{articleData.category}</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900 mb-6">{articleData.title}</h1>
              <p className="text-xl text-gray-500 font-light leading-relaxed mb-8 border-l-4 border-[#fad02c] pl-6 italic">{articleData.subtitle}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-b border-gray-100 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-black uppercase tracking-wider">{articleData.author}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div>{articleData.date}</div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1"><Clock size={14} />{articleData.readTime}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="w-full aspect-video bg-gray-100 mb-10 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1565514020176-dbf2277f2c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="US Manufacturing" className="w-full h-full object-cover" />
                <div className="p-2 text-xs text-gray-400 italic text-right border-b border-gray-100">Source: Getty Images / 40 Years Old Analysis</div>
              </div>

              <div className="bg-gray-50 border-l-4 border-black p-8 mb-10">
                <h3 className="font-serif text-xl font-bold mb-4">Điểm nhấn chính (Key Takeaways)</h3>
                <ul className="space-y-3 list-disc list-inside text-gray-700 text-sm leading-relaxed">
                  <li>Chỉ số PMI Sản xuất giảm xuống dưới mốc 50 điểm, báo hiệu sự thu hẹp.</li>
                  <li>Tăng trưởng việc làm phi nông nghiệp vẫn mạnh mẽ, tạo áp lực lên Fed.</li>
                  <li>Khuyến nghị: Giảm tỷ trọng cổ phiếu chu kỳ, tăng tỷ trọng trái phiếu ngắn hạn.</li>
                </ul>
              </div>

              <div className="font-body text-gray-800 leading-8 text-lg space-y-8 drop-cap">
                <p>Chỉ số PMI Sản xuất là thước đo quan trọng phản ánh sức khỏe của lĩnh vực sản xuất, trong khi Xu hướng việc làm cung cấp cái nhìn trực diện về nhu cầu và cơ hội tuyển dụng trên thị trường lao động Mỹ. Bài viết này sẽ cập nhật những diễn biến mới nhất từ hai nhóm dữ liệu này.</p>
                <h3 className="font-sans font-bold text-2xl text-black mt-10 mb-4">1. Sự suy yếu của khu vực sản xuất</h3>
                <p>Dữ liệu tháng 3 cho thấy một bức tranh ảm đạm. Các đơn đặt hàng mới sụt giảm mạnh nhất trong vòng 6 tháng qua. Điều này phản ánh nhu cầu tiêu dùng đang yếu đi dưới áp lực của lãi suất cao kéo dài.</p>

                <div className="my-10 border border-gray-200 p-6 rounded-sm bg-white shadow-sm">
                  <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-gray-500 mb-4 text-center">Biểu đồ: US Manufacturing PMI (2020 - 2025)</h4>
                  <div className="h-64 flex items-end justify-between gap-1 px-4 border-b border-gray-200 pb-2">
                    {[45, 48, 52, 55, 60, 58, 54, 50, 49, 47, 48, 46].map((h, i) => (
                      <div key={i} className={`flex-1 ${h < 50 ? 'bg-red-400' : 'bg-green-400'}`} style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="text-center mt-2 text-xs text-gray-400 italic">Dữ liệu: ISM, S&P Global</div>
                </div>

                <h3 className="font-sans font-bold text-2xl text-black mt-10 mb-4">2. Nghịch lý thị trường lao động</h3>
                <p>Trái ngược với sản xuất, thị trường lao động vẫn cho thấy sự kiên cường đáng kinh ngạc. Tỷ lệ thất nghiệp duy trì ở mức thấp kỷ lục. Điều này đặt Fed vào tình thế tiến thoái lưỡng nan: Làm sao để hạ nhiệt lạm phát dịch vụ mà không gây ra suy thoái sâu?</p>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-10">
                <div className="bg-black text-white p-6 shadow-xl">
                  <h3 className="font-serif text-xl mb-4 text-[#fad02c]">Báo cáo đầy đủ</h3>
                  <p className="text-gray-400 text-xs mb-6">Tải xuống bản phân tích chi tiết bao gồm 20+ biểu đồ độc quyền và dữ liệu thô.</p>
                  <button className="w-full flex items-center justify-center gap-3 bg-[#fad02c] text-black font-bold text-sm uppercase tracking-widest py-3 hover:bg-white transition-colors">
                    <Download size={18} /> Tải báo cáo (PDF)
                  </button>
                  <div className="mt-3 text-center text-[10px] text-gray-500">Format: PDF | Size: 4.2 MB</div>
                </div>

                <div>
                  <h3 className="font-serif text-lg mb-4 border-b border-gray-200 pb-2">Chia sẻ</h3>
                  <div className="flex gap-4">
                    <button className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors rounded-full"><Facebook size={18} /></button>
                    <button className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors rounded-full"><LinkIcon size={18} /></button>
                    <button className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors rounded-full"><Printer size={18} /></button>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg mb-6 border-b border-gray-200 pb-2">Bài viết liên quan</h3>
                  <div className="space-y-6">
                    {articleData.related.map((item, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.date}</div>
                        <h4 className="font-serif text-lg leading-snug group-hover:text-[#fad02c] transition-colors">{item.title}</h4>
                      </div>
                    ))}
                  </div>
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

export default ArticleReaderPage;