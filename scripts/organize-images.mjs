import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置路径
const SOURCE_DIR = path.join(__dirname, '../src/assets/source')
const TARGET_DIR = path.join(__dirname, '../public/image')
const DATA_FILE = path.join(__dirname, '../src/data.ts')

// 创建目录（如果不存在）
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// 从文件名中提取日期信息
function extractDateFromFilename(filename) {
  // 匹配格式：IMG_YYYYMMDD_... 或类似格式
  const dateMatch = filename.match(/(\d{8})/)
  if (dateMatch) {
    const dateStr = dateMatch[1]
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    return { year, month, day, fullDate: dateStr }
  }
  return null
}

// 获取文件描述（从文件名中提取）
function getFileDescription(filename) {
  // 移除扩展名
  const nameWithoutExt = path.parse(filename).name

  // 尝试提取描述部分（在第二个下划线之后）
  const parts = nameWithoutExt.split('_')
  if (parts.length > 2) {
    return parts.slice(2).join('_')
  }
  return ''
}

// 整理图片文件
function organizeImages() {
  console.log('开始整理图片文件...')

  // 确保源目录存在
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('源目录不存在:', SOURCE_DIR)
    return
  }

  // 确保目标目录存在
  ensureDir(TARGET_DIR)

  // 读取源目录中的所有文件
  const files = fs.readdirSync(SOURCE_DIR)
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext)
  })

  console.log(`找到 ${imageFiles.length} 个图片文件`)

  const organizedData = {}
  let processedCount = 0

  imageFiles.forEach(filename => {
    const dateInfo = extractDateFromFilename(filename)

    if (dateInfo) {
      const { year, month, fullDate } = dateInfo
      const monthKey = `${year}-${month}`

      // 创建目标目录
      const targetDir = path.join(TARGET_DIR, year, month)
      ensureDir(targetDir)

      // 源文件和目标文件路径
      const sourcePath = path.join(SOURCE_DIR, filename)
      const targetPath = path.join(targetDir, filename)

      // 复制文件（如果目标文件不存在或源文件更新）
      let shouldCopy = true
      if (fs.existsSync(targetPath)) {
        const sourceStats = fs.statSync(sourcePath)
        const targetStats = fs.statSync(targetPath)
        shouldCopy = sourceStats.mtime > targetStats.mtime
      }

      if (shouldCopy) {
        fs.copyFileSync(sourcePath, targetPath)
        console.log(`已复制: ${filename} -> ${year}/${month}/`)
      }

      // 收集数据
      if (!organizedData[monthKey]) {
        organizedData[monthKey] = {
          month: monthKey,
          count: 0,
          details: [],
        }
      }

      organizedData[monthKey].count++
      organizedData[monthKey].details.push({
        imagePath: `/image/${year}/${month}/${filename}`,
        desc: getFileDescription(filename),
        date: fullDate,
      })

      processedCount++
    } else {
      console.warn(`无法从文件名中提取日期: ${filename}`)
    }
  })

  console.log(`成功处理 ${processedCount} 个图片文件`)

  // 生成 data.ts 文件
  generateDataFile(organizedData)
}

// 生成 data.ts 文件
function generateDataFile(organizedData) {
  console.log('生成 data.ts 文件...')

  // 按月份排序
  const sortedData = Object.values(organizedData).sort((a, b) => {
    return a.month.localeCompare(b.month)
  })

  // 对每个月份的详情按日期排序
  sortedData.forEach(monthData => {
    monthData.details.sort((a, b) => a.date.localeCompare(b.date))
  })

  const dataContent = `// 自动生成的图片数据文件
// 最后更新时间: ${new Date().toLocaleString('zh-CN')}

export interface ImageDetail {
  imagePath: string;
  desc: string;
  date: string;
}

export interface MonthData {
  month: string;
  count: number;
  details: ImageDetail[];
}

export const imageData: MonthData[] = ${JSON.stringify(sortedData, null, 2)};

export default imageData;
`

  fs.writeFileSync(DATA_FILE, dataContent, 'utf8')
  console.log(`data.ts 文件已生成: ${DATA_FILE}`)
  console.log(`共包含 ${sortedData.length} 个月份的数据`)
}

// 监听文件变化（可选功能）
function watchSourceDirectory() {
  console.log('开始监听源目录变化...')

  fs.watch(SOURCE_DIR, { recursive: true }, (eventType, filename) => {
    if (filename && eventType === 'change') {
      console.log(`检测到文件变化: ${filename}`)
      setTimeout(() => {
        organizeImages()
      }, 1000) // 延迟1秒执行，避免频繁触发
    }
  })
}

// 主函数
function main() {
  const args = process.argv.slice(2)
  const shouldWatch = args.includes('--watch') || args.includes('-w')

  // 首次执行整理
  organizeImages()

  // 如果指定了监听参数，则开始监听
  if (shouldWatch) {
    watchSourceDirectory()
    console.log('脚本将持续运行，监听文件变化...')
  } else {
    console.log('整理完成！')
  }
}

// 如果直接运行此脚本
if (process.argv[1] === __filename) {
  main()
}

export { generateDataFile, organizeImages }
