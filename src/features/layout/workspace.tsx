import "@/App.css";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import LeftSidebar from "@/features/layout/left-sidebar";
import MainView from "@/features/layout/main-view";
import RightSidebar from "@/features/layout/right-sidebar";
import LeftActivityBar from "@/features/layout/left-activity-bar";
import RightActivityBar from "./right-activity-bar";
import { useEffect, useRef } from "react";
import { PanelImperativeHandle } from "react-resizable-panels";
import { useWorkspaceStore } from "@/store/workspace";

function Workspace() {
  // Define panel references
  const leftPanelRef = useRef<PanelImperativeHandle>(null)
  const rightPanelRef = useRef<PanelImperativeHandle>(null)

  // Get hooks from the store
  const { activeLeftView, activeRightView } = useWorkspaceStore();

  // Sync panels from the store and handle collapse logic
  useEffect(() => {
    const panel = leftPanelRef.current;
    if (!panel) return;
    if (activeLeftView === null) {
      if (!panel.isCollapsed()) panel.collapse();
    } else {
      if (panel.isCollapsed()) panel.expand();
    }
  }, [activeLeftView]);

  useEffect(() => {
    const panel = rightPanelRef.current;
    if (!panel) return;
    if (activeRightView === null) {
      if (!panel.isCollapsed()) panel.collapse();
    } else {
      if (panel.isCollapsed()) panel.expand();
    }
  }, [activeRightView]);

  const handleLayoutChange = (layout: { [id: string]: number }) => {
    // layout looks like: { "left-panel": 20, "main-panel": 60, "right-panel": 20 }
    const leftSize = layout["left-panel"];
    const rightSize = layout["right-panel"];
    
    const state = useWorkspaceStore.getState();

    // --- Sync Left Panel ---
    // Ensure the panel is actually in the DOM / layout object before checking
    if (leftSize !== undefined) {
      if (leftSize === 0 && state.activeLeftView !== null) {
        state.setLeftView(null);
      } else if (leftSize > 0 && state.activeLeftView === null) {
        state.setLeftView('explorer'); 
      }
    }

    // --- Sync Right Panel ---
    if (rightSize !== undefined) {
      if (rightSize === 0 && state.activeRightView !== null) {
        state.setRightView(null);
      } else if (rightSize > 0 && state.activeRightView === null) {
        state.setRightView('notes'); 
      }
    }
  };

  return (
    <div className="h-screen w-full flex">
      <LeftActivityBar/>
      <ResizablePanelGroup
        orientation="horizontal"
        onLayoutChanged={handleLayoutChange}
        >
        <ResizablePanel 
          id="left-panel"
          defaultSize="33%"
          panelRef={leftPanelRef}
          collapsible
          minSize={120}
          >
          <LeftSidebar/>
        </ResizablePanel>
        
        <ResizableHandle withHandle/>
        
        <ResizablePanel
          id="main-panel"
          >
          <MainView/>
        </ResizablePanel>
        
        <ResizableHandle withHandle/>
        
        <ResizablePanel
          id="right-panel"
          defaultSize="0%"
          panelRef={rightPanelRef}
          collapsible
          minSize={120}
          >
          <RightSidebar/>
        </ResizablePanel>
      </ResizablePanelGroup>
      <RightActivityBar/>
    </div>
  );
}

export default Workspace;
