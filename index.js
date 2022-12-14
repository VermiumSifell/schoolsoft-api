const { Builder, By, Browser, until } = require("selenium-webdriver");

const { username, password } = require("./config.json");

const getLunches = async (username, password) => {
  //   let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  const firefox = require("selenium-webdriver/firefox");
  const { Builder, By, Key, until } = require("selenium-webdriver");

  let driver = new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(new firefox.Options().headless())
    // .setFirefoxOptions(new firefox.Options())
    .build();

  //   const banan = () => {
  //     driver
  //       .navigate()
  //       .to(
  //         "https://sms.schoolsoft.se/nti/jsp/student/right_student_lunchmenu.jsp?menu=lunchmenu"
  //       );
  //     console.log("hejhej");
  //   };
  try {
    // Go to login page
    console.log("Go to login page");
    await driver.get("https://sms.schoolsoft.se/nti/sso");

    // Fill in username
    let usernameField = driver.findElement(By.id("username"));
    await usernameField.sendKeys(username).then(async () => {
      console.log("Filled in username");
    });

    // Fill in password
    let passwordField = driver.findElement(By.id("password"));
    await passwordField.sendKeys(password).then(async () => {
      console.log("Filled in password");
    });

    // Login to site
    let loginButton = driver.findElement(
      By.className("form__button form__button--primary")
    );
    await loginButton.click().then(async () => {
      console.log("Pressed login button");
    });

    // Go to lunch page
    await driver
      .wait(until.elementLocated(By.id("menu_lunchmenu")), 10000)
      .then(async (element) => {
        console.log("Found lunch menu in sidebar");
        element.click();
      });

    // Get lunches
    return await driver
      .wait(until.elementLocated(By.id("lunchmenu_con_content")), 10000)
      .then(async (element) => {
        console.log("Got lunches");
        return element.getText();
      });
  } finally {
    // Close browser
    driver.quit();
  }
};

(async () => {
  const result = await getLunches(username, password);
  console.log(result);
})();
