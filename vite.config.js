import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Lovu/',   // 👈 this is the critical fix
  plugins: [react()],
})