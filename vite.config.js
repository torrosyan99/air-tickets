import path from 'path';

import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      "@icons": path.resolve(__dirname, 'src/shared/assets/icons'),
    }
  },
  server: {
    port: 5000,
  }
})
