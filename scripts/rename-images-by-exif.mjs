import exifr from 'exifr'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OLD_DIR = path.join(__dirname, '../src/assets/old')
const SOURCE_DIR = path.join(__dirname, '../src/assets/source')

// 确保目标目录存在
if (!fs.existsSync(SOURCE_DIR)) {
  fs.mkdirSync(SOURCE_DIR, { recursive: true })
}

async function processImages() {
  const files = fs.readdirSync(OLD_DIR)
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png'].includes(ext)
  })

  for (const filename of imageFiles) {
    const oldPath = path.join(OLD_DIR, filename)
    try {
      // 读取EXIF
      const exif = await exifr.parse(oldPath, [
        'DateTimeOriginal',
        'CreateDate',
        'ModifyDate',
      ])
      const dateTaken =
        exif?.DateTimeOriginal || exif?.CreateDate || exif?.ModifyDate
      if (!dateTaken) {
        console.warn(`No EXIF date for ${filename}`)
        continue
      }
      // 格式化日期
      const dateObj = new Date(dateTaken)
      if (isNaN(dateObj.getTime())) {
        console.warn(`Invalid EXIF date for ${filename}`)
        continue
      }
      const pad = n => n.toString().padStart(2, '0')
      const newBase = `${dateObj.getFullYear()}${pad(dateObj.getMonth() + 1)}${pad(dateObj.getDate())}_${pad(dateObj.getHours())}${pad(dateObj.getMinutes())}${pad(dateObj.getSeconds())}`
      const ext = path.extname(filename).toLowerCase()
      let newName = newBase + ext
      let newPath = path.join(SOURCE_DIR, newName)
      let counter = 1
      while (fs.existsSync(newPath)) {
        newName = `${newBase}_${pad(counter)}${ext}`
        newPath = path.join(SOURCE_DIR, newName)
        counter++
      }
      // 移动并重命名
      fs.renameSync(oldPath, newPath)
      console.log(`Moved and renamed: ${filename} -> ${newName}`)
    } catch (e) {
      console.error(`Error processing ${filename}:`, e)
    }
  }
  console.log(`Processing complete! Files moved to: ${SOURCE_DIR}`)
}

processImages()
