import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  preview: {
    port: 5010,
    strictPort: true,
  },
  server: {
    port: 5005,
    strictPort: true,
    host: true,
    origin: "http://localhost:5005"
  }
})
