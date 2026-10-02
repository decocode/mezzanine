// Builds the showcase site (mezzanine.fly.dev) from ./site.
// The site imports the library exactly as consuming apps will:
//   import { Button } from '@decocode/mezzanine'
// but the alias points it at the live source in ./src.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const here = import.meta.dirname

export default defineConfig({
  root: 'site',
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@decocode\/mezzanine$/, replacement: resolve(here, 'src/index.ts') },
    ],
  },
  build: {
    outDir: resolve(here, 'site-dist'),
    emptyOutDir: true,
  },
})
