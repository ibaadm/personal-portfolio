import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'

function getVersion(): string {
  try {
    const count = parseInt(execSync('git rev-list --count HEAD').toString().trim())
    return `v1.${Math.floor(count / 10)}.${count % 10}`
  } catch {
    return 'v1.0.0'
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(getVersion()),
  },
})
