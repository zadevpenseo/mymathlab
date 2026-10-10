import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'katex-vendor': ['katex'],
          'react-vendor': ['react', 'react-dom'],
          'lucide-vendor': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});
