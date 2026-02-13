<script setup>
import { useGreeting } from '../composables/useGreeting'

const greeting = useGreeting()
</script>

<template>
  <p class="greeting">
    {{ greeting }}<span class="greeting__name">小慧</span>
  </p>
</template>
