// 格式化日期显示
export const formatDate = (date: string) => {
  if (!date || date.length !== 8) return date
  const year = date.substring(0, 4)
  const month = date.substring(4, 6)
  const day = date.substring(6, 8)
  return `${year}-${month}-${day}`
}

export const formatMonthTitle = (monthStr: string) => {
  if (!monthStr) return ''
  const [year, month] = monthStr.split('-')
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return `${monthNames[parseInt(month) - 1]} ${year}`
}
