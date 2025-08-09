import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/handono/',
  plugins: [
    vue(),

      {
      name: 'replace-vite-favicon',
      transformIndexHtml(html) {
        
        let cleaned = html.replace(
          /<link rel="icon"[^>]*vite\.svg[^>]*>/,
          ''
        )
      
        cleaned = cleaned.replace(
          '</head>',
          `  <link rel="icon" type="image/png" href="/favicon.png?v=${Date.now()}">\n</head>`
        )

        return cleaned
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    sourcemap: true
  }
})
