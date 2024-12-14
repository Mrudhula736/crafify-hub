import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.56.1', // Listen on all network interfaces
    port: 5173, // Ensure this matches your dev port
  },
})
