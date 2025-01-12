import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets', 
    rollupOptions: {
      external: ['/assets/index-BHWF6PBh.js'],
    }
  }
  
})
