import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const lighthouseCli = fileURLToPath(new URL('../node_modules/@lhci/cli/src/cli.js', import.meta.url))
const chromePath = process.env.CHROME_PATH || chromium.executablePath()
const lighthouse = spawn(process.execPath, [lighthouseCli, ...process.argv.slice(2)], {
  env: {
    ...process.env,
    CHROME_PATH: chromePath,
  },
  stdio: 'inherit',
})

lighthouse.on('error', (error) => {
  console.error(`Unable to start Lighthouse CI: ${error.message}`)
  process.exitCode = 1
})

lighthouse.on('exit', (code, signal) => {
  if (signal) {
    console.error(`Lighthouse CI stopped after receiving ${signal}.`)
    process.exitCode = 1
    return
  }

  process.exitCode = code ?? 1
})
