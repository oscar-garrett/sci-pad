import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/workspace";
import { Link, NotebookPen, TableOfContents } from "lucide-react";

function RightActivityBar() {
    const {activeRightView, toggleRightView } = useWorkspaceStore()

    const getButtonState = (viewName: string) => {
        return activeRightView === viewName
        ? "bg-accent text-accent-foreground dark:bg-accent/50" // Active state
      : "";         // Inactive state
    };

    return (
        <div className="py-4 border w-12 h-full justify-between items-center flex flex-col">
            <div className="flex flex-col items-center w-12 h-full gap-4">
                <Button
                 variant="ghost"
                 size="activity"
                 title="Notes"
                 onClick={() => toggleRightView("notes")}
                 className={getButtonState("notes")}
                 >
                    <NotebookPen/>
                </Button>
                <Button
                 variant="ghost"
                 size="activity"
                 onClick={() => toggleRightView("outline")}
                 className={getButtonState("outline")}
                 >
                    <TableOfContents/>
                </Button>
                <Button
                 variant="ghost"
                 size="activity"
                 onClick={() => toggleRightView("links")}
                 className={getButtonState("links")}
                 >
                    <Link/>
                </Button>
            </div>
        </div>
    );
}

export default RightActivityBar;