import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/workspace";
import { X } from "lucide-react";

function MainView() {
  const { openTabs, activeTabId, setActiveTab, closeTab } = useWorkspaceStore();

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
      
      {/* Construct the tab bar */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-border bg-background">
        {openTabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group flex items-center gap-2 px-3 py-2 min-w-[120px] max-w-[200px] border-r border-border select-none ${
              activeTabId === tab.id
                ? "bg-accent text-accent-foreground border-t-2" // Active Tab
                : "bg-transparent text-muted-foreground hover:bg-muted"        // Inactive Tab
            }`}
          >
            {/* Tab Title */}
            <span className="truncate text-sm flex-1">{tab.title}</span>
            
            {/* Close Button */}
            <Button
              size="icon-xs"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click from also triggering setActiveTab
                closeTab(tab.id);
              }}
              className={`p-0.5 rounded-md hover:bg-accent-foreground transition-opacity cursor-pointer ${
                activeTabId === tab.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <X className="size-3" />
            </Button>
          </div>
        ))}
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