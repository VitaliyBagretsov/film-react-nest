import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['src/scss']
      }
    }
  },
  // server: {
  //   port: 3000,
  //   strictPort: true,
  //   host: true,
  //   origin: 'http://0.0.0.0:3000',
  //   watch: {
  //     usePolling: true,
  //   }
  // }
})
