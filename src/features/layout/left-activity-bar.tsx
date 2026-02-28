import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/workspace";
import { Database, Folder, GitGraph, NotebookTabs, Settings } from "lucide-react";

function LeftActivityBar() {
    const { activeLeftView, toggleLeftView } = useWorkspaceStore()

    const getButtonState = (viewName: string) => {
    return activeLeftView === viewName 
      ? "bg-accent text-accent-foreground dark:bg-accent/50" // Active state
      : "";         // Inactive state
  };

    return (
        <div className="p-4 border w-12 h-full justify-between items-center flex flex-col">
            <div className="flex flex-col items-center w-12 h-full gap-4">
                <Button
                 variant="ghost"
                 size="activity"
                 title="File explorer"
                 onClick={() => toggleLeftView('explorer')}
                 className={getButtonState('explorer')}
                 >
                    <Folder/>
                </Button>
                <Button
                 variant="ghost"
                 size="activity"
                 title="Databases"
                 onClick={() => toggleLeftView('databases')}
                 className={getButtonState('databases')}
                 >
                    <Database/>
                </Button>
                <Button
                 variant="ghost"
                 size="activity"
                 title="Protocols"
                 onClick={() => toggleLeftView('protocols')}
                 className={getButtonState('protocols')}
                 >
                    <NotebookTabs />
                </Button>
                <Button
                 variant="ghost"
                 size="activity"
                 title="Graph view"
                 onClick={() => toggleLeftView('graph')}
                 className={getButtonState('graph')}
                 >
                    <GitGraph />
                </Button>
            </div>
            <div className="flex flex-col items-center w-12 h-full gap-4 justify-end">
                <Button
                 variant="ghost"
                 size="activity"
                 title="Settings"
                 >
                    <Settings/>
                </Button>
            </div>
        </div>
    );
}

export default LeftActivityBar;