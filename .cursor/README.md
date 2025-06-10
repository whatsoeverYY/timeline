# Cursor Rules 配置说明

这个目录包含了项目的 Cursor AI 规则配置，用于指导 AI 在代码开发过程中遵循项目的最佳实践和规范。

## 规则文件列表

### 总是应用的规则 (Always Apply)
- `vue-project-overview.mdc` - Vue.js 项目基本概述和技术栈
- `code-organization.mdc` - 代码组织结构和命名规范
- `commit-standards.mdc` - 代码提交规范和版本控制最佳实践

### 自动附加的规则 (Auto Attached)
- `vue-components.mdc` - Vue 组件开发规范（适用于 `.vue` 文件）
- `typescript-rules.mdc` - TypeScript 开发规范（适用于 `.ts` 和 `.vue` 文件）

### AI 智能选择的规则 (Agent Requested)
- `performance-optimization.mdc` - Vue.js 性能优化策略和最佳实践
- `testing-error-handling.mdc` - 单元测试和错误处理最佳实践

## 规则类型说明

1. **Always Apply**: 这些规则会始终包含在 AI 的上下文中
2. **Auto Attached**: 当处理匹配的文件类型时，相关规则会自动加载
3. **Agent Requested**: AI 会根据需要自动决定是否应用这些规则

## 使用方法

规则会自动应用，也可以通过以下方式手动引用：
- 使用 `@ruleName` 来手动引用特定规则
- 在 Cursor 聊天中提及相关功能时，对应规则会自动生效

## 迁移说明

这些规则文件替代了原有的 `.cursorrules` 文件，提供了更灵活和精细的配置管理。 