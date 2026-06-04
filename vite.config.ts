import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'demo',
  plugins: [react()],
  resolve: {
    alias: {
      'react-pubsub-store': path.resolve(__dirname, 'src/index.ts'),
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
