import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/taller-app': {
        target: 'http://127.0.0.1:61565',  // Minikube URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/taller-app/, '/taller-app'), // Ensure it's mapped correctly
      },
    },
  },
});