import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],
  // GitHub Pages 项目站点需设置 base 为 /repo-name/
  base: process.env.VITE_BASE || '/',
})
