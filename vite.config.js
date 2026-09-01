import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@mediapipe/pose': path.resolve(__dirname, 'src/dummy-mediapipe.js')
    }
  },
  server: {
    allowedHosts: true,
    host: true
  }
})
