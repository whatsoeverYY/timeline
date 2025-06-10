# 照片时间线组件 (Photo Timeline Component)

## 概述

这是一个现代化的Vue.js照片时间线组件，用于展示按时间线组织的照片集合。该组件采用响应式设计，使用Tailwind CSS进行样式设计，并集成了Remix Icon图标库。

## 功能特性

### 🎨 设计特性

- 现代化的渐变背景设计
- 响应式布局，支持移动端和桌面端
- 使用自定义颜色系统（s-blue、s-purple、s-gray、s-rose系列）
- 流畅的动画和过渡效果
- 玻璃拟态卡片设计

### 📱 组件功能

- **左侧时间线**: 按月份显示照片数量，支持点击切换
- **右侧照片展示**: 网格式展示选中月份的照片
- **照片模态框**: 全屏查看照片详情，支持下载和分享
- **自动幻灯片**: 一键开始幻灯片浏览

### 🔧 技术特性

- TypeScript支持，类型安全
- 组件化设计，高度可复用
- 数据驱动，从data.ts自动读取
- 图片加载错误处理
- 键盘快捷键支持（ESC关闭模态框）

## 组件结构

```
src/components/
├── PhotoTimeline.vue     # 主时间线组件
├── TimelineItem.vue      # 时间线项目组件
├── PhotoGrid.vue         # 照片网格组件
└── PhotoModal.vue        # 照片模态框组件
```

## 数据格式

组件从 `src/data.ts` 读取数据，数据格式如下：

```typescript
interface ImageDetail {
  imagePath: string // 图片路径
  desc: string // 图片描述
  date: string // 图片日期(YYYYMMDD格式)
}

interface MonthData {
  month: string // 月份(YYYY-MM格式)
  count: number // 照片数量
  details: ImageDetail[]
}
```

## 自定义颜色系统

已在tailwind.config.js中配置了自定义颜色：

```javascript
's-blue': {
  10: '#f0f8ff',    // 最浅
  20: '#e6f3ff',
  // ...
  100: '#001a33'    // 最深
},
's-purple': { /* 紫色系列 */ },
's-gray': { /* 灰色系列 */ },
's-rose': { /* 玫瑰色系列 */ }
```

## 使用方法

1. 确保已安装依赖：

```bash
npm install remixicon
```

2. 在main.ts中导入CSS：

```typescript
import 'remixicon/fonts/remixicon.css'
```

3. 在App.vue中使用组件：

```vue
<template>
  <PhotoTimeline />
</template>

<script setup lang="ts">
  import PhotoTimeline from './components/PhotoTimeline.vue'
</script>
```

## 交互功能

- **时间线选择**: 点击左侧任意月份查看该月照片
- **照片预览**: 点击照片可全屏查看详情
- **下载分享**: 模态框中可下载照片或复制链接
- **键盘导航**: 按ESC键关闭模态框
- **幻灯片模式**: 点击"Start Slideshow"按钮开始浏览

## 响应式设计

- 大屏幕: 左侧时间线 + 右侧照片展示的双栏布局
- 小屏幕: 单栏垂直布局，优化移动端体验
- 照片网格: 自适应列数（1-3列）

## 自定义扩展

组件采用模块化设计，可以轻松自定义：

- 修改 `tailwind.config.js` 中的颜色系统
- 替换 `PhotoGrid.vue` 中的网格布局
- 扩展 `PhotoModal.vue` 添加更多功能
- 自定义 `TimelineItem.vue` 的显示格式

## 性能优化

- 图片懒加载支持
- 错误图片的优雅降级处理
- 最小化重渲染的计算属性使用
- 组件按需加载

---

🎉 **现在您可以启动开发服务器 (`npm run dev`) 来查看照片时间线组件的效果！**
