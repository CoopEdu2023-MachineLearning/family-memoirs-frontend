import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
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
    },
  },
})
