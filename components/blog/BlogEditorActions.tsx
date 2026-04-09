import React from 'react';

export interface BlogEditorActionsProps {
    isLoading: boolean;
    onSaveDraft: () => void;
    onPublish: () => void;
}

export function BlogEditorActions({ isLoading, onSaveDraft, onPublish }: BlogEditorActionsProps) {
    return (
        <div className="mt-6 flex gap-3 justify-end">
            <button
                onClick={onSaveDraft}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Saving...' : 'Save Draft'}
            </button>
            <button
                onClick={onPublish}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Publishing...' : 'Publish'}
            </button>
        </div>
    );
}
