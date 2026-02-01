
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {
  TrendingUp, Globe, Activity, BarChart2, DollarSign, Search,
  ChevronDown, Menu, X, Info, Loader2
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// --- MAPPING CONFIGURATION MATCHING THE API STRUCTURE ---
const SHEET_COLUMN_MAPPING = {
  'Vol': {
    'columns': { 'Volatility Index': 'volatility_index' }
  },
  'Bre': {
    'columns': { 'Breadth Index': 'breadth_index' }
  },
  'Map': {
    'columns': { 'Market Price': 'market_price' }
  },
  'Div': {
    'columns': { 'Dividend Yield (%)': 'dividend_12m_pct' }
  },
  'Eps': {
    'columns': { 'EPS Vnindex': 'eps_vnindex', 'EPS Non-bank': 'eps_nonbank' }
  },
  '%St': {
    'columns': { '% PE < 10': 'st_pe_under_10_pct', '% PB < 1': 'st_pb_under_1_pct' }
  },
  'PB': {
    'columns': { 'P/B Vnindex': 'pb_vnindex', 'P/B Non-bank': 'pb_nonbank', 'P/B Bank': 'pb_bank' }
  },
  'Ret': {
    'columns': { '40 Years Old': 'ret_40years_old_pct', 'VNI Adjusted': 'ret_vni_adjusted_pct' }
  },
  'Tur': {
    'columns': { 'Turnover Ratio': 'turnover_ratio' }
  },
  'Der': {
    'columns': { 'Derivatives Ratio': 'derivatives_ratio' }
  },
  'Ins': {
    'columns': { 'Insider Transaction 3M': 'insider_transaction_3m_pct' }
  },
  'Tra': {
    'columns': { 'Probability': 'probability' }
  },
  'Avg': {
    'columns': { 'Avg 50D Orders': 'avg_50d_orders' }
  },
  'Mat': {
    'columns': { 'Matching Rate (%)': 'matching_rate_pct' }
  },
  'Cor': {
    'columns': { 'Correlation SPX': 'cor_spx', 'Correlation VN1Y': 'cor_vn1y', 'Correlation USD': 'cor_usd' }
  },
  'Hea': {
    'columns': { 'Health Consumption': 'hea_consumption', 'Health Production': 'hea_production', 'Health Labor': 'hea_labor' }
  }
} as const;

const DISPLAY_NAMES: Record<string, string> = {
  'Vol': 'Volatility Index',
  'Bre': 'Breadth Index',
  'Map': 'Market Price',
  'Div': 'Dividend Yield',
  'Eps': 'Market EPS',
  '%St': 'Market Structure (PE/PB)',
  'PB': 'P/B Ratio Valuation',
  'Ret': 'Return Performance',
  'Tur': 'Turnover Ratio',
  'Der': 'Derivatives Ratio',
  'Ins': 'Insider Transactions',
  'Tra': 'Trend Probability',
  'Avg': 'Avg Order Size',
  'Mat': 'Matching Rate',
  'Cor': 'Correlations',
  'Hea': 'Economic Health'
};

const CATEGORY_GROUPS = [
  { title: "Valuation", icon: <DollarSign size={16} />, keys: ['PB', 'Eps', 'Div', '%St', 'Map'] },
  { title: "Market Health", icon: <Activity size={16} />, keys: ['Vol', 'Bre', 'Tra', 'Hea'] },
  { title: "Liquidity & Flow", icon: <TrendingUp size={16} />, keys: ['Tur', 'Der', 'Avg', 'Mat', 'Ins'] },
  { title: "Performance", icon: <BarChart2 size={16} />, keys: ['Ret', 'Cor'] },
];

const ChartLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<string>('PB');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Valuation', 'Market Health']);
  const [timeRange, setTimeRange] = useState<'3M' | '6M' | '1Y' | '3Y' | 'MAX'>('1Y');

  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev =>
      prev.includes(menu) ? prev.filter(item => item !== menu) : [...prev, menu]
    );
  };

  const getLimit = (range: string) => {
    switch (range) {
      case '3M': return 90;
      case '6M': return 180;
      case '1Y': return 365;
      case '3Y': return 1095;
      case 'MAX': return 5000;
      default: return 365;
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const config = SHEET_COLUMN_MAPPING[activeKey as keyof typeof SHEET_COLUMN_MAPPING];
        if (!config) throw new Error("Invalid chart configuration");

        const indicatorKeys = Object.values(config.columns).join(',');
        const limit = getLimit(timeRange);

        // Use the exact API endpoint provided
        const url = `https://became-memphis-compensation-sublime.trycloudflare.com/market-indicators/sample?limit=${limit}&indicators=${indicatorKeys}`;

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);

        const result = await response.json();

        if (result.code !== "000" || !result.data) {
          throw new Error(result.message || "Invalid API response");
        }

        const dataObj = result.data;
        let labels: string[] = [];
        const datasets: any[] = [];
        const colors = ['#fad02c', '#000000', '#9ca3af', '#ef4444', '#3b82f6'];

        const entries = Object.entries(config.columns);

        entries.forEach(([displayName, apiKey], index) => {
          const series = dataObj[apiKey as string];
          if (series && Array.isArray(series) && series.length > 0) {
            // API data is descending (newest first), reverse it for Chart.js (oldest first)
            const sortedSeries = [...series].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            if (labels.length === 0) {
              labels = sortedSeries.map((item: any) => item.date);
            }

            datasets.push({
              label: displayName,
              data: sortedSeries.map((item: any) => item.value),
              borderColor: colors[index % colors.length],
              backgroundColor: colors[index % colors.length],
              borderWidth: 2,
              pointRadius: sortedSeries.length > 60 ? 0 : 3,
              pointHoverRadius: 5,
              tension: 0.2,
              fill: false
            });
          }
        });

        if (datasets.length === 0) {
          throw new Error("No data returned for this indicator range.");
        }

        setChartData({ labels, datasets });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error("Fetch error:", err);
          setError(err.message || "Failed to load terminal data stream");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [activeKey, timeRange]);

  const chartOptions: ChartOptions<'line'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'linear'
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 25,
          font: { family: 'JetBrains Mono', size: 11, weight: 500 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.95)',
        titleFont: { family: 'Playfair Display', size: 14 },
        bodyFont: { family: 'JetBrains Mono', size: 12 },
        padding: 12,
        cornerRadius: 0,
        displayColors: true,
        borderColor: 'rgba(250, 208, 44, 0.5)',
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 8,
          font: { family: 'Inter', size: 10 },
          color: '#6b7280'
        }
      },
      y: {
        grid: { color: '#f3f4f6' },
        beginAtZero: false,
        ticks: {
          font: { family: 'JetBrains Mono', size: 10 },
          color: '#6b7280',
          padding: 10
        }
      }
    }
  }), []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-1 pt-24 px-4 md:px-6 gap-8 container mx-auto max-w-7xl">

        {/* SIDEBAR */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block lg:h-[calc(100vh-140px)] lg:sticky lg:top-28 lg:border-none ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center lg:hidden">
              <span className="font-bold text-sm uppercase tracking-wider">Terminal Explorer</span>
              <button onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
            </div>

            <div className="p-2 border-b border-gray-100 hidden lg:block">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 px-3">Index Selection</span>
            </div>

            <div className="p-4">
              <div className="relative">
                <input type="text" placeholder="Search indicator..." className="w-full bg-gray-50 border border-gray-200 pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:border-black transition-colors rounded-none" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              {CATEGORY_GROUPS.map((group, idx) => (
                <div key={idx} className="mb-2">
                  <button onClick={() => toggleMenu(group.title)} className="w-full flex items-center justify-between p-3 text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className={`${expandedMenus.includes(group.title) ? 'text-black' : 'text-gray-400'} group-hover:text-black transition-colors`}>{group.icon}</span>
                      <span className="tracking-tight">{group.title}</span>
                    </div>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${expandedMenus.includes(group.title) ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedMenus.includes(group.title) && (
                    <div className="ml-4 pl-4 border-l border-gray-100 space-y-1 mt-1 mb-2">
                      {group.keys.map((key) => {
                        if (!SHEET_COLUMN_MAPPING[key as keyof typeof SHEET_COLUMN_MAPPING]) return null;
                        return (
                          <button
                            key={key}
                            onClick={() => { setActiveKey(key); setIsSidebarOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-xs font-medium transition-all ${activeKey === key ? 'bg-black text-[#fad02c]' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
                          >
                            <span>{DISPLAY_NAMES[key] || key}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {isSidebarOpen && (<div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>)}

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full min-w-0 pb-20">
          <div className="lg:hidden mb-6">
            <button className="w-full flex items-center justify-between bg-black text-[#fad02c] px-6 py-3 font-bold text-xs uppercase tracking-widest" onClick={() => setIsSidebarOpen(true)}>
              <div className="flex items-center gap-3"><Menu size={18} /> Select Indicator</div>
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-6 md:px-8 md:py-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-[#fad02c]"></span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Macro Quantitative Research</span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight">{DISPLAY_NAMES[activeKey]}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex border border-gray-200 p-1 bg-gray-50">
                  {['3M', '6M', '1Y', '3Y', 'MAX'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeRange(t as any)}
                      className={`text-[10px] font-bold px-4 py-1.5 transition-all ${timeRange === t ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-black'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 md:p-8 relative h-[500px] w-full bg-white">
              {isLoading && (
                <div className="absolute inset-0 z-20 bg-white/90 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Loader2 className="animate-spin text-black mb-4" size={32} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Requesting Terminal Stream...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 z-20 bg-white flex items-center justify-center p-8">
                  <div className="max-w-md text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-500 mb-4">
                      <Info size={24} />
                    </div>
                    <h3 className="text-lg font-serif mb-2">Data Transmission Failed</h3>
                    <p className="text-sm text-gray-500 mb-6">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#fad02c] hover:text-black transition-colors">
                      Retry Connection
                    </button>
                  </div>
                </div>
              )}

              {!isLoading && !error && chartData && (
                <Line options={chartOptions} data={chartData} />
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-[#fad02c]" size={20} />
                <h3 className="font-serif text-xl font-bold">Research Methodology</h3>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed space-y-4 font-light">
                <p>
                  Indicator <strong>{DISPLAY_NAMES[activeKey]}</strong> is aggregated by the 40 Years Old Terminal from verified raw market sources.
                  We apply standardized data cleaning and normalization models to ensure time-series consistency across multiple market cycles.
                </p>
                <p>
                  Data is synchronized daily following the End Of Day (EOD) market session.
                  Investors are advised to use this terminal output for identifying structural trends rather than short-term noise.
                </p>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-8 shadow-sm">
              <h3 className="font-serif text-xl mb-6 text-[#fad02c]">Terminal Metadata</h3>
              <div className="space-y-4 font-mono text-[10px] uppercase tracking-wider text-gray-400">
                <div className="flex justify-between">
                  <span className="text-gray-600">Indicator ID</span>
                  <span className="text-white">{activeKey}</span>
                </div>
                <div className="w-full h-px bg-gray-800"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sample Size</span>
                  <span className="text-white">{chartData?.labels?.length || 0} EOD Records</span>
                </div>
                <div className="w-full h-px bg-gray-800"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Update Sync</span>
                  <span className="text-white">Daily EOD</span>
                </div>
              </div>
              <button className="mt-8 w-full border border-gray-700 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#fad02c] hover:text-black transition-colors">
                Download CSV Dataset
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChartLibraryPage;
