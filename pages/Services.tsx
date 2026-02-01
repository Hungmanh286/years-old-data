import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, Shield, PieChart, Database, Cpu, Plus, Minus, Briefcase } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const packages = [
    { name: "Low Risk", target: "25%", var: "-20%", desc: "Chiến lược phòng thủ, phù hợp với dòng tiền nhàn rỗi dài hạn cần sự an toàn cao hơn thị trường.", features: ["Tỷ trọng cổ phiếu thấp", "Tối ưu cổ tức tiền mặt", "Phòng vệ phái sinh chủ động"] },
    { name: "Standard", target: "30%", var: "-25%", desc: "Chiến lược cân bằng, tối ưu hóa giữa tăng trưởng tài sản và kiểm soát biến động.", recommended: true, features: ["Cân bằng Growth/Value", "Đa dạng hóa ngành", "Tối ưu hóa Alpha"] },
    { name: "High Risk", target: "35%", var: "-30%", desc: "Chiến lược tấn công, chấp nhận biến động ngắn hạn để đạt lợi suất kép vượt trội.", features: ["Tập trung cổ phiếu tăng trưởng", "Tận dụng đòn bẩy hợp lý", "Tối đa hóa vị thế"] }
  ];

  const faqs = [
    { q: "Vốn đầu tư tối thiểu để tham gia là bao nhiêu?", a: "Chúng tôi nhận ủy thác quản lý với số vốn khởi điểm từ 2.000.000.000 VNĐ (hai tỷ đồng). Mức vốn này giúp đảm bảo việc phân bổ tỷ trọng danh mục được tối ưu và hiệu quả." },
    { q: "Tôi có thể nộp thêm hoặc rút vốn trong quá trình hợp tác không?", a: "Bạn có thể thực hiện nộp hoặc rút vốn linh hoạt bất cứ lúc nào. Tuy nhiên, các giao dịch này cần thực hiện theo bước giá tròn 1 tỷ đồng để thuận tiện cho việc tái cơ cấu danh mục." },
    { q: "Nếu kết thúc hợp đồng mà đầu tư bị lỗ thì sao?", a: "Nếu NAV tăng trưởng âm khi đáo hạn, bạn có quyền gia hạn Hợp đồng thêm 01 năm. Trong năm gia hạn này, chúng tôi sẽ MIỄN PHÍ QUẢN LÝ (0%) để đồng hành cùng bạn khôi phục tài sản." },
    { q: "Tài sản của tôi có an toàn không?", a: "Tuyệt đối an toàn. Tài sản (tiền và cổ phiếu) nằm trong tài khoản chứng khoán tại DNSE đứng tên chính chủ của bạn. Chúng tôi chỉ được cấp quyền giao dịch (đặt lệnh), không có quyền rút tiền hay chuyển nhượng tài sản." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="h-24 bg-black"></div>

      <section className="bg-black text-white py-20 border-b border-gray-800">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-[#fad02c] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Philosophy</span>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6"> "Cỗ máy Đầu tư" </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed">Chúng tôi không đoán định thị trường bằng cảm tính. Chúng tôi xây dựng một hệ thống ra quyết định dựa trên khoa học, nơi mọi hành động đều được kiểm chứng bằng dữ liệu lịch sử.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 border border-gray-800 bg-[#111] hover:border-[#fad02c] transition-colors group">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-[#fad02c] group-hover:bg-[#fad02c] group-hover:text-black transition-colors">
                <PieChart strokeWidth={1.5} size={32} />
              </div>
              <h3 className="font-serif text-2xl mb-3">Sự am hiểu sâu sắc</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Hiểu rõ mối quan hệ nhân quả vận hành nền kinh tế và các chu kỳ thị trường.</p>
            </div>
            <div className="p-8 border border-gray-800 bg-[#111] hover:border-[#fad02c] transition-colors group">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-[#fad02c] group-hover:bg-[#fad02c] group-hover:text-black transition-colors">
                <Database strokeWidth={1.5} size={32} />
              </div>
              <h3 className="font-serif text-2xl mb-3">Quy mô dữ liệu</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Hệ thống dữ liệu độc quyền bao quát từ Vĩ mô toàn cầu đến từng Doanh nghiệp niêm yết.</p>
            </div>
            <div className="p-8 border border-gray-800 bg-[#111] hover:border-[#fad02c] transition-colors group">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-[#fad02c] group-hover:bg-[#fad02c] group-hover:text-black transition-colors">
                <Cpu strokeWidth={1.5} size={32} />
              </div>
              <h3 className="font-serif text-2xl mb-3">Các thuật toán</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Tự động hóa quy trình ra quyết định bằng các thuật toán Backtest nghiêm ngặt.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="font-serif text-4xl text-black mb-6">Hiệu quả thực tế</h2>
              <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">Trong gần 3 năm qua, chúng tôi đã chứng minh rằng phương pháp khoa học mang lại lợi nhuận bền vững vượt trội so với thị trường.</p>
              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-serif text-[#fad02c] mb-1">35.4%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Lợi nhuận TB/Năm</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-black mb-1">+21.5%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Alpha (Vượt trội)</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-white p-8 shadow-lg border border-gray-200">
              <h3 className="font-serif text-xl mb-4">Chiến lược Alpha là gì?</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">Alpha là phần lợi nhuận vượt trội mà chúng tôi tạo ra sau khi loại bỏ các biến động của thị trường chung (Beta). Điều này chứng minh rằng lợi nhuận đến từ năng lực chọn lọc cổ phiếu và quản trị rủi ro, chứ không phải do "thủy triều lên".</p>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-gray-400 w-[40%]"></div>
                <div className="h-full bg-[#fad02c] w-[30%]"></div>
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold mt-2 text-gray-400">
                <span>Market Return (Beta)</span>
                <span className="text-[#fad02c]">40YO Alpha</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <span className="text-[#fad02c] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Service Offerings</span>
            <h2 className="font-serif text-4xl text-black">Gói Quản lý Tài sản</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Lựa chọn chiến lược phù hợp với khẩu vị rủi ro của bạn. Tất cả đều được quản lý trên tài khoản chính chủ tại DNSE.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div key={idx} className={`relative p-8 border transition-all duration-300 flex flex-col ${pkg.recommended ? 'border-black shadow-xl scale-105 z-10 bg-white' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'}`}>
                {pkg.recommended && (<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fad02c] text-black text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest"> Recommended </div>)}
                <h3 className="font-serif text-2xl mb-2">{pkg.name}</h3>
                <p className="text-xs text-gray-500 mb-8 h-12 leading-relaxed">{pkg.desc}</p>
                <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-4">
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Target Return</div>
                    <div className="text-4xl font-serif text-black">{pkg.target}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Max Drawdown</div>
                    <div className="text-xl font-serif text-gray-500">{pkg.var}</div>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check size={16} className="text-[#fad02c] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-colors ${pkg.recommended ? 'bg-black text-white hover:bg-[#fad02c] hover:text-black' : 'bg-white border border-black text-black hover:bg-black hover:text-white'}`}>
                  Đăng ký tư vấn
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#111] text-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="font-serif text-3xl mb-8">Cơ cấu Phí minh bạch</h2>
              <p className="text-gray-400 mb-10 font-light">Chúng tôi gắn kết lợi ích của mình với khách hàng. Phí hiệu quả chỉ được thu khi bạn thực sự có lãi.</p>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="text-[#fad02c] font-serif text-5xl leading-none">1%</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Phí Quản lý (Năm)</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Thu trên tổng giá trị tài sản ròng (NAV). Dùng để duy trì hệ thống dữ liệu, vận hành đội ngũ nghiên cứu và cơ sở hạ tầng.</p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-800"></div>
                <div className="flex gap-6 items-start">
                  <div className="text-[#fad02c] font-serif text-5xl leading-none">20%</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Phí Hiệu quả</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Chỉ thu trên phần lợi nhuận thực dương (High-water mark). Nếu không có lãi, không thu phí này.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-10 border border-gray-800">
              <h3 className="font-serif text-2xl mb-8 flex items-center gap-3"><Shield className="text-[#fad02c]" size={28} /> Cấu trúc An toàn </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-[#fad02c] font-bold text-xs">1</div>
                  <div>
                    <h5 className="font-bold text-sm uppercase tracking-wide mb-1">Tài khoản Segregated</h5>
                    <p className="text-sm text-gray-500">Tài sản nằm tại DNSE, đứng tên chính chủ của bạn. Chúng tôi không giữ tiền.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-[#fad02c] font-bold text-xs">2</div>
                  <div>
                    <h5 className="font-bold text-sm uppercase tracking-wide mb-1">Kiểm soát rủi ro cứng</h5>
                    <p className="text-sm text-gray-500">Max 30% NAV/mã. Max 45% NAV/ngành. Chỉ đầu tư cổ phiếu vốn hóa {'>'} 1.000 tỷ.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-[#fad02c] font-bold text-xs">3</div>
                  <div>
                    <h5 className="font-bold text-sm uppercase tracking-wide mb-1">Cam kết đồng hành</h5>
                    <p className="text-sm text-gray-500">Nếu năm đầu tư lỗ, miễn phí quản lý cho năm gia hạn tiếp theo.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-gray-800 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Điều kiện tham gia</p>
                <p className="text-2xl font-serif text-white">Vốn tối thiểu 2 Tỷ VNĐ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <h2 className="font-serif text-3xl text-center mb-12">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-4">
                <button onClick={() => toggleFaq(idx)} className="w-full flex justify-between items-center text-left py-4 focus:outline-none group">
                  <span className={`font-serif text-lg ${openFaqIndex === idx ? 'text-[#fad02c]' : 'text-gray-900 group-hover:text-[#fad02c]'}`}>{item.q}</span>
                  {openFaqIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-600 text-sm leading-relaxed pb-4 pr-8 font-light">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#fad02c]">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-black mb-6">Sẵn sàng để Đầu tư Khoa học?</h2>
          <p className="text-black/80 text-lg mb-10 max-w-2xl mx-auto font-light">Đặt lịch hẹn tư vấn 1-1 với đội ngũ chuyên gia của chúng tôi để xây dựng chiến lược phù hợp nhất với vị thế tài chính của bạn.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-black text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
              <Briefcase size={18} /> Mở Hợp đồng Hợp tác
            </button>
            <button className="bg-transparent border border-black text-black px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-white hover:border-white transition-colors">
              Liên hệ hỗ trợ: 0901 080 494
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServicesPage;