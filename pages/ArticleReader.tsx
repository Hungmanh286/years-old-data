import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronRight, Clock, Download, Facebook, Link as LinkIcon, Printer } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.hungmanhdev.me';

interface Article {
  id: number;
  category: string;
  description: string;
  title: string;
  date: string;
  heroImage: string;
  content: any;
  area: string;
  url: string;
  report_url?: string;
  author?: string;
  readTime?: string;
}

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    className="fixed top-0 left-0 h-1 bg-[#fad02c] z-[60] transition-all duration-100"
    style={{ width: `${progress}%` }}
  />
);

const ArticleSidebar: React.FC<{ article: Article }> = ({ article }) => {
  const { report_url } = article;
  const related = [
    { title: "Lạm phát Mỹ: Đỉnh hay chưa?", date: "01 May 2025" },
    { title: "Fed và lộ trình lãi suất cuối năm 2025", date: "28 Apr 2025" },
    { title: "Dòng vốn ETF đảo chiều", date: "20 Apr 2025" }
  ];

  const shareToFacebook = () => {
    const url = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Đã sao chép liên kết vào bộ nhớ tạm!');
    }).catch(err => {
      console.error('Lỗi khi sao chép:', err);
    });
  };

  return (
    <aside className="sticky top-32 space-y-10">
      {report_url && (
        <div className="bg-black text-white p-6 shadow-xl">
          <h3 className="font-serif text-xl mb-4 text-[#fad02c]">Báo cáo đầy đủ</h3>
          <p className="text-gray-400 text-xs mb-6">Tải xuống bản phân tích chi tiết.</p>
          <a
            href={`${API_BASE_URL}/posts/${article.id}/report`}
            className="w-full flex items-center justify-center gap-3 bg-[#fad02c] text-black font-bold text-sm uppercase tracking-widest py-3 hover:bg-white transition-colors"
          >
            <Download size={18} /> Tải báo cáo
          </a>
        </div>
      )}

      <div>
        <h3 className="font-serif text-lg mb-4 border-b border-gray-200 pb-2">Chia sẻ</h3>
        <div className="flex gap-4">
          <button
            onClick={shareToFacebook}
            className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors rounded-full"
          >
            <Facebook size={18} />
          </button>
          <button
            onClick={copyToClipboard}
            className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors rounded-full"
          >
            <LinkIcon size={18} />
          </button>
          <button
            onClick={() => window.print()}
            className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors rounded-full"
          >
            <Printer size={18} />
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-lg mb-6 border-b border-gray-200 pb-2">Bài viết liên quan</h3>
        <div className="space-y-6">
          {related.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.date}</div>
              <h4 className="font-serif text-lg leading-snug group-hover:text-[#fad02c] transition-colors">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

const ArticleReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: '',
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4',
      },
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu bài viết.');
        }
        const data = await response.json();
        setArticle(data);
      } catch (err: any) {
        console.error('Error fetching article:', err);
        setError(err.message || 'Đã có lỗi xảy ra');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (editor && article?.content) {
      editor.commands.setContent(article.content);
    }
  }, [editor, article]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fad02c]"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-serif text-gray-800">{error || 'Không tìm thấy bài viết'}</h2>
        <button onClick={() => navigate('/research')} className="text-[#fad02c] hover:underline">
          Quay lại danh sách bài viết
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ProgressBar progress={scrollProgress} />
      <Header />
      <div className="h-28"></div>

      <section className="pb-12 border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-8">
            <button onClick={() => navigate('/')} className="hover:text-black cursor-pointer transition-colors">Trang chủ</button>
            <ChevronRight size={12} />
            <button onClick={() => navigate('/research')} className="hover:text-black cursor-pointer transition-colors">Nghiên cứu</button>
            <ChevronRight size={12} />
            <span className="text-[#fad02c] font-bold">{article.category}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12">
            <header className="lg:col-span-8">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900 mb-6">{article.title}</h1>
              {article.description && (
                <p className="text-xl text-gray-500 font-light leading-relaxed mb-8 border-l-4 border-[#fad02c] pl-6 italic">
                  {article.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-b border-gray-100 py-4">
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <time dateTime={article.date}>{article.date}</time>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1"><Clock size={14} />{article.readTime || "5 phút đọc"}</div>
              </div>
            </header>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">
            <main className="lg:col-span-8">
              {article.heroImage && (
                <div className="mb-10 aspect-video overflow-hidden bg-gray-100 rounded-lg shadow-sm">
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="font-body text-gray-800 leading-8 text-lg space-y-8 drop-cap">
                <EditorContent editor={editor} />
              </div>
            </main>

            <div className="lg:col-span-4">
              <ArticleSidebar article={article} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ArticleReaderPage;