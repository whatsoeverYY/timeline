# 图片数据生成器

这个工具会自动扫描 `src/assets/image` 目录下的图片，并生成 `src/data.ts` 文件。

## 使用方法

### 1. 运行生成脚本

```bash
# 使用 npm 脚本
npm run generate-data

# 或直接运行
node generate-data.mjs
```

### 2. 目录结构要求

图片应该按以下结构组织：

```
src/assets/image/
├── 2020/
│   └── 12/
│       ├── IMG_20201215_185050.jpg
│       └── IMG_20201216_201237.jpg
├── 2021/
│   ├── 03/
│   ├── 04/
│   └── 05/
└── 2024/
    └── 08/
        └── IMG_20240822_出生啦.jpeg
```

### 3. 文件命名规范

推荐使用以下命名格式：

- `IMG_YYYYMMDD_描述.扩展名`
- 例如：`IMG_20240822_出生啦.jpeg`

脚本会自动提取：

- 日期：从文件名中的 8 位数字 (YYYYMMDD)
- 描述：文件名中日期后的部分

### 4. 生成的数据格式

```typescript
interface ImageDetail {
  imagePath: string // 图片路径，如 "@/assets/image/2020/12/IMG_20201215_185050.jpg"
  desc: string // 描述，从文件名提取
  date: string // 日期，格式为 YYYYMMDD
}

interface MonthlyData {
  month: string // 月份，格式为 YYYY-MM
  count: number // 该月图片数量
  details: ImageDetail[] // 图片详情数组
}
```

### 5. 在代码中使用

```typescript
import { imageData } from '@/data'
// 或
import imageData from '@/data'

// 使用数据
imageData.forEach(monthData => {
  console.log(`${monthData.month}: ${monthData.count} 张图片`)
  monthData.details.forEach(image => {
    console.log(`- ${image.imagePath} (${image.date}): ${image.desc}`)
  })
})
```

### 6. 自动更新

当你添加新图片时，只需要：

1. 按照目录结构放置图片
2. 运行 `npm run generate-data`
3. 数据文件会自动更新

## 支持的图片格式

- .jpg
- .jpeg
- .png
- .gif
- .webp
- .svg

## 注意事项

1. **不要手动编辑 `src/data.ts` 文件**，它会被自动覆盖
2. 确保图片文件名中包含日期信息以便正确排序
3. 图片目录结构必须是 `年份/月份` 的格式
4. 年份必须是 4 位数字，月份必须是 2 位数字（如 `01`, `12`）
