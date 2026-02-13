<script setup>
import { useAnniversary } from "../composables/useAnniversary";
import { START_DATE_DISPLAY } from "../config";

const { days } = useAnniversary();
</script>

<template>
  <div class="anniversary-counter">
    <p class="anniversary-counter__label">我们在一起</p>
    <p class="anniversary-counter__date">始于 {{ START_DATE_DISPLAY }} 至今</p>
    <p class="anniversary-counter__days">
      第 <span class="anniversary-counter__number">{{ days }}</span> 天啦
    </p>
  </div>
</template>
