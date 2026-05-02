import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pixel-game/', // 设置为仓库名称，确保 GitHub Pages 资源路径正确
})
