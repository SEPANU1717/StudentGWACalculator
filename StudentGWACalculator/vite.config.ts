import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use root base for Vercel deployments so assets load from '/'
  base: '/',
  build: {
    outDir: 'dist', // Output folder for GitHub Actions deployment
  },
})