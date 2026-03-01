import { Button } from "@/components/ui/button";
import { Tab, useWorkspaceStore } from "@/store/workspace";
import { X } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";

export function SortableTab({ tab, isActive, index }: { tab: Tab; isActive: boolean; index: number }) {
  const { setActiveTab, closeTab } = useWorkspaceStore();
  
  const { ref } = useSortable({ 
    id: tab.id, 
    index 
  });

  return (
    <div
      ref={ref}
      onPointerDown={() => setActiveTab(tab.id)}
      className={`group flex items-center gap-2 px-3 py-2 min-w-30 max-w-50 border-r border-border select-none cursor-pointer ${
        isActive
          ? "bg-accent text-accent-foreground border-t-2 border-t-border" // Assuming you meant border-t-border instead of duplicate border-border
          : "bg-transparent text-muted-foreground hover:bg-muted"
      }`}
    >
      <span className="truncate text-sm flex-1">{tab.title}</span>

      <Button
        size="icon-xs"
        variant="ghost"
        onPointerDown={(e) => {
          e.stopPropagation();
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