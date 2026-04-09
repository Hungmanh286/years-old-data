import React from 'react';
import { Editor } from '@tiptap/react';
import { BlockquoteButton } from '../tiptap-ui/blockquote-button';

export function BlogEditorToolbar({ editor, addImage }: { editor: Editor | null; addImage: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b border-gray-200 bg-gray-50 p-3 flex gap-2 flex-wrap">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200 font-bold' : 'bg-white'}`}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200 italic' : 'bg-white'}`}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor.isActive('strike') ? 'bg-gray-200 line-through' : 'bg-white'}`}
            >
                Strike
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active px-3 py-1 text-sm border rounded bg-gray-200 font-bold' : 'px-3 py-1 text-sm border rounded hover:bg-gray-100 bg-white'}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active px-3 py-1 text-sm border rounded bg-gray-200 font-bold' : 'px-3 py-1 text-sm border rounded hover:bg-gray-100 bg-white'}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active px-3 py-1 text-sm border rounded bg-gray-200 font-bold' : 'px-3 py-1 text-sm border rounded hover:bg-gray-100 bg-white'}
            >
                H3
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : 'bg-white'}`}
            >
                • List
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200' : 'bg-white'}`}
            >
                1. List
            </button>
            <button
                onClick={() => editor.chain().focus().splitListItem('listItem').run()}
                disabled={!editor.can().splitListItem('listItem')}
                className={`px-3 py-1 text-sm border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                Split list item
            </button>
            <button
                onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                disabled={!editor.can().sinkListItem('listItem')}
                className={`px-3 py-1 text-sm border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                Sink list item
            </button>
            <button
                onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                disabled={!editor.can().liftListItem('listItem')}
                className={`px-3 py-1 text-sm border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                Lift list item
            </button>
            <BlockquoteButton editor={editor} />
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 font-mono ${editor.isActive('codeBlock') ? 'bg-gray-200' : 'bg-white'}`}
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
            {/* Image alignment buttons */}
            {editor.isActive('image') && (
                <>
                    <span className="px-1 text-gray-400 text-xs self-center">│</span>
                    {(['left', 'center', 'right'] as const).map((align) => (
                        <button
                            key={align}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                (editor.chain().focus() as any)
                                    .updateAttributes('image', { textAlign: align })
                                    .run();
                            }}
                            title={`Align image ${align}`}
                            className={`px-2 py-1 text-sm border rounded ${editor.getAttributes('image').textAlign === align
                                ? 'bg-indigo-100 border-indigo-400 text-indigo-700'
                                : 'bg-white hover:bg-gray-100'
                                }`}
                        >
                            {align === 'left' ? '⇤' : align === 'center' ? '↔' : '⇥'}
                        </button>
                    ))}
                </>
            )}
        </div>
    );
}
