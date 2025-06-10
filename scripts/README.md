# 图片整理脚本

这个脚本可以自动整理 `src/assets/source` 目录下的图片文件，根据文件名中的日期将图片分类到对应的目录结构中，并生成相应的数据文件。

## 功能特点

- 🗂️ 根据图片文件名中的日期自动分类整理
- 📁 按年/月的目录结构组织图片（例：`public/image/2020/12/`）
- 📝 自动生成TypeScript数据文件（`src/data.ts`）
- 🔄 支持增量更新，只复制新增或修改的文件
- 👁️ 支持文件监听模式，自动检测变化

## 使用方法

### 一次性整理

```bash
npm run organize-images
```

### 监听模式（持续运行，自动检测文件变化）

```bash
npm run organize-images:watch
```

## 文件名格式要求

脚本会自动识别包含8位日期格式（YYYYMMDD）的图片文件，例如：

- `IMG_20201215_185050.jpg` → `public/image/2020/12/`
- `IMG_20240822_出生啦.jpeg` → `public/image/2024/08/`

支持的图片格式：`.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp`

## 生成的目录结构

```
public/image/
├── 2020/
│   └── 12/
│       ├── IMG_20201215_185050.jpg
│       └── IMG_20201216_201237.jpg
├── 2021/
│   ├── 03/
│   ├── 04/
│   ├── 05/
│   └── 10/
└── ...
```

## 生成的数据文件

脚本会生成 `src/data.ts` 文件，包含以下内容：

```typescript
export interface ImageDetail {
  imagePath: string // 图片路径
  desc: string // 从文件名提取的描述
  date: string // 日期字符串
}

export interface MonthData {
  month: string // 月份 (YYYY-MM)
  count: number // 该月图片数量
  details: ImageDetail[] // 图片详情列表
}

export const imageData: MonthData[] = [
  {
    month: '2020-12',
    count: 2,
    details: [
      {
        imagePath: '/image/2020/12/IMG_20201215_185050.jpg',
        desc: '185050',
        date: '20201215',
      },
      // ...
    ],
  },
  // ...
]
```

## 在Vue项目中使用

```typescript
import { imageData } from '@/data'

// 获取所有月份数据
console.log(imageData)

// 获取特定月份的图片
const dec2020 = imageData.find(item => item.month === '2020-12')
console.log(dec2020?.details)

// 在组件中使用
export default {
  setup() {
    return {
      imageData,
    }
  },
}
```

## 注意事项

- 原始文件会保留在 `src/assets/source` 目录中，不会被删除
- 如果目标文件已存在且源文件没有更新，则不会重复复制
- 脚本会自动创建必要的目录结构
- 生成的data.ts文件会包含文件更新时间戳

## 故障排除

如果遇到问题，请检查：

1. 确保 `src/assets/source` 目录存在且包含图片文件
2. 确保图片文件名包含8位日期格式（YYYYMMDD）
3. 确保有足够的磁盘空间来复制图片文件
4. 检查文件权限是否允许读写操作
