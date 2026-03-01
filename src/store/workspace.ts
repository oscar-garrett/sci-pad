import { create } from 'zustand';

export type LeftView = 'explorer' | 'protocols' | 'databases' | 'graph' | null;
export type RightView = 'notes' | 'outline' | 'links' | null;

export interface Tab {
  id: string;          // e.g., 'exp-123', 'db-primers'
  title: string;       // e.g., 'Experiment 1', 'Primer Database'
  type: 'experiment' | 'database' | 'protocol' | 'file'; 
}

interface WorkspaceState {
  // Left
  activeLeftView: LeftView;
  toggleLeftView: (view: LeftView) => void;
  setLeftView: (view: LeftView) => void;

  // Right
  activeRightView: RightView;
  toggleRightView: (view: RightView) => void;
  setRightView: (view: RightView) => void;

  // Main
  openTabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Tab) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  reorderTabs: (activeId: string, overId: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  // Left
  activeLeftView: 'explorer',
  toggleLeftView: (view) => 
    set((state) => ({ activeLeftView: state.activeLeftView === view ? null : view })),
  setLeftView: (view) => set({ activeLeftView: view }),

  // Right
  activeRightView: 'notes',
  toggleRightView: (view) => 
    set((state) => ({ activeRightView: state.activeRightView === view ? null : view })),
  setRightView: (view) => set({ activeRightView: view }),

  // Main
  openTabs: [],
  activeTabId: null,

  // Add a new tab, or switch to it if it's already open
  addTab: (newTab) => set((state) => {
    const isAlreadyOpen = state.openTabs.some(tab => tab.id === newTab.id);
    if (isAlreadyOpen) {
      return { activeTabId: newTab.id };
    }
    return { 
      openTabs: [...state.openTabs, newTab], 
      activeTabId: newTab.id 
    };
  }),

  // Close a tab and figure out which tab should become active next
  closeTab: (tabId) => set((state) => {
    const remainingTabs = state.openTabs.filter(tab => tab.id !== tabId);
    
    // If we closed the currently active tab, fall back to the last tab in the list (or null)
    let newActiveId = state.activeTabId;
    if (state.activeTabId === tabId) {
      newActiveId = remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1].id : null;
    }

    return {
      openTabs: remainingTabs,
      activeTabId: newActiveId
    };
  }),

  setActiveTab: (tabId) => set({ activeTabId: tabId }),
  
  reorderTabs: (activeId, overId) => set((state) => {
    const oldIndex = state.openTabs.findIndex(t => t.id === activeId);
    const newIndex = state.openTabs.findIndex(t => t.id === overId);
    
    if (oldIndex === -1 || newIndex === -1) return state;

    // Standard array swap
    const newTabs = [...state.openTabs];
    const [movedTab] = newTabs.splice(oldIndex, 1);
    newTabs.splice(newIndex, 0, movedTab);

    return { openTabs: newTabs };
  }),
}));