import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@routes': resolve(__dirname, './src/routes'),
      '@http': resolve(__dirname, './src/http'),
      '@apis': resolve(__dirname, './src/apis'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@features': resolve(__dirname, './src/features'),
      '@utils': resolve(__dirname, './src/utils'),
    }
  },
  build: {
    rollupOptions: {
      input: {
        memoir: resolve(__dirname, 'memoirs.html')
      }
    }
  },
  server: {
    open: '/memoirs.html',
    historyApiFallback: '/memoirs.html'  // ✅ 关键：让 React Router 的路径回退到入口
  }
})