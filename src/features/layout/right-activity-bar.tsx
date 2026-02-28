import { Button } from "@/components/ui/button";
import { Link, NotebookPen, TableOfContents } from "lucide-react";

function RightActivityBar() {
    return (
        <div className="py-4 border w-12 h-full justify-between items-center flex flex-col">
            <div className="flex flex-col items-center w-12 h-full gap-4">
                <Button
                 variant="ghost"
                 size="activity"
                 >
                    <NotebookPen/>
                </Button>
                <Button
                 variant="ghost"
                 size="activity"
                 >
                    <TableOfContents/>
                </Button>
                <Button
                 variant="ghost"
                 size="activity"
                 >
                    <Link/>
                </Button>
            </div>
        </div>
    );
}

export default RightActivityBar;