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
        // Rollup/Vite expects `manualChunks` to be a function in this config.
        // We group common vendor deps into stable chunk names for better caching.
        manualChunks: (id) => {
          if (!id.includes('node_modules/')) return undefined

          const byChunk = [
            { name: 'vendor-react', pkgs: ['react', 'react-dom'] },
            { name: 'vendor-router', pkgs: ['react-router-dom'] },
            { name: 'vendor-motion', pkgs: ['framer-motion'] },
            { name: 'vendor-ui', pkgs: ['lucide-react', 'react-hot-toast', 'clsx'] },
            { name: 'vendor-forms', pkgs: ['react-hook-form', '@emailjs/browser'] },
            { name: 'vendor-seo', pkgs: ['react-helmet-async', 'react-intersection-observer'] },
          ]

          for (const { name, pkgs } of byChunk) {
            if (pkgs.some((pkg) => id.includes(`node_modules/${pkg}`))) return name
          }

          return undefined
        },
      },
    },
    // Raise warning threshold slightly; framer-motion is intentionally large
    chunkSizeWarningLimit: 600,
  },
})
