import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

export function MarkdownEditor({ 
    initialContent, 
    onChange 
}: { 
    initialContent: string, onChange: (markdown: string) => void;
 }) {
  const editor = useEditor({
    // Load tiptap extensions
    extensions: [
      StarterKit,
      Markdown, // This parses the raw .md file from Rust into rich text
    ],
    // Pass in the raw text from the hard drive
    content: initialContent,

    // Each time the document changes, convert the editor contents to markdown
    onUpdate: ({ editor }) => {
        const markdown = (editor.storage as any).markdown.getMarkdown();
        onChange(markdown);
    },

    // Style the editor area
    editorProps: {
      attributes: {
        // 'prose' triggers the Tailwind Typography plugin. 
        // We use shadcn CSS variables to ensure it respects dark/light themes.
        // Must be a single line without manual line breaks...
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[500px] prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-primary prose-blockquote:border-l-border prose-blockquote:text-muted-foreground prose-hr:border-border prose-ul:text-muted-foreground prose-ol:text-muted-foreground",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <EditorContent editor={editor} />
    </div>
  );
}