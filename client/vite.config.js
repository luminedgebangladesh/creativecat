import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui':     ['lucide-react', 'react-hot-toast', 'clsx'],
          'vendor-forms':  ['react-hook-form', '@emailjs/browser'],
          'vendor-seo':    ['react-helmet-async', 'react-intersection-observer'],
        },
      },
    },
    // Raise warning threshold slightly; framer-motion is intentionally large
    chunkSizeWarningLimit: 600,
  },
})
