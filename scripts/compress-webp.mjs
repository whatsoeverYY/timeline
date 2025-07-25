import fs from 'fs/promises'
import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置路径
const SOURCE_DIR = path.resolve(__dirname, '../src/assets/source')
const OUTPUT_DIR = path.resolve(__dirname, '../src/assets/compressed')

// 支持的图片格式
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']

/**
 * 确保目录存在，如果不存在则创建
 */
async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true })
      console.log(`✅ 创建目录: ${dirPath}`)
    } else {
      throw error
    }
  }
}

/**
 * 检查文件是否为支持的图片格式
 */
function isSupportedImageFormat(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return SUPPORTED_FORMATS.includes(ext)
}

/**
 * 获取目录下所有图片文件
 */
async function getImageFiles(dirPath) {
  try {
    const files = await fs.readdir(dirPath)
    const imageFiles = []

    for (const file of files) {
      const filePath = path.join(dirPath, file)
      const stats = await fs.stat(filePath)

      if (stats.isFile() && isSupportedImageFormat(file)) {
        imageFiles.push({
          name: file,
          path: filePath,
          baseName: path.parse(file).name, // 不含扩展名的文件名
        })
      }
    }

    return imageFiles
  } catch (error) {
    console.error(`❌ 读取目录失败: ${error.message}`)
    return []
  }
}

/**
 * 压缩单个图片文件
 */
async function compressImage(imageFile) {
  try {
    const startTime = Date.now()

    // 获取原文件大小
    const inputStats = await fs.stat(imageFile.path)
    const originalSize = inputStats.size

    // 使用imagemin进行WebP无损压缩
    const files = await imagemin([imageFile.path], {
      destination: OUTPUT_DIR,
      plugins: [
        imageminWebp({
          lossless: true, // 无损压缩
          quality: 100, // 最高质量
          method: 6, // 压缩方法 (0-6, 6为最佳压缩)
        }),
      ],
    })

    if (files.length > 0) {
      // 重命名文件以保持原始文件名
      const originalOutputPath = files[0].destinationPath
      const desiredOutputPath = path.join(
        OUTPUT_DIR,
        `${imageFile.baseName}.webp`
      )

      if (originalOutputPath !== desiredOutputPath) {
        await fs.rename(originalOutputPath, desiredOutputPath)
      }

      // 获取压缩后文件大小
      const outputStats = await fs.stat(desiredOutputPath)
      const compressedSize = outputStats.size
      const compressionRatio = (
        ((originalSize - compressedSize) / originalSize) *
        100
      ).toFixed(2)
      const processingTime = Date.now() - startTime

      console.log(`✅ ${imageFile.name} -> ${imageFile.baseName}.webp`)
      console.log(`   原大小: ${(originalSize / 1024).toFixed(2)} KB`)
      console.log(`   压缩后: ${(compressedSize / 1024).toFixed(2)} KB`)
      console.log(`   压缩率: ${compressionRatio}%`)
      console.log(`   耗时: ${processingTime}ms\n`)

      return {
        success: true,
        originalSize,
        compressedSize,
        processingTime,
        fileName: imageFile.name,
      }
    } else {
      throw new Error('压缩失败，未生成输出文件')
    }
  } catch (error) {
    console.error(`❌ 压缩 ${imageFile.name} 失败: ${error.message}`)
    return {
      success: false,
      fileName: imageFile.name,
      error: error.message,
    }
  }
}

/**
 * 批量压缩图片
 */
async function batchCompressImages() {
  try {
    console.log('🚀 开始批量压缩图片...\n')

    // 检查源目录是否存在
    try {
      await fs.access(SOURCE_DIR)
    } catch {
      console.error(`❌ 源目录不存在: ${SOURCE_DIR}`)
      return
    }

    // 确保输出目录存在
    await ensureDirectoryExists(OUTPUT_DIR)

    // 获取所有图片文件
    const imageFiles = await getImageFiles(SOURCE_DIR)

    if (imageFiles.length === 0) {
      console.log('📁 源目录中没有找到支持的图片文件')
      console.log(`支持的格式: ${SUPPORTED_FORMATS.join(', ')}`)
      return
    }

    console.log(`📸 找到 ${imageFiles.length} 个图片文件\n`)

    // 批量处理
    const results = []
    let successCount = 0
    let failCount = 0
    let totalOriginalSize = 0
    let totalCompressedSize = 0
    let totalProcessingTime = 0

    for (const imageFile of imageFiles) {
      const result = await compressImage(imageFile)
      results.push(result)

      if (result.success) {
        successCount++
        totalOriginalSize += result.originalSize
        totalCompressedSize += result.compressedSize
        totalProcessingTime += result.processingTime
      } else {
        failCount++
      }
    }

    // 输出统计信息
    console.log('📊 压缩完成统计:')
    console.log(`✅ 成功: ${successCount} 个文件`)
    if (failCount > 0) {
      console.log(`❌ 失败: ${failCount} 个文件`)
    }

    if (successCount > 0) {
      const totalCompressionRatio = (
        ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) *
        100
      ).toFixed(2)
      console.log(
        `📦 总原始大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`
      )
      console.log(
        `📦 总压缩大小: ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`
      )
      console.log(`📈 总体压缩率: ${totalCompressionRatio}%`)
      console.log(`⏱️  总耗时: ${(totalProcessingTime / 1000).toFixed(2)} 秒`)
    }

    console.log(`\n🎉 所有文件已保存到: ${OUTPUT_DIR}`)
  } catch (error) {
    console.error('❌ 批量压缩过程中发生错误:', error.message)
  }
}

// 主函数
async function main() {
  console.log('🖼️  WebP 无损压缩工具')
  console.log('====================\n')

  await batchCompressImages()
}

// 运行脚本
main().catch(error => {
  console.error('💥 脚本执行失败:', error.message)
  process.exit(1)
})
