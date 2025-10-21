# Technology Stack

## Core Technologies

- **VitePress**: 2.0.0-alpha.12 (static site generator)
- **Vue**: ^3.5.22 (UI framework)
- **Vite**: Build tool (bundled with VitePress)
- **Node.js**: ≥18 required
- **Package Manager**: pnpm 10.12.4

## Project Structure

```
docs/                    # Content root
├── .vitepress/         # VitePress configuration
│   ├── config.ts       # Site configuration
│   ├── theme/          # Theme customization
│   │   ├── index.ts    # Theme entry (extends default)
│   │   └── custom.css  # Custom styles
│   └── cache/          # Build cache (gitignored)
├── blog/               # Blog content
│   ├── ai-programming/ # AI tools & frameworks
│   ├── frontend-3d/    # 3D web development
│   └── frontend/       # Frontend frameworks
└── index.md            # Homepage
```

## Common Commands

```bash
# Development
pnpm run docs:dev       # Start dev server at http://localhost:5174

# Build
pnpm run docs:build     # Build static site to docs/.vitepress/dist

# Preview
pnpm run docs:preview   # Preview production build locally

# Package Management
pnpm install            # Install dependencies
```

## Configuration

- **Site config**: `docs/.vitepress/config.ts` (TypeScript)
- **Theme**: Extends VitePress default theme with custom CSS
- **Default appearance**: Dark mode
- **Navigation**: Defined in config.ts themeConfig.nav
- **Sidebar**: Hierarchical structure in config.ts themeConfig.sidebar

## Content Guidelines

- All content in Markdown (.md files)
- Frontmatter for page metadata
- Chinese primary language with English support
- Blog posts organized by topic in subdirectories
