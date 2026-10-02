// Builds the publishable package (@decocode/mezzanine) from ./src into ./dist.
// React, React DOM and React Aria Components are peer dependencies,
// so they are kept out of the bundle and supplied by each consuming app.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const here = import.meta.dirname

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(here, 'dist'),
    emptyOutDir: true,
    lib: {
      entry: resolve(here, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'mezzanine',
    },
    rolldownOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^react-aria-components($|\/)/],
    },
  },
})
