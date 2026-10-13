import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: {
    browserName: 'chromium',
    baseURL: 'http://127.0.0.1:4174',
  },
  webServer: {
    command: 'npm run build:site && npm run preview -- --host 127.0.0.1 --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174',
  },
})
