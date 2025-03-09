import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/WeatherForecast/',  // ✅ Ensures correct asset paths on GitHub Pages
  build: {
    target: 'esnext', // ✅ Ensures ES modules
    rollupOptions: {
      external: [],  // ✅ Keeps dependencies inside the bundle
    },
    commonjsOptions: {
      transformMixedEsModules: true, // ✅ Fixes "require" issues
    },
  },
});
