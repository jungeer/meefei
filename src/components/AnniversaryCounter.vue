<script setup>
import { useAnniversary } from '../composables/useAnniversary'

const { days } = useAnniversary()
</script>

<template>
  <div class="anniversary-counter">
    <p class="anniversary-counter__label">我们在一起</p>
    <p class="anniversary-counter__date">始于 2024.02.20 至今已经</p>
    <p class="anniversary-counter__days">
      第 <span class="anniversary-counter__number">{{ days }}</span> 天啦
    </p>
  </div>
</template>
