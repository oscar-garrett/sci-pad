import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useExplorerStore } from "@/store/explorer";
import { useWorkspaceStore } from "@/store/workspace";

export interface FileNode {
    name: string,
    path: string, 
    is_dir: boolean,
    parent_path: string| null;
    children?: FileNode[];
}

function buildTree(flatList: FileNode[]): FileNode[] {
    const nodeMap = new Map<string, FileNode>();
    const rootNodes: FileNode[] = [];

    // Add all items to nodeMap with children initialized to none
    flatList.forEach((item) => {
        nodeMap.set(item.path, { ...item, children: [] });
    });

    flatList.forEach((item) => {
        const node = nodeMap.get(item.path);
        if (!node) return;

        // If that node has a parent and that parent exists in our map, attach it
        if (item.parent_path && nodeMap.has(item.parent_path)) {
            const parent = nodeMap.get(item.parent_path);
            parent?.children?.push(node);
        } else {
            // If no parent, it's a root node
            rootNodes.push(node);
        }
    })

    return rootNodes;
}

const FileTreeNode: React.FC<{ fileNode: FileNode}> = ({ fileNode }) => {
    // Retrieve hooks for expanding folders
    const { expandedFolders, toggleFolder } = useExplorerStore();

    // Retrieve hook for adding tabs
    const { addTab } = useWorkspaceStore();

    // Check if this folder is marked as open
    const isOpen = expandedFolders[fileNode.path] || false;

    if (fileNode.is_dir) {
        return (
        <Collapsible open={isOpen} onOpenChange={(open) => toggleFolder(fileNode.path, open)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="group hover:bg-accent hover:text-accent-foreground w-full justify-start transition-none"
            >
              <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
              <FolderIcon />
              {fileNode.name}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="style-lyra:ml-4 mt-1 ml-5">
            {isOpen && (
                <div className="flex flex-col gap-1">
                    {fileNode.children?.map((child) => (
                        <FileTreeNode key={child.path} fileNode={child}/>
                    ))}
                </div>
            )}
          </CollapsibleContent>
        </Collapsible>
        )
    }
    return (
        <Button
        key={fileNode.name}
        variant="ghost"
        size="sm"
        className="text-foreground w-full justify-start gap-2"
        onClick={() => {
            addTab({
                id: fileNode.path,
                title: fileNode.name,
                type: 'file'
            })
        }}
      >
        <FileIcon />
        <span>{fileNode.name}</span>
      </Button>
    )
}

const FileTree: React.FC<{ targetPath: string }> = ({ targetPath }) => {
    const { treeCache, setTreeCache } = useExplorerStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadFiles() {
            if (treeCache.length > 0) return;

            setLoading(true);
            try {
                // Fetch the file flat array from the Rust backend
                const fileArray: FileNode[] = await invoke("get_file_tree", { targetPath });

                // Convert to nested tree
                const nestedTree = buildTree(fileArray);

                setTreeCache(nestedTree);
            } catch (error) {
                console.error("failed to load file tree:", error);
            } finally {
                setLoading(false);
            }
        }

        if (targetPath) {
            loadFiles();
        }
    }, [targetPath, treeCache.length]);

    if (loading && treeCache.length === 0) return <div>Loading files...</div>

    return (
        <div className="flex flex-col gap-1">
            {treeCache.map((item) => (
                <FileTreeNode key={item.path} fileNode={item} />
            ))}
        </div>
    )
}

export default FileTree;