import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import Header from '../components/Header';
import Footer from '../components/Footer';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hungmanhdev.me';

interface PostResponse {
    id: number;
    title: string;
    content: any;
    category: string;
    description: string;
    date: string;
    heroImage?: string;
    area: string;
    url: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export default function BlogEditor() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
    const [heroImageUrl, setHeroImageUrl] = useState('');
    const [area, setArea] = useState('');
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            (Image as any).configure({
                allowBase64: true,
            }),
            Dropcursor,
        ],
        content: '<p>Hello World! Start writing your blog...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4',
            },
        },
    });

    const createPost = async (status: 'draft' | 'published') => {
        // Validation
        if (!title.trim()) {
            setError('Please enter a title');
            return;
        }
        if (!category.trim()) {
            setError('Please select a category');
            return;
        }
        if (!description.trim()) {
            setError('Please enter a description');
            return;
        }
        if (!area.trim()) {
            setError('Please enter an area');
            return;
        }
        if (!url.trim()) {
            setError('Please enter a URL slug');
            return;
        }

        if (!editor) {
            setError('Editor not initialized');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const formData = new FormData();
            formData.append('category', category.trim());
            formData.append('description', description.trim());
            formData.append('title', title.trim());
            formData.append('date', date);
            // Content phải là string (JSON.stringify của TipTap JSON)
            formData.append('content', JSON.stringify(editor.getJSON()));
            formData.append('area', area.trim());
            formData.append('url', url.trim());

            // Hero image: ưu tiên file upload, nếu không có thì dùng URL
            if (heroImageFile) {
                formData.append('hero_image', heroImageFile);
            } else if (heroImageUrl.trim()) {
                formData.append('hero_image_url', heroImageUrl.trim());
            }

            const apiUrl = `${API_BASE_URL}/posts/`;
            console.log('=== API Request Details ===');
            console.log('API URL:', apiUrl);
            console.log('Fields:', { category, description, title, date, area, url, heroImageFile, heroImageUrl });
            console.log('========================');

            const response = await fetch(apiUrl, {
                method: 'POST',
                // Không set Content-Type - browser tự set multipart/form-data với boundary
                body: formData,
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error response:', errorData);

                // Handle different error formats from FastAPI
                let errorMessage = '';

                if (errorData.detail) {
                    // Check if detail is an array (validation errors)
                    if (Array.isArray(errorData.detail)) {
                        errorMessage = errorData.detail
                            .map((err: any) => {
                                const location = err.loc ? err.loc.join(' -> ') : 'unknown';
                                return `${location}: ${err.msg}`;
                            })
                            .join('\n');
                    } else if (typeof errorData.detail === 'string') {
                        errorMessage = errorData.detail;
                    } else if (typeof errorData.detail === 'object') {
                        errorMessage = JSON.stringify(errorData.detail, null, 2);
                    }
                } else if (errorData.message) {
                    errorMessage = errorData.message;
                } else {
                    errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
                }

                throw new Error(errorMessage || `Request failed with status ${response.status}`);
            }

            const result: PostResponse = await response.json();
            console.log('Success response:', result);
            setSuccessMessage(
                status === 'draft'
                    ? `Draft saved successfully! Post ID: ${result.id}`
                    : `Post published successfully! Post ID: ${result.id}`
            );

            // Optional: Reset form after successful publish (not for draft)
            if (status === 'published') {
                setTitle('');
                setCategory('');
                setDescription('');
                setDate(new Date().toISOString().split('T')[0]);
                setHeroImageFile(null);
                setHeroImageUrl('');
                setArea('');
                setUrl('');
                editor.commands.setContent('<p>Hello World! Start writing your blog...</p>');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
            console.error('=== API Error ===');
            console.error('Error:', errorMessage);
            console.error('Full error:', err);
            console.error('================');
            setError(`API Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveDraft = () => {
        createPost('draft');
    };

    const handlePublish = () => {
        createPost('published');
    };

    const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file || !editor) return;

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result && editor) {
                editor.chain().focus().setImage({ src: reader.result as string }).run();
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Write Blog</h1>
                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            <strong className="block mb-2">Error:</strong>
                            <pre className="whitespace-pre-wrap text-sm font-mono bg-red-100 p-2 rounded">
                                {error}
                            </pre>
                        </div>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                            {successMessage}
                        </div>
                    )}

                    {/* Form Fields */}
                    <div className="space-y-4 mb-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your blog title..."
                                className="w-full px-4 py-3 text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category and Area */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="e.g., Technology, Travel, Food"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Area <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    placeholder="e.g., Blog, News, Tutorial"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Brief description of your blog post..."
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Date and URL Slug */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="my-blog-post"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Hero Image - File Upload hoặc URL */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hero Image (upload file)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setHeroImageFile(e.target.files?.[0] ?? null)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                {heroImageFile && (
                                    <p className="text-xs text-green-600 mt-1">✓ {heroImageFile.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hero Image URL <span className="text-gray-400 font-normal">(dùng nếu không upload file)</span>
                                </label>
                                <input
                                    type="text"
                                    value={heroImageUrl}
                                    onChange={(e) => setHeroImageUrl(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    disabled={!!heroImageFile}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Editor Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content <span className="text-red-500">*</span>
                        </label>

                        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                            <div className="border-b border-gray-200 bg-gray-50 p-3 flex gap-2 flex-wrap">
                                <button
                                    onClick={() => editor?.chain().focus().toggleBold().run()}
                                    className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor?.isActive('bold') ? 'bg-gray-200 font-bold' : 'bg-white'
                                        }`}
                                >
                                    Bold
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                                    className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor?.isActive('italic') ? 'bg-gray-200 italic' : 'bg-white'
                                        }`}
                                >
                                    Italic
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                                    className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor?.isActive('strike') ? 'bg-gray-200 line-through' : 'bg-white'
                                        }`}
                                >
                                    Strike
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                                    className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor?.isActive('heading', { level: 1 }) ? 'bg-gray-200 font-bold' : 'bg-white'
                                        }`}
                                >
                                    H1
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                                    className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200 font-bold' : 'bg-white'
                                        }`}
                                >
                                    H2
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                    className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor?.isActive('bulletList') ? 'bg-gray-200' : 'bg-white'
                                        }`}
                                >
                                    • List
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                                    className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor?.isActive('orderedList') ? 'bg-gray-200' : 'bg-white'
                                        }`}
                                >
                                    1. List
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                                    className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 font-mono ${editor?.isActive('codeBlock') ? 'bg-gray-200' : 'bg-white'
                                        }`}
                                >
                                    &lt;/&gt; Code
                                </button>
                                <label className="px-3 py-1 text-sm border rounded hover:bg-gray-100 bg-white cursor-pointer">
                                    🖼️ Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={addImage}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            <EditorContent
                                editor={editor}
                                className="min-h-[500px] p-6"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3 justify-end">
                        <button
                            onClick={handleSaveDraft}
                            disabled={isLoading}
                            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button
                            onClick={handlePublish}
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
