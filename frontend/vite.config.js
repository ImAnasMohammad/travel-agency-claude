/*
 *  FileName:-     vite.config.js
 *  Description:-  Vite configuration with path aliases and dev proxy
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/shareds/components'),
      '@hooks': path.resolve(__dirname, './src/shareds/hooks'),
      '@utils': path.resolve(__dirname, './src/shareds/utils'),
      '@constants': path.resolve(__dirname, './src/shareds/constants'),
      '@services': path.resolve(__dirname, './src/shareds/services'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@apps': path.resolve(__dirname, './src/apps'),
      '@configs': path.resolve(__dirname, './src/configs'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['framer-motion', '@headlessui/react', 'lucide-react'],
        },
      },
    },
  },
});
