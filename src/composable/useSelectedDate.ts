import { createSharedComposable } from '@vueuse/core'
import { computed, ref } from 'vue'
import { imageData } from '../data'

// 内部 composable 实现
function _useSelectedDate() {
  // 默认选择 imageData 数组第一个成员的月份，如果没有数据则使用当前年月
  const currentDate = new Date()
  const fallbackDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
  const defaultDate = imageData.length > 0 ? imageData[0].month : fallbackDate

  // 响应式的选择日期
  const selectedDate = ref<string>(defaultDate)

  // 格式化日期为 YYYY-MM 格式
  const formatDateToYearMonth = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  // 更新选择的日期
  const setSelectedDate = (date: string | Date) => {
    if (typeof date === 'string') {
      // 如果传入的是字符串，验证格式并直接使用
      if (/^\d{4}-\d{2}$/.test(date)) {
        selectedDate.value = date
      } else {
        // 如果格式不正确，尝试解析并格式化
        const parsedDate = new Date(date)
        if (!isNaN(parsedDate.getTime())) {
          selectedDate.value = formatDateToYearMonth(parsedDate)
        }
      }
    } else {
      // 如果传入的是 Date 对象，格式化为 YYYY-MM
      selectedDate.value = formatDateToYearMonth(date)
    }
  }

  // 获取下一个月
  const goToNextMonth = () => {
    const [year, month] = selectedDate.value.split('-').map(Number)
    const nextDate = new Date(year, month, 1) // month 已经是下个月了（因为 Date 的月份从 0 开始）
    setSelectedDate(nextDate)
  }

  // 获取上一个月
  const goToPreviousMonth = () => {
    const [year, month] = selectedDate.value.split('-').map(Number)
    const prevDate = new Date(year, month - 2, 1) // month - 2 因为要减去1个月，且 Date 月份从 0 开始
    setSelectedDate(prevDate)
  }

  // 重置到当前月
  const resetToCurrentMonth = () => {
    const currentDate = new Date()
    setSelectedDate(currentDate)
  }

  // 计算属性：获取年份和月份
  const selectedYear = computed(() => {
    return parseInt(selectedDate.value.split('-')[0])
  })

  const selectedMonth = computed(() => {
    return parseInt(selectedDate.value.split('-')[1])
  })

  // 计算属性：获取格式化的显示文本
  const selectedDateDisplay = computed(() => {
    const [year, month] = selectedDate.value.split('-')
    return `${year}年${month}月`
  })

  return {
    // 响应式数据
    selectedDate,
    selectedYear,
    selectedMonth,
    selectedDateDisplay,

    // 方法
    setSelectedDate,
    goToNextMonth,
    goToPreviousMonth,
    resetToCurrentMonth,
  }
}

// 使用 createSharedComposable 创建共享的 composable
export const useSelectedDate = createSharedComposable(_useSelectedDate)
