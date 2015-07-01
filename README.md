# BrowserStack Automation Regression Testing

This repository contains a suite of tests that need to be built to assist with
regression testing (both locally and on automated C.I. servers).

The script uses the BrowserStack automation service and as such every user who
uses this script must have valid credentials to authenticate against and access that service.


## Installation

You will need to install both mocha and browserstack-webdriver as global packages:

    npm install -g mocha browserstack-webdriver

Running npm install will install all saved dependencies in the package.json file:

    npm install

## Running

To run the test suites open up the Terminal or Command Prompt and navigate to
the location of this code on your machine.

Enter the following command to run the main script:

    mocha index.js --user your_username --key your_key

You can see the two additional parameters here are your access details to the
BrowserStack services. You will need these so all tests are logged against your
authenticated user.

### Parameters

The following table lists the parameters available to send to the custom script.

| Flag | Options | Default | Required | Purpose |
|---|---|---|---|---|
|  --user | n/a | n/a | yes | your username |
|  --key | n/a | n/a | yes | your access key |
|  --visible | true or false  | false  |  no | toggle the visible debug output on BrowserStack |
|  --reporter | spec or nyan | spec  |  no |  select which reporter to use for the test results |  |

## Tests

The regression test document has originally been split into relevant site sections.

Each test written should emulate this as close possible and help to make future
tests easier to write and maintain.

Each test suite should be written as an exportable module and placed in the
<code>suites</code> directory.

The main test script will loop over each test suite available and run them in turn.

## Browser Settings

It has been written to make it possible to test against multiple browsers and devices.

To add a new device / browser simply add a new object to the array in
the <code>browsers.json</code> file in the root of this project.

    [
      {
        "browserName"   : "Firefox",
        "os"            : "Windows",
        "os_version"    : "XP",
        "resolution"    : "1024x768"
      },
      {
       "browserName"    : "Android",
       "os"             : "Android",
       "os_version"     : "4.1",
       "device"         : "Google Nexus 7",
       "deviceOrientation": "portrait"
      }
    ]

A full list of capabilities can be found here: https://www.browserstack.com/automate/capabilities

### Resources

http://mochajs.org/

http://docs.seleniumhq.org/docs/03_webdriver.jsp