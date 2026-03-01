import { FileNode } from '@/features/explorers/file-explorer';
import { create } from 'zustand';

interface ExplorerState {
  treeCache: FileNode[];
  setTreeCache: (tree: FileNode[]) => void;
  // Later, can add things like:
  // expandedFolders: string[];
  // toggleFolder: (path: string) => void;
  // refreshTree: () => Promise<void>;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  treeCache: [],
  setTreeCache: (tree) => set({ treeCache: tree }),
}));