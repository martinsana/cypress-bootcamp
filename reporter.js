const reporter = require('cucumber-html-reporter');
const options = {
  theme: 'bootstrap',
  jsonDir: 'cypress/reports/cucumber-json',
  output: 'cypress/reports/cucumber-json/index.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Name': 'Demo',
    'Test Environment': 'STAGING',
    Browser: 'Chrome 54.0.2840.98',
    Platform: 'Windows 10',
    Executed: 'Remote',
  },
};

reporter.generate(options);
