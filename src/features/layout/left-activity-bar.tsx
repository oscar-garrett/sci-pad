import { Button } from "@/components/ui/button";
import { Database, Folder, GitGraph, NotebookTabs, Settings } from "lucide-react";

function LeftActivityBar() {
    return (
        <div className="p-4 border w-12 h-full justify-between items-center flex flex-col">
            <div className="flex flex-col items-center w-12 h-full gap-4">
                <Button
                 variant="ghost"
                 size="activity"
                 title="File explorer"
                 >
                    <Folder/>
                </Button>
                <Button
                 variant="ghost"
                 size="activity"
                 title="Databases"
                 >
                    <Database/>
                </Button>
                <Button
                 variant="ghost"
                 size="activity"
                 title="Protocols"
                 >
                    <NotebookTabs />
                </Button>
                <Button
                 variant="ghost"
                 size="activity"
                 title="Graph view"
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