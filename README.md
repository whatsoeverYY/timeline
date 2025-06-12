# 项目介绍

本项目是一个基于 Vue 3 的照片时间轴相册应用，支持以时间线方式浏览和展示个人或家庭的珍贵照片。项目自动整理图片，按年月归档，并生成可用于前端展示的数据文件。界面支持桌面端和移动端自适应，拥有美观的时间轴和相册浏览体验。

# 操作手册

## 原始相片上传

将你想要展示的原始照片上传到 src/assets/old 目录下（支持 JPG、JPEG、PNG 格式）。
在项目根目录下，执行以下命令：

```bash
npm run rename-images-by-exif
npm run organize-images
```

## 压缩处理后的相片上传

请先使用日期对相片进行重命名(只需要名称中包含YYYYMMDD即可)，然后上传到 src/assets/source 目录。
在项目根目录下，执行以下命令：

```bash
npm run organize-images
```

# 脚本详情

# 1. 图片整理脚本

organize-images.mjs这个脚本可以自动整理 `src/assets/source` 目录下的图片文件，根据文件名中的日期将图片分类到对应的目录结构中，并生成相应的数据文件。

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

# 2.EXIF重命名与移动脚本

rename-images-by-exif.mjs脚本会将 `src/assets/old` 目录下的图片，根据图片的 EXIF 拍摄日期重命名为 `YYYYMMDD_HHMMSS` 格式，并移动到 `src/assets/source` 目录下，若有重名则自动加序号。原始文件会被删除。

## 使用方法

```bash
npm run rename-images-by-exif
```

- 支持的图片格式：`.jpg`, `.jpeg`, `.png`
- 目标文件已存在时自动加序号（如 `20240601_123456_01.jpg`）
- 处理完成后，所有图片将只保留在 `src/assets/source` 目录

## package.json 脚本示例

```json
"scripts": {
  ...,
  "rename-images-by-exif": "node scripts/rename-images-by-exif.mjs"
}
```
