import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Search, Mail, Calendar } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.hungmanhdev.me';

interface Article {
  id: number;
  category: string;
  description: string;
  title: string;
  date: string;
  heroImage?: string;
  content?: any;
  area: string;
  url?: string;
}

interface ArchiveGroup {
  year: number;
  months: Array<{ label: string; value: number }>;
}

interface ArchiveItem {
  year: number;
  month: number;
}

const monthLabel = (month: number) => `Tháng ${month}`;

const normalizeArchives = (input: unknown): ArchiveGroup[] => {
  const monthMapByYear = new Map<number, Set<number>>();

  if (!Array.isArray(input)) {
    return [];
  }

  input.forEach((item) => {
    if (typeof item !== 'object' || item === null) {
      return;
    }

    const rawYear = (item as any).year;
    const year = Number(rawYear);
    if (!Number.isInteger(year)) {
      return;
    }

    if (!monthMapByYear.has(year)) {
      monthMapByYear.set(year, new Set<number>());
    }

    const monthsContainer = (item as any).months;
    if (Array.isArray(monthsContainer)) {
      monthsContainer.forEach((m) => {
        const month = Number(m);
        if (Number.isInteger(month) && month >= 1 && month <= 12) {
          monthMapByYear.get(year)?.add(month);
        }
      });
      return;
    }

    const rawMonth = (item as any).month;
    const month = Number(rawMonth);
    if (Number.isInteger(month) && month >= 1 && month <= 12) {
      monthMapByYear.get(year)?.add(month);
    }
  });

  return [...monthMapByYear.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, monthSet]) => ({
      year,
      months: [...monthSet]
        .sort((a, b) => b - a)
        .map((month) => ({
          label: monthLabel(month),
          value: month,
        })),
    }));
};

const ResearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [areas, setAreas] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [archives, setArchives] = useState<ArchiveGroup[]>([]);

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

  useEffect(() => {
    const controller = new AbortController();

    const fetchSidebarData = async () => {
      try {
        const [areasResponse, categoriesResponse, archivesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/posts/areas`, { signal: controller.signal }),
          fetch(`${API_BASE_URL}/posts/categories`, { signal: controller.signal }),
          fetch(`${API_BASE_URL}/posts/archives`, { signal: controller.signal }),
        ]);

        if (!areasResponse.ok || !categoriesResponse.ok || !archivesResponse.ok) {
          throw new Error('Failed to fetch sidebar filters');
        }

        const [areasData, categoriesData, archivesData] = await Promise.all([
          areasResponse.json(),
          categoriesResponse.json(),
          archivesResponse.json(),
        ]);

        setAreas(Array.isArray(areasData) ? areasData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setArchives(normalizeArchives(archivesData as ArchiveItem[]));
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching sidebar filters:', error);
        }
      }
    };

    fetchSidebarData();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSeries.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();

        if (selectedArea) {
          params.set('area', selectedArea);
        }

        if (selectedCategory) {
          params.set('category', selectedCategory);
        }

        if (selectedMonth) {
          params.set('month', String(selectedMonth));
        }

        if (selectedYear) {
          params.set('year', String(selectedYear));
        }

        if (searchQuery.trim()) {
          params.set('q', searchQuery.trim());
        }

        const query = params.toString();
        const url = `${API_BASE_URL}/posts/${query ? `?${query}` : ''}`;
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        setArticles(data);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching articles:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();

    return () => controller.abort();
  }, [searchQuery, selectedArea, selectedCategory, selectedMonth, selectedYear]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedArea(null);
    setSelectedCategory(null);
    setSelectedMonth(null);
    setSelectedYear(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

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
                {isLoading ? (
                  <p>Đang tải bài viết...</p>
                ) : (
                  articles.map((article) => (
                    <article key={article.id} onClick={() => navigate(`/article/${article.id}`)} className="group cursor-pointer grid md:grid-cols-12 gap-6 items-start">
                      <div className="md:col-span-5 overflow-hidden aspect-[4/3] bg-gray-100 relative">
                        <div className="absolute top-0 left-0 bg-black text-white text-[10px] font-bold px-3 py-1 z-10 uppercase tracking-widest">{article.category}</div>
                        {article.heroImage ? (
                          <img 
                            src={article.heroImage} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                            [No Image]
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-7 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 font-medium">
                          <span className="text-[#fad02c] font-bold uppercase tracking-wider">{article.area || 'General'}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                        </div>
                        <h3 className="font-serif text-2xl font-bold leading-snug mb-3 group-hover:text-[#d4af37] transition-colors">{article.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 font-light">{article.description}</p>
                        <div className="mt-auto">
                          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-all">
                            Đọc chi tiết <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>

            {/* UPDATED SIDEBAR */}
            <div className="lg:col-span-4 space-y-12">
              {/* Search */}
              <div className="bg-gray-50 p-6 border border-gray-100">
                <h3 className="font-serif text-xl mb-4">Tìm kiếm</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tiêu đề, nội dung..."
                    className="w-full bg-white border border-gray-300 py-3 pl-4 pr-10 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              {/* Khu vực (Regions) */}
              <div>
                <h3 className="font-serif text-xl mb-6 border-b border-black pb-2">Khu vực</h3>
                <div className="flex flex-wrap gap-2">
                  {areas.map((region, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedArea((prev) => (prev === region ? null : region))}
                      className={`border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${selectedArea === region
                        ? 'border-black text-black bg-gray-100'
                        : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'
                        }`}
                    >
                      {region}
                    </button>
                  ))}
                  {!areas.length && <p className="text-sm text-gray-400">Chưa có dữ liệu khu vực</p>}
                </div>
              </div>
              {/* Chuỗi bài (Series) */}
              <div>
                <h3 className="font-serif text-xl mb-6 border-b border-black pb-2">Chuỗi bài (Series)</h3>
                <ul className="space-y-3">
                  {categories.map((series, idx) => (
                    <li
                      key={idx}
                      onClick={() => setSelectedCategory((prev) => (prev === series ? null : series))}
                      className={`flex items-center gap-3 text-sm cursor-pointer transition-colors group ${selectedCategory === series ? 'text-[#fad02c]' : 'text-gray-600 hover:text-[#fad02c]'
                        }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedCategory === series ? 'bg-[#fad02c]' : 'bg-gray-300 group-hover:bg-[#fad02c]'
                        }`}></div>
                      {series}
                    </li>
                  ))}
                  {!categories.length && <li className="text-sm text-gray-400">Chưa có dữ liệu chuỗi bài</li>}
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
                          <div
                            key={mIdx}
                            onClick={() => {
                              const isActive = selectedYear === group.year && selectedMonth === month.value;
                              if (isActive) {
                                setSelectedYear(null);
                                setSelectedMonth(null);
                                return;
                              }

                              setSelectedYear(group.year);
                              setSelectedMonth(month.value);
                            }}
                            className={`cursor-pointer transition-colors ${selectedYear === group.year && selectedMonth === month.value
                              ? 'text-[#fad02c] font-medium'
                              : 'hover:text-[#fad02c]'
                              }`}
                          >
                            {month.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={resetFilters}
                  className="mt-5 w-full border border-gray-300 py-2 text-sm text-gray-700 hover:border-black hover:text-black transition-colors"
                >
                  Xóa bộ lọc
                </button>
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