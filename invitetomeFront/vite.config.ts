import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    cors: true,
    hmr: {
      clientPort: 443,
      host: '1da0-46-6-32-153.ngrok-free.app'
    },
    allowedHosts: ['1da0-46-6-32-153.ngrok-free.app']
  }
})