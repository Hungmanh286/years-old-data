import React, { useCallback, useRef, useState } from 'react';
import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Alignment = 'left' | 'center' | 'right';

// ─── NodeView Component ───────────────────────────────────────────────────────

const ResizableImageView: React.FC<NodeViewProps> = ({ node, updateAttributes, selected }) => {
    const { src, alt, width, textAlign } = node.attrs as {
        src: string;
        alt: string;
        width: number;
        textAlign: Alignment;
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const startWidth = useRef(0);
    const [isResizing, setIsResizing] = useState(false);

    // ── Resize logic ────────────────────────────────────────────────────────────

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            const delta = e.clientX - startX.current;
            const newWidth = Math.max(80, Math.min(startWidth.current + delta, 1200));
            updateAttributes({ width: newWidth });
        },
        [updateAttributes],
    );

    const onMouseUp = useCallback(() => {
        setIsResizing(false);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }, [onMouseMove]);

    const startResize = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            startX.current = e.clientX;
            startWidth.current = width ?? containerRef.current?.offsetWidth ?? 300;
            setIsResizing(true);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        },
        [onMouseMove, onMouseUp, width],
    );

    // ── Alignment helpers ────────────────────────────────────────────────────────

    const setAlign = (align: Alignment) => updateAttributes({ textAlign: align });

    const justify: Record<Alignment, string> = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
    };

    // ── Render ───────────────────────────────────────────────────────────────────

    return (
        <NodeViewWrapper
            style={{
                display: 'flex',
                justifyContent: justify[textAlign as Alignment] ?? 'flex-start',
                width: '100%',
                userSelect: isResizing ? 'none' : undefined,
            }}
        >
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: width ? `${width}px` : 'auto',
                    maxWidth: '100%',
                }}
            >
                {/* Alignment + controls toolbar — only visible when selected */}
                {selected && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '-38px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '4px',
                            background: '#1e1e2e',
                            borderRadius: '6px',
                            padding: '4px 6px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                            zIndex: 10,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {(['left', 'center', 'right'] as Alignment[]).map((a) => (
                            <button
                                key={a}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    setAlign(a);
                                }}
                                title={`Align ${a}`}
                                style={{
                                    background: textAlign === a ? '#6366f1' : 'transparent',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '2px 7px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    lineHeight: '1.6',
                                    transition: 'background 0.15s',
                                }}
                            >
                                {a === 'left' ? '⬛◻◻' : a === 'center' ? '◻⬛◻' : '◻◻⬛'}
                            </button>
                        ))}
                        <div
                            style={{ width: '1px', background: '#444', margin: '0 2px', borderRadius: '2px' }}
                        />
                        <span style={{ color: '#aaa', fontSize: '12px', alignSelf: 'center' }}>
                            {width ? `${width}px` : 'auto'}
                        </span>
                    </div>
                )}

                {/* The actual image */}
                <img
                    src={src}
                    alt={alt ?? ''}
                    draggable={false}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: 'auto',
                        borderRadius: '4px',
                        outline: selected ? '2px solid #6366f1' : 'none',
                        outlineOffset: '2px',
                        cursor: 'default',
                    }}
                />

                {/* Right-edge drag handle */}
                {selected && (
                    <div
                        onMouseDown={startResize}
                        title="Drag to resize"
                        style={{
                            position: 'absolute',
                            right: '-5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '10px',
                            height: '40px',
                            background: '#6366f1',
                            borderRadius: '3px',
                            cursor: 'ew-resize',
                            zIndex: 10,
                            boxShadow: '0 0 0 2px #fff',
                        }}
                    />
                )}
            </div>
        </NodeViewWrapper>
    );
};

// ─── Extension ────────────────────────────────────────────────────────────────

export const ResizableImage = Node.create({
    name: 'image',
    group: 'block',
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            src: { default: null },
            alt: { default: null },
            title: { default: null },
            width: { default: null },
            textAlign: { default: 'left' },
        };
    },

    parseHTML() {
        return [{ tag: 'img[src]' }];
    },

    renderHTML({ HTMLAttributes }) {
        const { textAlign, width, ...rest } = HTMLAttributes;
        const style = [
            `display:block`,
            `margin:${textAlign === 'center' ? '0 auto' : textAlign === 'right' ? '0 0 0 auto' : '0'}`,
            width ? `width:${width}px` : '',
        ]
            .filter(Boolean)
            .join(';');
        return ['img', mergeAttributes(rest, { style })];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ResizableImageView);
    },

    addCommands() {
        return {
            setImage:
                (attrs) =>
                    ({ commands }) => {
                        return commands.insertContent({ type: this.name, attrs });
                    },
        } as any;
    },
});
