<script setup>
import { START_DATE_DISPLAY, PARTNER_1, PARTNER_2 } from "../config";
</script>

<template>
  <section class="page-about">
    <h2 class="page-title">{{ PARTNER_1 }} & {{ PARTNER_2 }}</h2>
    <p class="page-subtitle">我们的专属小站</p>
    <div class="about-content">
      <p class="about__text">记录在一起的每一天</p>
      <p class="about__text">珍藏属于我们的回忆</p>
      <p class="about__date">始于 {{ START_DATE_DISPLAY }}</p>
    </div>
  </section>
</template>
