import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@canvasjs/react-charts'],
  },
  base: '/WeatherForecast/',
  build: {
    outDir: 'dist',
  },
})
