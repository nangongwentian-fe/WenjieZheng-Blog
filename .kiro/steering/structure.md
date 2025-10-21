# Project Structure

## Root Directory

```
.
├── docs/                   # VitePress content root
├── .bmad-core/            # BMad Method framework (AI development workflow)
├── .claude/               # Claude AI commands and settings
├── .kiro/                 # Kiro IDE configuration and steering
├── .spec-workflow/        # Spec-based development workflow
├── node_modules/          # Dependencies (gitignored)
├── package.json           # Project manifest
├── pnpm-lock.yaml         # Dependency lock file
└── README.md              # Project documentation
```

## Content Organization

### Blog Structure

```
docs/blog/
├── ai-programming/
│   ├── ai-products/       # AI IDE reviews (Cursor, Kiro, Claude Code, etc.)
│   └── ai-tools-frameworks/ # Development frameworks (BMad, Spec-Kit, etc.)
├── frontend-3d/           # 3D web technologies
│   ├── threejs/
│   ├── babylonjs/
│   ├── webgl/
│   ├── webgpu/
│   ├── mapboxgl/
│   ├── cesiumjs/
│   └── orillusion/
└── frontend/              # Frontend frameworks
    ├── vue/
    └── react/
```

Each topic directory contains an `index.md` file as the main entry point.

## VitePress Configuration

```
docs/.vitepress/
├── config.ts              # Site configuration (nav, sidebar, theme)
├── theme/
│   ├── index.ts          # Theme entry (extends default theme)
│   └── custom.css        # Custom styling
└── cache/                # Build artifacts (gitignored)
```

## AI Development Tools

The project includes multiple AI-assisted development frameworks:

- **.bmad-core/**: BMad Method for agile AI-driven planning and development
- **.claude/commands/**: Custom Claude AI agent commands
- **.spec-workflow/**: Spec-based development workflow templates
- **.kiro/**: Kiro IDE steering rules and configuration

## File Naming Conventions

- Markdown files: lowercase with hyphens (e.g., `getting-started.md`)
- Directories: lowercase with hyphens
- Config files: camelCase TypeScript (e.g., `config.ts`)
- Index files: Always `index.md` for directory entry points

## Build Output

- Development: Served from memory at http://localhost:5174
- Production: Static files generated to `docs/.vitepress/dist/`
