import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tab, useWorkspaceStore } from "@/store/workspace";
import { X } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable"
import { DragDropProvider } from "@dnd-kit/react";
import { invoke } from "@tauri-apps/api/core";
import { ScrollArea } from "@/components/ui/scroll-area";

// Draggable tab component
function SortableTab({ tab, isActive, index }: { tab: Tab; isActive: boolean; index: number }) {
  const { setActiveTab, closeTab } = useWorkspaceStore();
  
  // Define a sortable reference
  const { ref } = useSortable({ 
    id: tab.id, 
    index 
  });

  return (
    <div
      ref={ref} // Link up the sortable reference
      onPointerDown={() => setActiveTab(tab.id)}
      className={`group flex items-center gap-2 px-3 py-2 min-w-[120px] max-w-[200px] border-r border-border select-none cursor-pointer ${
        isActive
          ? "bg-accent text-accent-foreground border-t-2 border-border"
          : "bg-transparent text-muted-foreground hover:bg-muted"
      }`}
    >
      <span className="truncate text-sm flex-1">{tab.title}</span>

      <Button
        size="icon-xs"
        variant="ghost"
        onPointerDown={(e) => {
          e.stopPropagation(); // Stop drag AND click from bubbling
          closeTab(tab.id);
        }}
        className={`p-0.5 rounded-md hover:bg-accent-foreground transition-opacity z-10 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <X className="size-3" />
      </Button>
    </div>
  );
}

// --- CONTENT VIEWER ---
function FileViewer({ filepath }: { filepath: string }) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);
      
      try {
        // Call our new Rust command
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
  }, [filepath]); // Re-run whenever the filepath changes

  if (loading) {
    return <div className="p-8 text-muted-foreground animate-pulse">Loading file contents...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* We use a 'pre' tag for now so it respects whitespace and line breaks in your code/markdown files */}
      <pre className="whitespace-pre-wrap font-mono text-sm text-foreground bg-muted/20 p-6 rounded-md border border-border">
        {content}
      </pre>
    </div>
  );
}

function MainView() {
  const { openTabs, activeTabId, reorderTabs } = useWorkspaceStore();

  // Render the empty state
  if (openTabs.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background text-secondary-foreground">
        <p>Open a file or experiment to begin</p>
      </div>
    );
  }

  // Find the content we should actually be rendering
  const activeTabContent = openTabs.find(t => t.id === activeTabId);

return (
    <div className="flex flex-col h-full bg-background">
      
      {/* --- THE TAB BAR --- */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-border bg-background">
        {/* Define drag and drop area using dnd-kit */}
        <DragDropProvider
          onDragEnd={(event) => {
            const { source, target } = event.operation;
            if (source && target && source.id !== target.id) {
              reorderTabs(source.id as string, target.id as string);
            }
          }}
        >
            {/* Create a sortable tab for each open tab */}
            {openTabs.map((tab, index) => ( 
              <SortableTab
                key={tab.id}
                tab={tab}
                index={index}
                isActive={activeTabId === tab.id}
              />
            ))}
        </DragDropProvider>
      </div>

      {/* --- THE CONTENT AREA --- */}
      <ScrollArea className="flex-1 overflow-y-auto">
        {activeTabContent ? (
          <div>
            {/* Optional: You can keep the title header here, or move it inside FileViewer */}
            {/* <div className="px-8 pt-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {activeTabContent.title}
                </h1>
                <p className="text-muted-foreground text-sm mb-4">
                  {activeTabContent.id}
                </p>
            </div> */}
            
            {/* Mount the viewer and pass it the file path */}
            <FileViewer filepath={activeTabContent.id} />
          </div>
        ) : null}
      </ScrollArea>
      
    </div>
  );
}

export default MainView;