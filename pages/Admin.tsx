import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Pencil, Trash2, X, Plus } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import { editorExtensions } from '../components/tiptap-ui/editorExtensions';
import { BlogMetadataForm } from '../components/blog/BlogMetadataForm';
import { BlogEditorToolbar } from '../components/blog/BlogEditorToolbar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.hungmanhdev.me';

interface Article {
    id: number;
    title: string;
    category: string;
    description: string;
    date: string;
    heroImage?: string;
    content?: any;
    area: string;
    url?: string;
    status?: string;
    report_url?: string;
    created_at?: string;
    updated_at?: string;
}

const normalizeContent = (content: any) => {
    if (!content) return '<p></p>';

    if (typeof content === 'string') {
        try {
            return JSON.parse(content);
        } catch (error) {
            return content;
        }
    }

    return content;
};

const ArticleDetailView = ({
    post,
    onBack,
    onEdit,
}: {
    post: Article;
    onBack: () => void;
    onEdit: () => void;
}) => {
    const editor = useEditor({
        extensions: editorExtensions,
        content: normalizeContent(post.content),
        editable: false,
        editorProps: {
            attributes: {
                class: 'mx-auto focus:outline-none min-h-[240px] p-4',
            },
        },
    });

    useEffect(() => {
        if (editor) {
            editor.commands.setContent(normalizeContent(post.content));
        }
    }, [editor, post.content]);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
                <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Article details</p>
                    <h2 className="text-2xl font-bold font-serif text-gray-800">{post.title}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                    <button
                        onClick={onEdit}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#fad02c] text-black font-bold rounded-lg hover:bg-[#e5bc25] transition-colors"
                    >
                        <Pencil size={16} /> Edit
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 p-6">
                <div className="lg:col-span-8 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div className="rounded-lg bg-gray-50 p-4">
                            <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Category</div>
                            <div className="font-medium text-gray-900">{post.category || 'N/A'}</div>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Area</div>
                            <div className="font-medium text-gray-900">{post.area || 'N/A'}</div>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Date</div>
                            <div className="font-medium text-gray-900">{post.date || 'N/A'}</div>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Status</div>
                            <div className="font-medium text-gray-900">{post.status || 'N/A'}</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                        <p className="text-gray-600 leading-7 bg-gray-50 rounded-lg p-4">{post.description || 'No description available.'}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Content</h3>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <EditorContent editor={editor} className="min-h-[240px] p-6" />
                        </div>
                    </div>
                </div>

                <aside className="lg:col-span-4 space-y-6">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3">
                        <h3 className="text-sm font-semibold text-gray-700">Post info</h3>
                        <dl className="space-y-3 text-sm">
                            <div>
                                <dt className="text-gray-400 uppercase tracking-widest text-[10px]">ID</dt>
                                <dd className="font-medium text-gray-900">#{post.id}</dd>
                            </div>
                            <div>
                                <dt className="text-gray-400 uppercase tracking-widest text-[10px]">URL</dt>
                                <dd className="font-medium text-gray-900 break-all">{post.url || 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="text-gray-400 uppercase tracking-widest text-[10px]">Created</dt>
                                <dd className="font-medium text-gray-900">{post.created_at || 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="text-gray-400 uppercase tracking-widest text-[10px]">Updated</dt>
                                <dd className="font-medium text-gray-900">{post.updated_at || 'N/A'}</dd>
                            </div>
                        </dl>
                    </div>

                    {post.heroImage && (
                        <div className="rounded-lg border border-gray-200 overflow-hidden">
                            <img src={post.heroImage} alt={post.title} className="w-full h-56 object-cover" />
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

const EditPostForm = ({ post, onBack, onUpdate }: { post: Article, onBack: () => void, onUpdate: () => void }) => {
    const [title, setTitle] = useState(post.title || '');
    const [category, setCategory] = useState(post.category || '');
    const [description, setDescription] = useState(post.description || '');
    const [date, setDate] = useState(post.date || new Date().toISOString().split('T')[0]);
    const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
    const [heroImageUrl, setHeroImageUrl] = useState('');
    const [reportFile, setReportFile] = useState<File | null>(null);
    const [area, setArea] = useState(post.area || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Helper to safely parse content if it's a JSON string
    const getInitialContent = () => {
        if (!post.content) return '<p></p>';
        if (typeof post.content === 'string') {
            try {
                return JSON.parse(post.content);
            } catch (e) {
                return post.content; // It might be HTML
            }
        }
        return post.content;
    };

    const editor = useEditor({
        extensions: editorExtensions,
        content: getInitialContent(),
        editorProps: {
            attributes: {
                class: 'mx-auto focus:outline-none min-h-[400px] p-4',
            },
        },
    });

    const handleUpdate = async () => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const formData = new FormData();

            // Only append changed fields
            if (title.trim() && title !== post.title) formData.append('title', title.trim());
            if (category.trim() && category !== post.category) formData.append('category', category.trim());
            if (description.trim() && description !== post.description) formData.append('description', description.trim());
            if (date && date !== post.date) formData.append('date', date);
            if (area.trim() && area !== post.area) formData.append('area', area.trim());

            if (editor) {
                const currentContent = editor.getJSON();
                if (JSON.stringify(currentContent) !== JSON.stringify(post.content)) {
                    formData.append('content', JSON.stringify(currentContent));
                }
            }

            if (heroImageFile) {
                formData.append('hero_image', heroImageFile);
            } else if (heroImageUrl.trim()) {
                formData.append('hero_image_url', heroImageUrl.trim());
            }

            if (reportFile) {
                formData.append('report_file', reportFile);
            }

            // Check if formData is empty
            let hasData = false;
            for (let key of formData.keys()) {
                hasData = true;
                break;
            }

            if (!hasData) {
                setSuccessMessage('No changes to save.');
                setIsLoading(false);
                return;
            }

            const response = await fetch(`${API_BASE_URL}/posts/${post.id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Request failed with status ${response.status}`);
            }

            setSuccessMessage('Post updated successfully!');
            setTimeout(() => {
                onUpdate();
            }, 1500);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
            setError(`API Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file || !editor) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result && editor) {
                (editor.chain().focus() as any)
                    .setImage({ src: reader.result as string, textAlign: 'left', width: null })
                    .run();
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-serif text-gray-800">Edit Post: {post.id}</h2>
                <button onClick={onBack} className="text-gray-500 hover:text-gray-700 transition-colors">
                    <X size={24} />
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    {successMessage}
                </div>
            )}

            <BlogMetadataForm
                title={title} setTitle={setTitle}
                category={category} setCategory={setCategory}
                area={area} setArea={setArea}
                description={description} setDescription={setDescription}
                date={date} setDate={setDate}
                heroImageFile={heroImageFile} setHeroImageFile={setHeroImageFile}
                heroImageUrl={heroImageUrl} setHeroImageUrl={setHeroImageUrl}
                reportFile={reportFile} setReportFile={setReportFile}
            />

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <BlogEditorToolbar editor={editor} addImage={addImage} />
                    <EditorContent editor={editor} className="min-h-[400px] p-6" />
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
                <button
                    onClick={onBack}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="px-6 py-2 bg-[#fad02c] text-black font-bold rounded-lg hover:bg-[#e5bc25] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default function AdminPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [detailError, setDetailError] = useState<string | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [editingPost, setEditingPost] = useState<Article | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const fetchArticles = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_BASE_URL}/posts/`);
            if (!response.ok) throw new Error('Failed to fetch articles');
            const data = await response.json();
            // Sort by ID descending
            setArticles(data.sort((a: Article, b: Article) => b.id - a.id));
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleSelectArticle = async (article: Article) => {
        setIsDetailLoading(true);
        setDetailError(null);
        setEditingPost(null);

        try {
            const response = await fetch(`${API_BASE_URL}/posts/${article.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch article details');
            }

            const data = await response.json();
            setSelectedArticle(data);
        } catch (error) {
            console.error('Error fetching article detail:', error);
            setDetailError('Không thể tải chi tiết bài viết này.');
            setSelectedArticle(article);
        } finally {
            setIsDetailLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        setIsDeleting(id);
        try {
            const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete');
            setArticles(prev => prev.filter(a => a.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12 mt-16">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-gray-500 text-sm mt-2">Manage your blog posts</p>
                        </div>
                        {!editingPost && !selectedArticle && (
                            <a
                                href="/blog"
                                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide hover:bg-gray-800 transition-colors"
                            >
                                <Plus size={18} /> New Post
                            </a>
                        )}
                    </div>

                    {editingPost ? (
                        <EditPostForm
                            post={editingPost}
                            onBack={() => setEditingPost(null)}
                            onUpdate={() => {
                                setEditingPost(null);
                                setSelectedArticle(null);
                                fetchArticles();
                            }}
                        />
                    ) : selectedArticle ? (
                        <div className="space-y-4">
                            {detailError && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {detailError}
                                </div>
                            )}
                            {isDetailLoading ? (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                                    Loading article details...
                                </div>
                            ) : (
                                <ArticleDetailView
                                    post={selectedArticle}
                                    onBack={() => setSelectedArticle(null)}
                                    onEdit={() => setEditingPost(selectedArticle)}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-700 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4">ID</th>
                                            <th className="px-6 py-4">Title</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                    Loading posts...
                                                </td>
                                            </tr>
                                        ) : articles.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                    No posts found.
                                                </td>
                                            </tr>
                                        ) : (
                                            articles.map(article => (
                                                <tr
                                                    key={article.id}
                                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                                    onClick={() => handleSelectArticle(article)}
                                                >
                                                    <td className="px-6 py-4 font-medium text-gray-900">#{article.id}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-gray-900 mb-1">{article.title}</div>
                                                        <div className="text-xs text-gray-400 truncate max-w-md">{article.description}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {article.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500">{article.date}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <button
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    setEditingPost(article);
                                                                }}
                                                                className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                                                                title="Edit Post"
                                                            >
                                                                <Pencil size={18} />
                                                            </button>
                                                            <button
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    handleDelete(article.id);
                                                                }}
                                                                disabled={isDeleting === article.id}
                                                                className="text-red-500 hover:text-red-700 transition-colors p-1 disabled:opacity-50"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
