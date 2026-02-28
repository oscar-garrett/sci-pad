import "@/App.css";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import LeftSidebar from "@/features/layout/left-sidebar";
import MainView from "@/features/layout/main-view";
import RightSidebar from "@/features/layout/right-sidebar";
import LeftActivityBar from "@/features/layout/left-activity-bar";
import RightActivityBar from "./right-activity-bar";

function Workspace() {
  return (
    <div className="h-screen w-full flex">
      <LeftActivityBar/>
      <ResizablePanelGroup
        orientation="horizontal">

        <ResizablePanel>
          <LeftSidebar/>
        </ResizablePanel>
        
        <ResizableHandle withHandle/>
        
        <ResizablePanel>
          <MainView/>
        </ResizablePanel>
        
        <ResizableHandle withHandle/>
        
        <ResizablePanel>
          <RightSidebar/>
        </ResizablePanel>
      </ResizablePanelGroup>
      <RightActivityBar/>
    </div>
  );
}

export default Workspace;
