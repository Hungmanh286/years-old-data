/**
 * Centralized TipTap extension configuration.
 * All editor extensions are registered here so BlogEditor stays clean.
 */
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Blockquote from '@tiptap/extension-blockquote'
import { BulletList, OrderedList, ListItem, ListKeymap } from '@tiptap/extension-list'
import CodeBlock from '@tiptap/extension-code-block'
import { Dropcursor } from '@tiptap/extension-dropcursor'
import { ResizableImage } from '@/extensions/ResizableImage'
import type { Extensions } from '@tiptap/react'

export const editorExtensions: Extensions = [
    Document,
    Paragraph,
    Text,
    Bold,
    Italic,
    Strike,
    Heading.configure({
        levels: [1, 2, 3],
    }),
    Blockquote,
    BulletList,
    OrderedList,
    ListItem,
    ListKeymap,
    CodeBlock,
    ResizableImage,
    Dropcursor,
]
