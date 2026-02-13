<script setup>
import { getAnniversaryDays } from '../composables/useAnniversary'

// 重要纪念日（可后续扩展）
const milestones = [
  { date: '2024.02.20', title: '在一起', desc: '我们开始的第一天' },
  { date: '2024.05.20', title: '百日纪念', desc: '在一起 100 天' },
  { date: '2024.08.20', title: '半年纪念', desc: '我们走过半年' },
  { date: '2025.02.20', title: '一周年', desc: '一周年快乐' },
]

const todayDays = getAnniversaryDays()
</script>

<template>
  <section class="page-timeline">
    <h2 class="page-title">我们的时光</h2>
    <p class="page-subtitle">记录属于我们的重要时刻</p>
    <ul class="timeline">
      <li
        v-for="(item, i) in milestones"
        :key="item.date"
        class="timeline__item"
        :style="{ animationDelay: `${i * 0.1}s` }"
      >
        <span class="timeline__date">{{ item.date }}</span>
        <span class="timeline__dot" />
        <div class="timeline__content">
          <h3 class="timeline__title">{{ item.title }}</h3>
          <p class="timeline__desc">{{ item.desc }}</p>
        </div>
      </li>
    </ul>
    <p class="timeline-tip">已相伴 {{ todayDays }} 天 ❤️</p>
  </section>
</template>
