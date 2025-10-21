---
inclusion: always
---

# 项目标准和规范

这个文件定义了项目的编码标准和最佳实践。

## 代码风格

- 使用 TypeScript 进行类型安全
- 遵循 ESLint 配置
- 使用有意义的变量和函数命名

## 文档要求

- 所有公共 API 必须有 JSDoc 注释
- README 文件保持更新
- 复杂逻辑需要添加注释说明

## 测试标准

- 核心功能必须有单元测试
- 关键路径需要集成测试
- 测试覆盖率目标：80%

## Git 提交规范

- 使用语义化提交信息
- 格式：`type(scope): description`
- 类型：feat, fix, docs, style, refactor, test, chore
