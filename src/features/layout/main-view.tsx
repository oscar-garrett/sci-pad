import { useWorkspaceStore } from "@/store/workspace";
import { DragDropProvider } from "@dnd-kit/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SortableTab } from "./sortable-tab";
import { FileViewer } from "@/features/editor/file-viewer"; // Update import path!

export default function MainView() {
  const { openTabs, activeTabId, reorderTabs } = useWorkspaceStore();

  if (openTabs.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background text-muted-foreground">
        <p>Open a file or experiment to begin</p>
      </div>
    );
  }

  const activeTabContent = openTabs.find(t => t.id === activeTabId);

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      
      {/* --- THE TAB BAR --- */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-border bg-background shrink-0">
        <DragDropProvider
          onDragEnd={(event) => {
            const { source, target } = event.operation;
            if (source && target && source.id !== target.id) {
              reorderTabs(source.id as string, target.id as string);
            }
          }}
        >
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
      {/* We use flex-1 and h-full on ScrollArea so it takes exactly the remaining height */}
      <ScrollArea className="flex-1 h-full w-full">
        {activeTabContent ? (
          <FileViewer filepath={activeTabContent.id} />
        ) : null}
      </ScrollArea>
      
    </div>
  );
}