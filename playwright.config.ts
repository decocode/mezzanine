import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  outputDir: './reports/test-results',
  forbidOnly: !!process.env.CI,
  // Tests share no state, so they spread across every core, including within a file.
  fullyParallel: true,
  workers: process.env.CI ? '100%' : undefined,
  reporter: [['list'], ['html', { open: 'never', outputFolder: './reports/playwright' }]],
  use: {
    browserName: 'chromium',
    trace: 'retain-on-failure',
    baseURL: 'http://127.0.0.1:4174',
  },
  webServer: {
    command: 'npm run build:site && npm run preview -- --host 127.0.0.1 --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174',
  },
})
