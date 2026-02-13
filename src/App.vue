<script setup>
import { ref, computed, onMounted } from 'vue'

/** 根据当前时段返回问候语 */
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return '早上好'
  if (hour >= 12 && hour < 14) return '中午好'
  if (hour >= 14 && hour < 18) return '下午好'
  return '晚上好'
}

const greeting = computed(() => getGreeting())

/** 纪念日计时：从 2024.02.20 开始，当天算第 1 天 */
const getAnniversaryDays = () => {
  const startDate = new Date(2024, 1, 20)
  const today = new Date()
  startDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  const diffMs = today - startDate
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  return diffDays + 1
}

const days = ref(0)
const targetDays = getAnniversaryDays()

onMounted(() => {
  const duration = 1800
  const delay = 600

  const runCountAnimation = () => {
    const startTime = performance.now()
    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(2, -10 * progress)
      days.value = Math.floor(eased * targetDays)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        days.value = targetDays
      }
    }
    requestAnimationFrame(updateCount)
  }

  setTimeout(runCountAnimation, delay)
})
</script>

<template>
  <div class="anniversary">
    <p class="anniversary__greeting">
      {{ greeting }}<span class="anniversary__greeting-name">小慧</span>
    </p>
    <p class="anniversary__label">在一起</p>
    <p class="anniversary__start-date">2024.02.20</p>
    <p class="anniversary__days">
      第 <span class="anniversary__days-number">{{ days }}</span> 天
    </p>
  </div>
</template>
