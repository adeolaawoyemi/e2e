const { defineSupportCode } = require('cucumber');
const { client } = require('nightwatch-cucumber');
const htmlReporter = require('cucumber-html-reporter');
const findRemoveSync = require('find-remove');

const htmlReporterOptions = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber.json',
  output: 'reports/e2e_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
};

const tenDays = 10 * 24 * 60 * 60 * 1000;


defineSupportCode(({ registerHandler }) => {
  registerHandler('BeforeFeatures', (features, callback) => {
    // TODO: set test environment from command line args
    let o2env = process.env.O2_ENV;
    let o2portal = `http://player${(o2env == 'dev' ? '.dev' : '')}.aol.com`;

    console.log(`Will be testing on Portal: ${o2portal}`);

    client.options.o2env = o2env;
    client.options.o2portal = o2portal;
    client.options.authEmail = process.env.O2_AUTH_EMAIL;
    client.options.authPassword = process.env.O2_AUTH_PASSWORD;

    // TODO: cleanup report files older than 10 days
    let cleanedReports = findRemoveSync(__dirname + '/../reports', { age: { seconds: tenDays }, dir: "*", extensions: ['.html'] });
    let cleanedScreenshots = findRemoveSync(__dirname + '/../screenshots', { age: { seconds: tenDays }, dir: "*", files: "*.*" });
    console.log('Cleanup process removed the following:', cleanedReports, cleanedScreenshots);

    console.log('Will cleanup report files older than 10 days...');
    // Note: Always make sure you call callback() or your tests won't continue
    callback();
  });

  registerHandler('AfterFeatures', (features, callback) => {
    // Do something after all features have run
    let browserName = client.options.desiredCapabilities.browserName;
    let osName = client.capabilities.platform;
    let dateStamp = (new Date()).toISOString().split(/\./)[0].replace(/[\D]/g, '');
    let date = (new Date()).toUTCString();

    htmlReporterOptions.output = `reports/e2e_report-${browserName}-${dateStamp}.html`;
    htmlReporterOptions.metadata = {
      "Browser": browserName,
      "Platform": osName,
      "Date": date,
      "Portal": client.options.o2portal,
    };
    htmlReporter.generate(htmlReporterOptions);

    // Note: Always make sure you call callback() or your tests won't continue
    callback();
  });
});
