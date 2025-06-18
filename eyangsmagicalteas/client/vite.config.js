import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

// proxy config to the backend server
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //the localhost server port when i run npm start
        changeOrigin: true,
      }
    }
  }
})
