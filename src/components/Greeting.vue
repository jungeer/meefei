<script setup>
import { useGreeting } from '../composables/useGreeting'
import { PARTNER_1 } from '../config'

const greeting = useGreeting()
</script>

<template>
  <p class="greeting">
    {{ greeting }}，<span class="greeting__name">{{ PARTNER_1 }}</span>
  </p>
</template>
