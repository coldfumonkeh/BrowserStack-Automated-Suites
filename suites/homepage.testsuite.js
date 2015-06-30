/*
 * Test Suite for homepage regression testing
 */

module.exports = function(driver, webdriver) {

  describe('Homepage header menu', function() {

    it('should link from the Berkeley Group logo back to the homepage', function() {
      driver.get('http://www.berkeleygroup.co.uk/');
      'New Homes & Property Development - Designed for Life | Berkeley Group' === driver.getTitle();
      var logo = driver.findElement(webdriver.By.className('logo'));
      var link = logo.getAttribute('href');
      'http://www.berkeleygroup.co.uk/' === link;
    });

    it('should link from the myHome logo to MyHome with sign in showing', function() {
      driver.get('http://www.berkeleygroup.co.uk/');
      driver.findElement(webdriver.By.id('myHomeToggleLink')).click();
      driver.wait(function() {
        return driver.getTitle().then(function(title) {
          driver.findElement(webdriver.By.className('signin_plus')).isDisplayed() === true;
          return 'Create account/Sign in | Berkeley Group' === title;
        });
      }, 1000);
    });

  });

}
