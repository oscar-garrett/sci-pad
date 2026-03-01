import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { MarkdownEditor } from "./markdown-editor";

export function FileViewer({ filepath }: { filepath: string }) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);
      
      try {
        const text: string = await invoke("read_file_content", { path: filepath });
        setContent(text);
      } catch (e) {
        console.error("Failed to read file:", e);
        setError(String(e));
      } finally {
        setLoading(false);
      }
    }

    if (filepath) {
      fetchContent();
    }
  }, [filepath]);

  if (loading) {
    return <div className="p-8 text-muted-foreground animate-pulse">Loading file contents...</div>;
  }

  if (error) {
    return <div className="p-8 text-destructive">Error: {error}</div>; // Swapped to shadcn 'destructive'
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <MarkdownEditor key={filepath} initialContent={content} />
    </div>
  );
}