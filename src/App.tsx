import "./App.css";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";
import LeftSidebar from "./layout/left-sidebar";
import MainView from "./layout/main-view";
import RightSidebar from "./layout/right-sidebar";

function App() {
  return (
    <div className="h-screen w-full">
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
    </div>
  );
}

export default App;
