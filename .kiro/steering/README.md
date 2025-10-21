# Steering 规则说明

Steering 文件用于为 Kiro 提供项目特定的上下文和规则。

## 使用方式

### 1. 始终包含（默认）
创建 `.md` 文件，Kiro 会在所有交互中自动包含这些规则。

### 2. 条件包含
在文件开头添加 front-matter：

```markdown
---
inclusion: fileMatch
fileMatchPattern: '*.tsx'
---

# React 组件规范
...
```

### 3. 手动包含
在文件开头添加：

```markdown
---
inclusion: manual
---

# 特殊规则
...
```

然后在聊天中使用 `#` 引用该文件。

## 文件引用

可以在 steering 文件中引用其他文件：

```markdown
参考 API 规范：#[[file:../docs/api-spec.yaml]]
```

## 示例文件

- `project-standards.md` - 项目编码标准（始终包含）
- `react-rules.md` - React 特定规则（条件包含）
- `deployment-guide.md` - 部署指南（手动包含）
