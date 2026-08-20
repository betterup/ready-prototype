import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The harness assigns a port via PORT when 4190 is already taken by another
// session's server; 4190 stays the default so the README link keeps working.
const port = Number(process.env.PORT) || 4190

export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port },
  preview: { port },
})
