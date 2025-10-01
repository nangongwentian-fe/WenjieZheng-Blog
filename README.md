# My VitePress Site

基于 [VitePress](https://vitepress.dev/) 构建的现代化文档站点。

## ✨ 特性

- 🚀 基于 Vite 的极速开发体验
- 📝 Markdown 优先的内容创作
- 🎨 丰富的主题定制选项
- 🔍 内置全文搜索功能
- 📱 响应式设计
- 🌙 深色/浅色主题切换
- 🌐 多语言支持

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm (推荐)

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动开发服务器，支持热重载：

```bash
pnpm run docs:dev
```

访问 http://localhost:5174 查看您的站点。

### 构建静态网站

```bash
pnpm run docs:build
```

构建后的文件将输出到 `docs/.vitepress/dist` 目录。

### 预览构建结果

```bash
pnpm run docs:preview
```

## 📁 项目结构

```
.
├─ docs/
│  ├─ .vitepress/
│  │  ├─ config.ts          # VitePress 配置文件
│  │  ├─ cache/             # 开发缓存
│  │  └─ dist/              # 构建输出
│  ├─ guide/                # 指南文档目录
│  │  └─ getting-started.md
│  └─ index.md              # 首页
├─ .gitignore               # Git 忽略文件
├─ package.json             # 项目配置
└─ README.md                # 项目说明文件
```

## 📝 内容创作

### 添加新页面

在 `docs` 目录下创建 `.md` 文件，VitePress 会自动将其转换为 HTML 页面。

### 自定义配置

编辑 `docs/.vitepress/config.ts` 文件来自定义站点配置：

- 站点标题和描述
- 导航菜单
- 侧边栏结构
- 主题样式
- 更多配置选项...

### 使用 Vue 组件

您可以在 Markdown 文件中直接使用 Vue 组件：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">点击次数: {{ count }}</button>
</template>
```

## 🎨 主题定制

VitePress 提供了丰富的主题配置选项：

- 自定义颜色
- 修改字体
- 添加 Logo
- 配置导航栏
- 自定义侧边栏
- 添加社交链接

详细信息请参考 [VitePress 主题配置文档](https://vitepress.dev/guide/theme-introduction)。

## 🚀 部署

### GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 设置构建命令：`pnpm run docs:build`
4. 设置输出目录：`docs/.vitepress/dist`

### 其他部署平台

VitePress 可以部署到任何静态网站托管平台：

- Netlify
- Vercel
- Cloudflare Pages
- 等...

详细部署指南请参考 [VitePress 部署文档](https://vitepress.dev/guide/deploy)。

## 📚 相关链接

- [VitePress 官方文档](https://vitepress.dev/)
- [Vue.js 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)

## 📄 许可证

MIT License

---

使用 ❤️ 和 [VitePress](https://vitepress.dev/) 构建