import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],

   server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,
    strictPort: true, // Don't try other ports if 5173 is taken
    hmr: {
      clientPort: 5173, // Explicit WebSocket port
      protocol: 'ws',
      host: 'localhost'
    }
  },
  preview: {
    port: 5173,
    strictPort: true
  }
  
})




