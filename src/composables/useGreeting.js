import { computed } from 'vue'
import dayjs from 'dayjs'

/** 根据当前时段返回问候语 */
export function useGreeting() {
  return computed(() => {
    const hour = dayjs().hour()
    if (hour >= 5 && hour < 12) return '早上好'
    if (hour >= 12 && hour < 14) return '中午好'
    if (hour >= 14 && hour < 18) return '下午好'
    return '晚上好'
  })
}
