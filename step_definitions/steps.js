/*jshint esversion: 6 */

const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');
const expect = require('chai').expect;
const assert = require('chai').assert;

const timeout = (10 * 1000);

defineSupportCode(({ Given, When, Then }) => {

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

  Given('I\'m visiting a video page', () => {
    return client
      .url('http://mockup.o2.oath.com/ade/automate.html')
      .waitForElementVisible('body', timeout);
  });

  When('the player is loaded', () => {
    client.waitForElementVisible('div.vdb_player', timeout);
    return client.verify.elementPresent('div.vdb_player');
  });


  Then(/^I expect that the player loads within "([^"]*)" ms$/, (ms) => {
    client.verify.elementPresent('div#player-debug');
    client.execute(function () {
        return document.getElementById('player-debug').textContent
    }, [], function (loadTime) {
        console.log('»»» loadTime.value:', loadTime.value);
        // TODO: Assert/Verify load-time is less that expected 
    });
});

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 


  Given(/^I'm on the Lowlander Portal$/, () => {
    return client
      .url(client.options.o2portal)
      .waitForElementVisible('body', timeout);
  });

  Given(/^I go to the (website|url) "([^"]*)"$/, (what, testUrl) => {
    return client
      .url(testUrl)
      .waitForElementVisible('body', timeout);
  });

  Given(/^the title is "([^"]*)"$/, (pageTitle) => {
    client.waitForElementVisible('.loginBox', timeout);
    return client.verify.title(pageTitle);
  });

  When(/^I click the signin button$/, () => {
    return client.click('#signInButton', () => {
      // nothing to do here yet
    });
  });

  Then(/^I enter the authEmail$/, () => {
    return client.setValue('input#email', client.options.authEmail);
  });

  Then(/^I enter the authPassword$/, () => {
    return client.setValue('input#password', client.options.authPassword);
  });

  Then(/I enter the email "([^"]*)"/, (email) => {
    return client.setValue('input#email', email);
  });

  Then(/I enter the password "([^"]*)"/, (password) => {
    return client.setValue('input#password', password);
  });

  Then(/^I expect to end up at the landing page$/, () => {
    client.waitForElementVisible('div.library-collection-wrapper', timeout);
    return client.verify.elementPresent('div.library-collection-wrapper');
  });

  Then(/^I expect to find a signin form$/, () => {
    client.waitForElementVisible('.loginBox', timeout);
    return client.verify.elementPresent('form[name="loginForm"]');
  });

  Then(/^I expect to find a signup button$/, () => {
    client.waitForElementVisible('.loginBox', timeout);
    return client.verify.elementPresent('div[id="signup"]');
  });

  Then(/^I expect to find the signup form$/, () => {
    client.waitForElementVisible('.signup-step-table-inner-container', timeout);
    return client
      .verify.elementPresent('input[ng-model="modal.user.firstName"]')
      .verify.elementPresent('input[ng-model="modal.user.lastName"]')
      .verify.elementPresent('button[translate="aol.lowlander.signup.submit"]');
  });

});
