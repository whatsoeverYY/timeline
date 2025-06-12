import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SOURCE_DIR = path.join(__dirname, '../src/assets/source')
const TARGET_DIR = path.join(__dirname, '../public/image')

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

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

function organizeImages() {
  console.log('开始整理图片文件...')
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('源目录不存在:', SOURCE_DIR)
    return
  }
  ensureDir(TARGET_DIR)
  const files = fs.readdirSync(SOURCE_DIR)
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext)
  })
  console.log(`找到 ${imageFiles.length} 个图片文件`)
  let processedCount = 0
  imageFiles.forEach(filename => {
    const dateInfo = extractDateFromFilename(filename)
    if (dateInfo) {
      const { year, month } = dateInfo
      const targetDir = path.join(TARGET_DIR, year, month)
      ensureDir(targetDir)
      const sourcePath = path.join(SOURCE_DIR, filename)
      const targetPath = path.join(targetDir, filename)
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
      processedCount++
    } else {
      console.warn(`无法从文件名中提取日期: ${filename}`)
    }
  })
  console.log(`成功处理 ${processedCount} 个图片文件`)
}

function main() {
  organizeImages()
  console.log('整理完成！')
}

if (process.argv[1] === __filename) {
  main()
}
