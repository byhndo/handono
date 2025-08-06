import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/handono/',     
  build: {
    outDir: 'docs'       
  },
  plugins: [vue()],
})
