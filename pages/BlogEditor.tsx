import './styles.scss';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { editorExtensions } from '../components/tiptap-ui/editorExtensions';
import { BlogMetadataForm } from '../components/blog/BlogMetadataForm';
import { BlogEditorToolbar } from '../components/blog/BlogEditorToolbar';
import { BlogEditorActions } from '../components/blog/BlogEditorActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.hungmanhdev.me';

interface PostCreate {
    title: string;
    content: any; // TipTap JSON content
    category?: string;
    description: string;
    date: string;
    heroImage: string;
    area: string;
    url: string;
    status?: 'draft' | 'published';
}

interface PostResponse {
    id: number;
    title: string;
    content: any;
    category?: string;
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const editor = useEditor({
        extensions: editorExtensions,
        content: '<p>Hello World! Start writing your blog...</p>',
        editorProps: {
            attributes: {
                class: 'mx-auto focus:outline-none min-h-[400px] p-4',
            },
        },
    });

    const createPost = async (status: 'draft' | 'published') => {
        // Validation
        if (!title.trim()) {
            setError('Please enter a title');
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

            // Hero image: ưu tiên file upload, nếu không có thì dùng URL
            if (heroImageFile) {
                formData.append('hero_image', heroImageFile);
            } else if (heroImageUrl.trim()) {
                formData.append('hero_image_url', heroImageUrl.trim());
            }

            const apiUrl = `${API_BASE_URL}/posts/`;
            console.log('=== API Request Details ===');
            console.log('API URL:', apiUrl);
            console.log('Fields:', { category, description, title, date, area, heroImageFile, heroImageUrl });
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
        // Reset input so same file can be re-selected
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

                    {/* Form Fields - Extracted to Component */}
                    <BlogMetadataForm
                        title={title} setTitle={setTitle}
                        category={category} setCategory={setCategory}
                        area={area} setArea={setArea}
                        description={description} setDescription={setDescription}
                        date={date} setDate={setDate}
                        heroImageFile={heroImageFile} setHeroImageFile={setHeroImageFile}
                        heroImageUrl={heroImageUrl} setHeroImageUrl={setHeroImageUrl}
                    />

                    {/* Editor Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content <span className="text-red-500">*</span>
                        </label>

                        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                            <BlogEditorToolbar editor={editor} addImage={addImage} />

                            <EditorContent
                                editor={editor}
                                className="min-h-[500px] p-6"
                            />
                        </div>
                    </div>

                    <BlogEditorActions
                        isLoading={isLoading}
                        onSaveDraft={handleSaveDraft}
                        onPublish={handlePublish}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
