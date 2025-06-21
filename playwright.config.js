import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { outputFolder: 'html-report', open: 'never' }]],
  use: {
    baseURL: 'https://api.example.com',
    ignoreHTTPSErrors: true,
  },
  timeout: 30000,
});
