import { computed } from 'vue'
import { getAnniversaryDays } from './useAnniversary'

const START_DATE = new Date(2024, 1, 20)

/** 根据起始日 + 天数得到日期字符串 */
function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}

/** 根据天数计算日期（第 1 天 = 起始日当天） */
function addDays(days) {
  const d = new Date(START_DATE.getTime())
  d.setDate(d.getDate() + days - 1)
  return d
}

/** 里程碑配置：天数 => { title, desc } */
const MILESTONE_CONFIG = {
  1: { title: '在一起', desc: '我们开始的第一天' },
  100: { title: '百日纪念', desc: '在一起 100 天' },
  183: { title: '半年纪念', desc: '我们走过半年' },
  365: { title: '一周年', desc: '一周年快乐' },
  500: { title: '五百日', desc: '五百个日夜' },
  730: { title: '两周年', desc: '两周年快乐' },
  1000: { title: '千日纪念', desc: '一千天 ❤️' },
}

/** 动态生成时光轴数据 */
export function useTimeline() {
  const todayDays = getAnniversaryDays()

  const milestones = computed(() => {
    const configDays = Object.keys(MILESTONE_CONFIG)
      .map(Number)
      .sort((a, b) => a - b)

    return configDays.map((days) => {
      const date = addDays(days)
      const config = MILESTONE_CONFIG[days]
      const passed = todayDays >= days
      const diff = passed ? todayDays - days : days - todayDays

      return {
        days,
        date: formatDate(date),
        title: config.title,
        desc: config.desc,
        passed,
        diff,
        statusText: passed ? `${diff} 天前` : `还有 ${diff} 天`,
      }
    })
  })

  return { milestones, todayDays }
}
