import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imageDir = path.join(__dirname, 'src/assets/image')
const outputFile = path.join(__dirname, 'src/data.ts')
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

function scanImageDirectory() {
  const monthlyData = new Map()

  try {
    const years = fs.readdirSync(imageDir).filter(year => {
      const yearPath = path.join(imageDir, year)
      return fs.statSync(yearPath).isDirectory() && /^\d{4}$/.test(year)
    })

    years.forEach(year => {
      const yearPath = path.join(imageDir, year)
      const months = fs.readdirSync(yearPath).filter(month => {
        const monthPath = path.join(yearPath, month)
        return fs.statSync(monthPath).isDirectory() && /^\d{2}$/.test(month)
      })

      months.forEach(month => {
        const monthPath = path.join(yearPath, month)
        const monthKey = `${year}-${month}`

        const files = fs.readdirSync(monthPath).filter(file => {
          const ext = path.extname(file).toLowerCase()
          return imageExtensions.includes(ext)
        })

        const details = files.map(file => {
          const filePath = `@/assets/image/${year}/${month}/${file}`
          const { date, desc } = parseFileName(file)

          return {
            imagePath: filePath,
            desc: desc,
            date: date,
          }
        })

        if (details.length > 0) {
          monthlyData.set(monthKey, {
            month: monthKey,
            count: details.length,
            details: details.sort((a, b) => a.date.localeCompare(b.date)),
          })
        }
      })
    })

    return Array.from(monthlyData.values()).sort((a, b) =>
      a.month.localeCompare(b.month)
    )
  } catch (error) {
    process.stderr.write(`扫描图片目录时出错: ${error}\n`)
    return []
  }
}

function parseFileName(fileName) {
  const nameWithoutExt = path.parse(fileName).name
  const match = nameWithoutExt.match(/^IMG_(\d{8})_?(.*)$/i)

  if (match) {
    return {
      date: match[1],
      desc: match[2] || '',
    }
  }

  const dateMatch = nameWithoutExt.match(/(\d{8})/)
  if (dateMatch) {
    return {
      date: dateMatch[1],
      desc: nameWithoutExt
        .replace(dateMatch[1], '')
        .replace(/^[_-]+|[_-]+$/g, ''),
    }
  }

  return {
    date: '',
    desc: nameWithoutExt,
  }
}

function generateDataFile(data) {
  return `// 此文件由 generate-data.mjs 自动生成，请勿手动修改
// 运行 node generate-data.mjs 来重新生成此文件

export interface ImageDetail {
  imagePath: string;
  desc: string;
  date: string;
}

export interface MonthlyData {
  month: string;
  count: number;
  details: ImageDetail[];
}

export const imageData: MonthlyData[] = ${JSON.stringify(data, null, 2)};

export default imageData;
`
}

function main() {
  process.stdout.write('开始扫描图片目录...\n')

  if (!fs.existsSync(imageDir)) {
    process.stderr.write(`图片目录不存在: ${imageDir}\n`)
    return
  }

  const data = scanImageDirectory()
  process.stdout.write(`找到 ${data.length} 个月份的数据\n`)

  const totalImages = data.reduce((sum, month) => sum + month.count, 0)
  process.stdout.write(`总共 ${totalImages} 张图片\n`)

  const fileContent = generateDataFile(data)

  try {
    fs.writeFileSync(outputFile, fileContent, 'utf8')
    process.stdout.write(`数据文件已生成: ${outputFile}\n`)
  } catch (error) {
    process.stderr.write(`写入文件时出错: ${error}\n`)
  }
}

main()
