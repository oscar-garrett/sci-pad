import { FileNode } from '@/features/explorers/file-explorer';
import { create } from 'zustand';

interface ExplorerState {
  treeCache: FileNode[];
  setTreeCache: (tree: FileNode[]) => void;
  // Later, can add things like:
  expandedFolders: Record<string, boolean>;
  toggleFolder: (path: string, isOpen: boolean) => void;
  // refreshTree: () => Promise<void>;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  treeCache: [],
  setTreeCache: (tree) => set({ treeCache: tree }),

  expandedFolders: {},
  toggleFolder: (path, isOpen) =>
    set((state) => ({
        expandedFolders: {
            ...state.expandedFolders,
            [path]: isOpen
        }
    }))
}));