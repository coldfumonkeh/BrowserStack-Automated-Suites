var assert = require('assert');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var webdriver = require('browserstack-webdriver');
var test = require('browserstack-webdriver/testing');
var browsers = require('./browsers.json');
var suites = require('./suites');
var userIndex = process.argv.indexOf('--user');
var keyIndex = process.argv.indexOf('--key');
var visualIndex = process.argv.indexOf('--visual');
var bsUser, bsKey, bsVisual;


/**
 * generateBrowserLabel() returns a human-readable browser name / version / os string for test output
 * @param {Object} browser
 * @return {String} Returns the formatted string
 */
function generateBrowserLabel(browser) {
  var labelString = '';
  labelString += String(browser['browserName']).trim().toLowerCase() === 'ie' ? 'Internet Explorer' : browser['browserName'];
  if (browser['version']) {
    labelString += ' ['+browser['version']+']';
  } else if (!browser['device']) {
    labelString += ' [latest stable]';
  }
  labelString += ' '+browser['os'];
  labelString += browser['os_version'] ? ' '+browser['os_version'] : '';
  labelString += browser['device'] ? ' '+browser['device'] : '';
  labelString += browser['deviceOrientation'] ? ' '+browser['deviceOrientation'] : '';
  labelString += browser['resolution'] ? ' '+browser['resolution'] : '';

  return labelString;
}

/**
 * setupDriver() returns a new webdriver for testing use, built with the
 * provided capabilities and browser.
 * @param {Object} browser
 * @param {Object} capabilities
 * @return {String} Returns the created webdriver
 */
function setupDriver(browser, capabilities) {

  var fullCapabilities = {};

  for ( var key in browser ) fullCapabilities[key] = browser[key];
  for ( var key in capabilities ) fullCapabilities[key] = capabilities[key];

  return new webdriver.Builder().
        usingServer('http://hub.browserstack.com/wd/hub').
        withCapabilities(fullCapabilities).
        build();
}


// Set the parameter values based on the process.argv array

if (userIndex !== -1) {
  bsUser = process.argv[userIndex + 1];
} else {
  throw 'You need to set your BrowserStack username as a command line ' +
    ' variable using the --name flag.';
}

if (keyIndex !== -1) {
  bsKey = process.argv[keyIndex + 1];
} else {
  throw 'You need to set your BrowserStack access key as a command line ' +
    ' variable using the --key flag.';
}

bsVisual = visualIndex !== -1 ? process.argv[visualIndex + 1] : false;


// Loop over each browser set and create the tets suite layout
_.each(browsers, function(browser) {

  var capabilities = {
    'browserstack.debug' : bsVisual,
    'browserstack.user' : bsUser,
    'browserstack.key' : bsKey
  };

  var driver = setupDriver(browser, capabilities);
  var browserLabel = generateBrowserLabel(browser);

  describe(browserLabel, function() {

    //this.timeout(60*60*1000);

    if (Object.keys(suites).length < 1) throw new Error('No test suites found.');

    // Run all test suites recursively
    _.each(suites, function(suite) {
      if (typeof suite === 'function') return suite(driver, webdriver);
      _.each(suite, function(suiteItem) {
        if (typeof suiteItem === 'function') return suiteItem(driver, webdriver);
        _.each(suiteItem, function(suiteSubItem) {
          if (typeof suiteSubItem === 'function') return suiteSubItem(driver, webdriver);
        });
      });
    });

    test.after(function() { driver.quit(); });

  });

});
