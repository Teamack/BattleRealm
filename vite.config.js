import { defineConfig } from 'vite'

export default defineConfig({
  envPrefix: ['VITE_', 'SITE_'],
  build: {
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: 'main.js',
      },
    },
  },
})
