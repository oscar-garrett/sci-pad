import { SidebarContent } from "@/components/ui/sidebar"
import { useWorkspaceStore } from "@/store/workspace";
import NotesInspector from "../inspectors/notes-inspector";
import OutlineInspector from "../inspectors/outline-inspector";
import LinkInspector from "../inspectors/links-inspector";


function RightSidebar() {
    const { activeRightView } = useWorkspaceStore()

    let sidebarContent;

    switch (activeRightView) {
        case "notes": 
            sidebarContent = <NotesInspector/>;
            break;
        case "outline": 
            sidebarContent = <OutlineInspector/>; 
            break;
        case "links": 
            sidebarContent = <LinkInspector/>; 
            break;
        case null: 
        default:
            sidebarContent = <NotesInspector/>; 
            break;
    }

    return (
        <div className="flex flex-col">
            <SidebarContent className="h-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {sidebarContent}
            </SidebarContent>
        </div>
    )
}

export default RightSidebar;