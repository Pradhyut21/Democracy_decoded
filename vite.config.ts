import { defineConfig } from 'vite';
import react            from '@vitejs/plugin-react';
import { resolve }      from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],

  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':    ['react', 'react-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          'vendor-gemini':   ['@google/generative-ai'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
  },

  optimizeDeps: {
    include: ['react', 'react-dom', '@google/generative-ai'],
  },
});