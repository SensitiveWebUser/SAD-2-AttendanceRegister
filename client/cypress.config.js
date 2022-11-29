import { defineConfig } from 'cypress';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {},
    numTestsKeptInMemory: 10,
    screenshotsFolder: 'cypress/results/screenshots',
    videosFolder: 'cypress/results/videos',
    supportFile: 'cypress/support/beforeAfter.ts',
    specPattern: 'cypress/integration/**/*',
    chromeWebSecurity: false,
  },
});
