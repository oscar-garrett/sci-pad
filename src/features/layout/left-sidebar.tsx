import { Input } from "@/components/ui/input";
import { SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import FileTree from "@/features/explorers/file-explorer";
import { useWorkspaceStore } from "@/store/workspace";
import ProtocolExplorer from "../explorers/protocol-explorer";
import DatabaseExplorer from "../explorers/database-explorer";
import GraphExplorer from "../explorers/graph-explorer";


function LeftSidebar() {
    const { activeLeftView } = useWorkspaceStore()

    let sidebarContent;

    switch (activeLeftView) {
        case "explorer": 
            sidebarContent = <FileTree targetPath="C:\Users\oscar\software_projects"/>; 
            break;
        case "protocols": 
            sidebarContent = <ProtocolExplorer/>; 
            break;
        case "databases": 
            sidebarContent = <DatabaseExplorer/>; 
            break;
        case "graph": 
            sidebarContent = <GraphExplorer/>; 
            break;
        case null: 
        default:
            sidebarContent = <FileTree targetPath="C:\Users\oscar\software_projects"/>; 
            break;
    }

    return (
        <div className="flex flex-col">
            <SidebarHeader>
                <Input
                  placeholder="Search..."
                  />
            </SidebarHeader>
            <SidebarContent className="h-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {sidebarContent}
            </SidebarContent>
        </div>
    )
}

export default LeftSidebar;