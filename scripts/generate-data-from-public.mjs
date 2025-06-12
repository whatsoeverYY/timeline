import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IMAGE_ROOT = path.join(__dirname, '../public/image')
const DATA_FILE = path.join(__dirname, '../src/data.ts')

function extractDateFromFilename(filename) {
  const dateMatch = filename.match(/(\d{8})/)
  if (dateMatch) {
    const dateStr = dateMatch[1]
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    return { year, month, fullDate: dateStr }
  }
  return null
}

function getFileDescription(filename) {
  const nameWithoutExt = path.parse(filename).name
  const parts = nameWithoutExt.split('_')
  if (parts.length > 2) {
    return parts.slice(2).join('_')
  }
  return ''
}

function walkDir(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name)
    if (dirent.isDirectory()) {
      walkDir(fullPath, callback)
    } else {
      callback(fullPath)
    }
  })
}

function generateDataFromPublic() {
  const organizedData = {}
  walkDir(IMAGE_ROOT, filePath => {
    const relPath = path.relative(IMAGE_ROOT, filePath)
    const ext = path.extname(filePath).toLowerCase()
    if (!['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext))
      return
    const filename = path.basename(filePath)
    const dateInfo = extractDateFromFilename(filename)
    if (!dateInfo) return
    const { year, month, fullDate } = dateInfo
    const monthKey = `${year}-${month}`
    if (!organizedData[monthKey]) {
      organizedData[monthKey] = {
        month: monthKey,
        count: 0,
        details: [],
      }
    }
    organizedData[monthKey].count++
    organizedData[monthKey].details.push({
      imagePath: `/image/${relPath.replace(/\\/g, '/')}`,
      desc: getFileDescription(filename),
      date: fullDate,
    })
  })
  // 排序
  const sortedData = Object.values(organizedData).sort((a, b) =>
    a.month.localeCompare(b.month)
  )
  sortedData.forEach(monthData => {
    monthData.details.sort((a, b) => a.date.localeCompare(b.date))
  })
  const dataContent = `// 自动生成的图片数据文件\n// 最后更新时间: ${new Date().toLocaleString('zh-CN')}\n\nexport interface ImageDetail {\n  imagePath: string;\n  desc: string;\n  date: string;\n}\n\nexport interface MonthData {\n  month: string;\n  count: number;\n  details: ImageDetail[];\n}\n\nexport const imageData: MonthData[] = ${JSON.stringify(sortedData, null, 2)};\n\nexport default imageData;\n`
  fs.writeFileSync(DATA_FILE, dataContent, 'utf8')
  console.log(`data.ts 文件已生成: ${DATA_FILE}`)
  console.log(`共包含 ${sortedData.length} 个月份的数据`)
}

function main() {
  generateDataFromPublic()
}

if (process.argv[1] === __filename) {
  main()
}
