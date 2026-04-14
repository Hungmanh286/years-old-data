import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Database, Loader2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.hungmanhdev.me';

interface InsightPost {
  id: number;
  category: string;
  title: string;
  description: string;
  heroImage?: string;
  area?: string;
  date?: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [insights, setInsights] = useState<InsightPost[]>([]);
  const [insightsLoading, setInsightsLoading] = useState(true);

  // --- Return Performance Chart State ---
  const [perfChartData, setPerfChartData] = useState<any>(null);
  const [perfLoading, setPerfLoading] = useState(true);
  const [perfError, setPerfError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchInsights = async () => {
      try {
        setInsightsLoading(true);
        const response = await fetch(`${API_BASE_URL}/posts/`, { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data: InsightPost[] = await response.json();
        // Lấy 3 bài đầu tiên
        setInsights(data.slice(0, 3));
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching insights:', error);
        }
      } finally {
        setInsightsLoading(false);
      }
    };
    fetchInsights();
    return () => controller.abort();
  }, []);

  // Fetch Return Performance data (Ret key: ret_40years_old_pct, ret_vni_adjusted_pct)
  useEffect(() => {
    const controller = new AbortController();
    const fetchPerf = async () => {
      setPerfLoading(true);
      setPerfError(null);
      try {
        const url = `https://hungmanhdev.me/market-indicators?limit=1095&indicators=ret_40years_old_pct,ret_vni_adjusted_pct`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Server Error: ${res.status}`);
        const result = await res.json();
        if (result.code !== '000' || !result.data) throw new Error(result.message || 'Invalid API response');

        const dataObj = result.data;
        let labels: string[] = [];
        const datasets: any[] = [];

        const series40 = dataObj['ret_40years_old_pct'];
        const seriesVni = dataObj['ret_vni_adjusted_pct'];

        if (series40 && Array.isArray(series40) && series40.length > 0) {
          const sorted = [...series40].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          labels = sorted.map((d: any) => d.date);
          datasets.push({
            label: '40YO Strategy',
            data: sorted.map((d: any) => d.value),
            borderColor: '#fad02c',
            backgroundColor: 'rgba(250,208,44,0.08)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.3,
            fill: true,
          });
        }

        if (seriesVni && Array.isArray(seriesVni) && seriesVni.length > 0) {
          const sorted = [...seriesVni].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          datasets.push({
            label: 'VNI Adjusted',
            data: sorted.map((d: any) => d.value),
            borderColor: '#6b7280',
            backgroundColor: 'rgba(107,114,128,0.05)',
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.3,
            fill: false,
          });
        }

        if (datasets.length === 0) throw new Error('No data available');
        setPerfChartData({ labels, datasets });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setPerfError(err.message || 'Failed to load performance data');
        }
      } finally {
        if (!controller.signal.aborted) setPerfLoading(false);
      }
    };
    fetchPerf();
    return () => controller.abort();
  }, []);

  const perfChartOptions: ChartOptions<'line'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 600, easing: 'easeInOutQuart' },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.92)',
        titleFont: { family: 'serif', size: 12 },
        bodyFont: { family: 'monospace', size: 11 },
        padding: 10,
        cornerRadius: 0,
        borderColor: 'rgba(250,208,44,0.4)',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed.y;
            return ` ${ctx.dataset.label}: ${val !== null ? val.toFixed(2) + '%' : 'N/A'}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 6,
          font: { size: 9 },
          color: '#6b7280',
        },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.06)' },
        ticks: {
          font: { size: 9, family: 'monospace' },
          color: '#6b7280',
          callback: (v) => `${v}%`,
        },
      },
    },
  }), []);

  const performanceMetrics = [
    { label: "Lợi nhuận TB/Năm", value: "35.4%", sub: "CAGR 3 Năm", color: "text-white" },
    { label: "Alpha (Vượt trội)", value: "+21.5%", sub: "So với VN-Index", color: "text-[#fad02c]" },
    { label: "Rủi ro (VaR 10%)", value: "-19.1%", sub: "Đã kiểm soát", color: "text-gray-400" },
  ];



  return (
    <div className="flex flex-col min-h-screen">
      <Header transparent={true} />

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
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-tight mb-8">
              We turn Data <br />into <span className="italic text-gray-400">Truth.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              40 Years Old áp dụng các mô hình định lượng và phân tích vĩ mô chuyên sâu để tìm ra mối quan hệ nhân quả trong nền kinh tế.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/article')} className="bg-[#fad02c] text-black px-8 py-4 font-semibold tracking-wide hover:bg-white transition-colors">
                Khám phá "Ourlook" tháng 3
              </button>
              <button onClick={() => navigate('/services')} className="border border-white text-white px-8 py-4 font-semibold tracking-wide hover:bg-white hover:text-black transition-colors">
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
              <p className="text-gray-400 leading-relaxed mb-8 font-light text-lg">
                Trong gần 3 năm qua, chúng tôi đã chứng minh rằng phương pháp đầu tư khoa học mang lại lợi nhuận bền vững vượt trội so với thị trường trong khi vẫn giữ mức rủi ro tương đương.
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

            <div className="bg-[#1a1a1a] p-6 border border-gray-800 relative shadow-2xl">
              {/* Chart Header */}
              <div className="flex justify-between items-center mb-5 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="uppercase tracking-widest text-xs font-semibold text-gray-400">Return Performance</h3>
                  <p className="text-[10px] text-gray-600 font-mono mt-0.5">3Y Cumulative · EOD Data</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-8 h-[2px] bg-[#fad02c] inline-block"></span>
                    <span className="text-[10px] text-gray-400 font-mono">40YO</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-8 h-[2px] bg-gray-600 inline-block"></span>
                    <span className="text-[10px] text-gray-400 font-mono">VNI</span>
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="relative h-64 w-full">
                {perfLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="animate-spin text-[#fad02c]" size={24} />
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Loading stream...</span>
                    </div>
                  </div>
                )}

                {perfError && !perfLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs text-red-400 font-mono">{perfError}</p>
                  </div>
                )}

                {!perfLoading && !perfError && perfChartData && (
                  <Line options={perfChartOptions} data={perfChartData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-4xl text-black">Góc nhìn & Nghiên cứu</h2>
            <button onClick={() => navigate('/research')} className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 hover:border-black transition-all">View All</button>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {insightsLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex flex-col animate-pulse">
                  <div className="aspect-video bg-gray-200 mb-6" />
                  <div className="border-t border-black pt-4 mb-3"><div className="h-3 bg-gray-200 rounded w-1/3" /></div>
                  <div className="h-6 bg-gray-200 rounded mb-3" />
                  <div className="h-4 bg-gray-100 rounded mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </div>
              ))
            ) : (
              insights.map((post) => (
                <article key={post.id} onClick={() => navigate(`/article/${post.id}`)} className="group cursor-pointer flex flex-col">
                  <div className="overflow-hidden mb-6 aspect-video bg-gray-100">
                    {post.heroImage ? (
                      <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover image-filter transform group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest">No Image</div>
                    )}
                  </div>
                  <div className="border-t border-black pt-4 mb-3"> <span className="text-xs font-bold text-[#fad02c] uppercase tracking-widest">{post.category}</span> </div>
                  <h3 className="font-serif text-2xl font-medium leading-snug mb-3 group-hover:text-[#d4af37] transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.description}</p>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900">
                    <span className="group-hover:translate-x-2 transition-transform duration-300">Read Analysis</span> <ArrowRight size={12} />
                  </div>
                </article>
              ))
            )}
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
              <button onClick={() => navigate('/charts')} className="flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#fad02c] hover:text-black transition-colors">
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
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full h-px bg-gray-100"></div>)}
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