import { Button } from "@/components/ui/button";
import { Tab, useWorkspaceStore } from "@/store/workspace";
import { X } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable"
import { DragDropProvider } from "@dnd-kit/react";

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
      <div className="flex-1 overflow-y-auto">
        {activeTabContent && (
          <div className="p-8 max-w-4xl mx-auto">
            {/* Placeholder for now! */}
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {activeTabContent.title}
            </h1>
            <p className="text-muted-foreground">
              Type: {activeTabContent.type} <br/>
              File Path: {activeTabContent.id}
            </p>
            
            <div className="mt-8 p-4 border border-border rounded-md bg-muted/50 text-muted-foreground">
              [ TipTap Editor goes here ]
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default MainView;