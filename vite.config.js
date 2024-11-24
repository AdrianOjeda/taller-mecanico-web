import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://new-backend-repo-production.up.railway.app/taller-app', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  
      },
    },
  },
});
