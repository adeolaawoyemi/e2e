/*jshint esversion: 6 */

const seleniumServer = require('selenium-server');
const phantomjs = require('phantomjs-prebuilt');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

require('nightwatch-cucumber')({
  cucumberArgs: [
    '--require', 'libs',
    '--require', 'step_definitions',
    '--format', 'pretty',
    '--format', 'json:reports/cucumber.json',
    '--skiptags', 'wip',
    'features'
  ]
});

module.exports = {
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  live_output: false,
  disable_colors: false,
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    host: '127.0.0.1',
    port: 4444
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'phantomjs',
        javascriptEnabled: true,
        acceptSslCerts: true,
        'phantomjs.binary.path': phantomjs.path
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        path: 'screenshots/default',
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        path: 'screenshots/chrome',
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
        }
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        path: 'screenshots/firefox',
      },
    }
  }
};
