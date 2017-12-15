const { defineSupportCode } = require('cucumber');
const { client } = require('nightwatch-cucumber');

defineSupportCode(({ Before, After }) => {
  Before((scenario) => {
    // Do stuff before each scenario
  });

  After((scenario) => {
    // Do stuff after each scenario
  });

  After('@sometag', (scenario) => {
    // Do stuff after each scenario with @sometag
  });
});
