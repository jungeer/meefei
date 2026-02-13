<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="header">
      <nav class="nav">
        <RouterLink to="/" class="nav__link" active-class="nav__link--active">首页</RouterLink>
        <RouterLink to="/timeline" class="nav__link" active-class="nav__link--active">时光轴</RouterLink>
        <RouterLink to="/about" class="nav__link" active-class="nav__link--active">关于</RouterLink>
      </nav>
    </header>
    <main class="main">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>
