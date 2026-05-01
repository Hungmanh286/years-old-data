import React from 'react';

export interface BlogMetadataFormProps {
    title: string;
    setTitle: (val: string) => void;
    category: string;
    setCategory: (val: string) => void;
    area: string;
    setArea: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    date: string;
    setDate: (val: string) => void;
    heroImageFile: File | null;
    setHeroImageFile: (val: File | null) => void;
    heroImageUrl: string;
    setHeroImageUrl: (val: string) => void;
    reportFile: File | null;
    setReportFile: (val: File | null) => void;
}

export function BlogMetadataForm({
    title, setTitle,
    category, setCategory,
    area, setArea,
    description, setDescription,
    date, setDate,
    heroImageFile, setHeroImageFile,
    heroImageUrl, setHeroImageUrl,
    reportFile, setReportFile,
}: BlogMetadataFormProps) {
    return (
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
                        Category
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

            {/* Date */}
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

            {/* PDF Report Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Báo cáo PDF{' '}
                    <span className="text-gray-400 font-normal">(tuỳ chọn)</span>
                </label>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setReportFile(e.target.files?.[0] ?? null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {reportFile && (
                    <p className="text-xs text-green-600 mt-1">✓ {reportFile.name}</p>
                )}
            </div>
        </div>
    );
}
