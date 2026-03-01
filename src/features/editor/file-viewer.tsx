import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { MarkdownEditor } from "./markdown-editor";

export function FileViewer({ filepath }: { filepath: string }) {
  // Loading and Error State
  const [initialContent, setInitialContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Save State
  const [currentContent, setCurrentContent] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved" | "error">("saved");

  // Load the file initially
  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);
      setSaveStatus("saved");
      
      try {
        const text: string = await invoke("read_file_content", { path: filepath });
        setInitialContent(text);
        setCurrentContent(text); // Sync current content
      } catch (e) {
        console.error("Failed to read file:", e);
        setError(String(e));
      } finally {
        setLoading(false);
      }
    }

    if (filepath) fetchContent();
  }, [filepath]);

  // The Debounced Autosave Effect
  useEffect(() => {
    // Don't try to save if we haven't changed anything since loading
    if (saveStatus !== "unsaved") return;

    // Set a timer for 1000ms
    const timeoutId = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await invoke("write_file_content", { 
          path: filepath, 
          content: currentContent 
        });
        setSaveStatus("saved");
      } catch (e) {
        console.error("Failed to save file:", e);
        setSaveStatus("error");
      }
    }, 1000);

    // If the user types again BEFORE 1000ms, this cleanup function runs and cancels the previous timer!
    return () => clearTimeout(timeoutId);
  }, [currentContent, filepath, saveStatus]);

  if (loading) return <div className="p-8 text-muted-foreground animate-pulse">Loading document...</div>;
  if (error) return <div className="p-8 text-destructive">Error: {error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      
      {/* Visual Save Status Indicator */}
      <div className="absolute top-2 right-8 text-xs text-muted-foreground font-mono">
        {saveStatus === "saving" && "Saving..."}
        {saveStatus === "unsaved" && "Unsaved changes"}
        {saveStatus === "saved" && "Saved"}
        {saveStatus === "error" && <span className="text-destructive">Failed to save</span>}
      </div>

      <MarkdownEditor 
        key={filepath} 
        initialContent={initialContent} 
        onChange={(newMarkdown) => {
          // Update the content and mark it as dirty to trigger the autosave countdown
          setCurrentContent(newMarkdown);
          setSaveStatus("unsaved");
        }}
      />
    </div>
  );
}