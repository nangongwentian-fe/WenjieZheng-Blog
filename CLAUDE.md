# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 VitePress 构建的现代化文档站点，用于个人博客和文档展示。

## 常用命令

### 开发
- `pnpm install` - 安装依赖
- `pnpm run docs:dev` - 启动开发服务器 (localhost:5174)
- `pnpm run docs:build` - 构建静态网站
- `pnpm run docs:preview` - 预览构建结果

### 注意事项
- 使用 pnpm 作为包管理器
- 开发服务器默认运行在端口 5174
- 构建输出目录：`docs/.vitepress/dist`

## 项目架构

### 核心结构
- **docs/** - 所有文档内容目录
  - **.vitepress/** - VitePress 配置目录
    - **config.ts** - 主配置文件 (导航、侧边栏、主题设置)
    - **cache/** - 开发缓存
    - **dist/** - 构建输出目录
  - **guide/** - 指南类文档目录
  - **index.md** - 首页内容

### 配置文件要点
- VitePress 配置：`docs/.vitepress/config.ts`
- 包管理：`package.json` (使用 pnpm 10.12.4)
- 依赖：VitePress 2.0.0-alpha.12 + Vue 3.5.22

### 内容管理
- 所有 Markdown 文件放在 `docs/` 目录下
- VitePress 会自动将 `.md` 文件转换为 HTML 页面
- 支持 Vue 组件直接在 Markdown 中使用
- 默认暗色主题 (`appearance: 'dark'`)

### 导航结构
- 首页链接：`/`
- 指南页面：`/guide/getting-started`
- 可通过修改 `config.ts` 添加更多导航项

## 内容开发

### 添加新页面
1. 在 `docs/` 目录下创建 `.md` 文件
2. 在 `config.ts` 中更新导航和侧边栏配置

### Vue 组件使用
可以在 Markdown 文件中直接使用 Vue 3 组合式 API

### 主题定制
- 主要配置在 `config.ts` 的 `themeConfig` 中
- 支持修改导航、侧边栏、社交链接等