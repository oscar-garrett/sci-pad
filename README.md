# Sci-Pad
## Project structure
```
src/
├── assets/             # Global CSS, static images, fonts
├── components/         # DUMB, shared UI components only
│   └── ui/             # ALL your shadcn/ui components go here (button, resizable, tabs)
├── features/           # The meat of your app, grouped by domain
│   ├── databases/      # CSV parsing, TanStack Table views, plasmid/seed logic
│   ├── editor/         # TipTap Markdown editor, custom block modules
│   ├── graph/          # react-force-graph implementation
│   ├── layout/         # Your ResizablePanel skeleton, Sidebars, Activity Bar
│   └── protocols/      # Protocol injection logic (\command parser)
├── hooks/              # Global custom hooks (e.g., useFileSystem, useDebounce)
├── lib/                # Utility functions and Tauri command wrappers
│   ├── tauri.ts        # Wrappers for your Rust backend calls (read_file, write_file)
│   └── utils.ts        # The clsx/tailwind merge utility shadcn generates
├── store/              # Zustand state management
│   └── workspace.ts    # Tracks open tabs, active tab, and layout state
├── App.tsx             # Global Providers only
└── main.tsx            # React Root
```

