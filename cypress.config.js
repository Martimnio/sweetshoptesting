const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: './docs',
      overwrite: false,
      html: true,
      json: true,
      screenshotsFolder: './docs', // Pasta de screenshots
      embeddedScreenshots: true, // Inclui os screenshots no relatório
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Adiciona screenshots automaticamente aos relatórios quando um teste falha
      on('after:screenshot', (details) => {
        console.log(`Screenshot taken: ${details.path}`);
      });
      return config;
    },
  },
});
