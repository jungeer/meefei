<script setup>
import { useTimeline } from '../composables/useTimeline'

const { milestones, todayDays } = useTimeline()
</script>

<template>
  <section class="page-timeline">
    <h2 class="page-title">我们的时光</h2>
    <p class="page-subtitle">记录属于我们的重要时刻</p>
    <ul class="timeline">
      <li
        v-for="(item, i) in milestones"
        :key="item.days"
        class="timeline__item"
        :class="{ 'timeline__item--passed': item.passed }"
        :style="{ animationDelay: `${i * 0.1}s` }"
      >
        <span class="timeline__date">{{ item.date }}</span>
        <span class="timeline__dot" />
        <div class="timeline__content">
          <h3 class="timeline__title">{{ item.title }}</h3>
          <p class="timeline__desc">{{ item.desc }}</p>
          <span class="timeline__status" :class="item.passed ? 'timeline__status--passed' : 'timeline__status--upcoming'">
            {{ item.statusText }}
          </span>
        </div>
      </li>
    </ul>
    <p class="timeline-tip">已相伴 {{ todayDays }} 天 ❤️</p>
  </section>
</template>
