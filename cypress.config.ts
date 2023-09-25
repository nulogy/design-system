import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'cr35kv',
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:9999',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
