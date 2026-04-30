import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, Shield, PieChart, Database, Cpu, Plus, Minus, Briefcase } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://www.hungmanhdev.me/users', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `${formData.fullName} - ${formData.phone}`,
          email: formData.email,
          receive_advice: true
        }),
      });

      if (!response.ok) {
        throw new Error('Đăng ký thất bại, vui lòng thử lại sau.');
      }

      alert('Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ lại sớm nhất!');
      setFormData({ fullName: '', phone: '', email: '' });
    } catch (error: any) {
      alert(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo === 'contact-form') {
      const element = document.getElementById('contact-form');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const packages = [
    { name: "Low Risk", target: "25%", var: "-20%", desc: "Rủi ro được kiểm soát thấp hơn thị trường nhưng lợi nhuận mục tiêu cao hơn thị trường chung.", features: ["Tỷ trọng cổ phiếu thấp", "Phù hợp với nhà đầu tư ngại rủi ro", "Phòng vệ phái sinh chủ động"] },
    { name: "Standard", target: "30%", var: "-25%", desc: "Rủi ro tương đương thị trường với mục tiêu lợi nhuận vượt trội so với thị trường chung.", recommended: true, features: ["Cân bằng Growth/Value", "Phù hợp với nhà đầu tư chấp nhận rủi ro vừa phải", "Tối ưu hóa Alpha"] },
    { name: "High Risk", target: "35%", var: "-30%", desc: "Chấp nhận rủi ro cao hơn thị trường để đạt được mức tăng trưởng lợi nhuận cao nhất.", features: ["Tập trung cổ phiếu tăng trưởng", "Phù hợp với nhà đầu tư ưu tiên tăng trưởng cao", "Tối đa hóa vị thế"] }
  ];

  const faqs = [
    { q: "Vốn đầu tư tối thiểu để tham gia là bao nhiêu?", a: "Chúng tôi nhận ủy thác quản lý với số vốn khởi điểm từ 2.000.000.000 VNĐ (hai tỷ đồng). Mức vốn này giúp đảm bảo việc phân bổ tỷ trọng danh mục được tối ưu và hiệu quả." },
    { q: "Tôi có thể nộp thêm hoặc rút vốn trong quá trình hợp tác không?", a: "Bạn có thể thực hiện nộp hoặc rút vốn linh hoạt bất cứ lúc nào. Tuy nhiên, các giao dịch này cần thực hiện theo bước giá tròn 1 tỷ đồng để thuận tiện cho việc tái cơ cấu danh mục." },
    { q: "Nếu kết thúc hợp đồng mà đầu tư bị lỗ thì sao?", a: "Nếu NAV tăng trưởng âm khi đáo hạn, bạn có quyền gia hạn Hợp đồng thêm 01 năm. Trong năm gia hạn này, chúng tôi sẽ MIỄN PHÍ QUẢN LÝ (0%) để đồng hành cùng bạn khôi phục tài sản." },
    { q: "Tài sản của tôi có an toàn không?", a: "Tuyệt đối an toàn. Tài sản (tiền và cổ phiếu) nằm trong tài khoản chứng khoán đứng tên chính chủ của bạn. Chúng tôi chỉ được cấp quyền giao dịch (đặt lệnh), không có quyền rút tiền hay chuyển nhượng tài sản." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="h-24 bg-black"></div>

      <section className="bg-black text-white py-20 border-b border-gray-800">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-[#fad02c] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Philosophy</span>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6"> "Kiến thức + Dữ liệu = Sự thật" </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed">Trên hành trình đầu tư của mình, chúng tôi nỗ lực xây dựng một hệ thống ra quyết định dựa trên các con số, cái mà chúng tôi gọi là “Cỗ máy đầu tư”. Triết lý của chúng tôi là biến đầu tư thành một bộ môn khoa học, nơi các sự thật đã được kiểm chứng bằng dữ liệu. “Cỗ máy” này được vận hành dựa trên ba trụ cột cốt lõi:</p>
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
              <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">Cỗ máy Đầu tư của chúng tôi được thiết kế để tạo ra lợi nhuận vượt trội (Alpha) từ năng lực cốt lõi, không phụ thuộc vào diễn biến tăng hay giảm của thị trường chung.</p>
              <div className="flex flex-wrap items-center gap-6 md:gap-10 py-8">
                {/* CARG */}
                <div className="flex flex-col group cursor-default">
                  <div className="text-4xl md:text-5xl font-serif text-black leading-none mb-3 transition-transform duration-300 group-hover:-translate-y-1">44.7%</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fad02c] mb-1">(CARG)</div>
                  <div className="text-[11px] text-gray-400 leading-tight font-light max-w-[100px]">
                    Lợi nhuận kép<br />trung bình năm
                  </div>
                </div>

                <div className="text-2xl font-light text-gray-300 pt-2 hidden md:block">=</div>

                {/* ALPHA */}
                <div className="flex flex-col group cursor-default">
                  <div className="text-4xl md:text-5xl font-serif text-[#fad02c] leading-none mb-3 transition-transform duration-300 group-hover:-translate-y-1">30.0%</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-1">ALPHA</div>
                  <div className="text-[11px] text-gray-500 leading-tight font-medium max-w-[120px]">
                    Lợi nhuận vượt trội<br />so với thị trường
                  </div>
                </div>

                <div className="text-xl font-light text-gray-300 pt-2">+</div>

                {/* BETA */}
                <div className="flex flex-col group cursor-default">
                  <div className="text-4xl md:text-5xl font-serif text-black leading-none mb-3 transition-transform duration-300 group-hover:-translate-y-1 opacity-80 group-hover:opacity-100">9.3%</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">BETA</div>
                  <div className="text-[11px] text-gray-400 leading-tight font-light max-w-[120px]">
                    Lợi nhuận từ<br />rủi ro thị trường
                  </div>
                </div>

                <div className="text-xl font-light text-gray-300 pt-2">+</div>

                {/* R(F) */}
                <div className="flex flex-col group cursor-default">
                  <div className="text-4xl md:text-5xl font-serif text-black leading-none mb-3 transition-transform duration-300 group-hover:-translate-y-1 opacity-80 group-hover:opacity-100">5.3%</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">R(F)</div>
                  <div className="text-[11px] text-gray-400 leading-tight font-light max-w-[100px]">
                    Lãi suất<br />phi rủi ro
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-white p-8 shadow-lg border border-gray-200">
              <h3 className="font-serif text-xl mb-4">Chiến lược Alpha là gì?</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">"Alpha là phần lợi nhuận vượt trội mà chúng tôi tạo ra sau khi loại bỏ các biến động của thị trường chung (Beta). Điều này chứng minh rằng lợi nhuận đến từ năng lực chọn lọc cổ phiếu và quản trị rủi ro thay vì diễn biến của thị trường.</p>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-gray-400 w-[40%]"></div>
                <div className="h-full bg-[#fad02c] w-[30%]"></div>
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold mt-2 text-gray-400">
                <span>Lãi suất phí rủi ro</span>
                <span className="text-[#fad02c]">Beta</span>
                <span>Alpha</span>
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
                    <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Var 10%</div>
                    <div className="text-xl font-serif text-gray-500">{pkg.var}</div>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
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
                    <p className="text-sm text-gray-500 leading-relaxed">Phí được thu định kỳ trên tổng giá trị tài sản ròng (NAV), dùng để chi trả cho hoạt động vận hành, hệ thống dữ liệu và đội ngũ nghiên cứu."</p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-800"></div>
                <div className="flex gap-6 items-start">
                  <div className="text-[#fad02c] font-serif text-5xl leading-none">20%</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Phí Hiệu quả</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Phí chỉ được áp dụng trên phần lợi nhuận tạo ra (High-water mark). Nếu danh mục không có lãi, phí này không phát sinh."</p>
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
                    <p className="text-sm text-gray-500">Tài khoản chứng khoán đứng tên chính chủ của bạn, chúng tôi không nắm giữ hay kiểm soát tài sản của bạn.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-[#fad02c] font-bold text-xs">2</div>
                  <div>
                    <h5 className="font-bold text-sm uppercase tracking-wide mb-1">Kiểm soát rủi ro cứng</h5>
                    <p className="text-sm text-gray-500">Danh mục được đa dạng hóa với giới hạn cứng tối đa 30% NAV cho một mã, 45% NAV cho một ngành</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-[#fad02c] font-bold text-xs">3</div>
                  <div>
                    <h5 className="font-bold text-sm uppercase tracking-wide mb-1">Cam kết đồng hành</h5>
                    <p className="text-sm text-gray-500">Nếu danh mục tăng trưởng âm khi đáo hạn, hợp đồng được gia hạn thêm 01 năm và miễn phí quản lý trong năm tiếp theo.</p>
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

      <section id="contact-form" className="py-24 bg-[#fad02c]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto bg-black p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-[#fad02c] mb-4">Đăng ký Tư vấn Đầu tư</h2>
              <p className="text-gray-400 text-sm md:text-base font-light">Để lại thông tin bên dưới, đội ngũ chuyên gia của 40 Years Old sẽ liên hệ trực tiếp để trao đổi về lộ trình tài chính của bạn.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#fad02c] font-bold">Họ và tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  required
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-[#111] border border-gray-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#fad02c] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#fad02c] font-bold">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  placeholder="09xx xxx xxx"
                  className="w-full bg-[#111] border border-gray-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#fad02c] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#fad02c] font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="example@gmail.com"
                  className="w-full bg-[#111] border border-gray-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#fad02c] transition-colors"
                />
              </div>
              <div className="md:col-span-3 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#fad02c] text-black py-4 font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white'}`}
                >
                  <Briefcase size={18} /> {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">Hotline hỗ trợ trực tiếp</p>
              <p className="text-white font-serif text-xl mt-1">0901 080 494</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServicesPage;