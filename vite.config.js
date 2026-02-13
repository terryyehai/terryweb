import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  // 使用相對路徑，確保在任何子路徑下都能正常運作
  // 這樣可以同時支援 GitHub Pages (子路徑) 和 Cloudflare Pages (根路徑)
  base: './',
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  
  build: {
    // 輸出到 dist 目錄
    outDir: 'dist',
    
    // 資源檔案目錄
    assetsDir: 'assets',
    
    // 生成 sourcemap 方便除錯
    sourcemap: false,
    
    // 分割 chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router']
        }
      }
    }
  },
  
  // 開發伺服器設定
  server: {
    port: 3000,
    open: true
  }
})
