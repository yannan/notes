const puppeteer = require('puppeteer');
const CREDS = require('./creds');

const USERNAME_SELECTOR = '#login_field';
const PASSWORD_SELECTOR = '#password';
const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';
const USER_LIST_INFO_SELECTOR = '.user-list-item';
const USER_LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > a';
const USER_LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(2) > div.d-flex > div > ul > li:nth-child(2) > a';

const userToSearch = 'john';
const searchUrl = 'https://github.com/search?q=' + userToSearch + '&type=Users&utf8=%E2%9C%93';

async function run() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://github.com/login');
  // await page.screenshot({path: 'screenshots/github.png'});

  await page.click(USERNAME_SELECTOR);
  await page.type(USERNAME_SELECTOR, CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.type(PASSWORD_SELECTOR, CREDS.password);

  await page.click(BUTTON_SELECTOR);

  await page.waitForNavigation();
  await page.setViewport({width: 1200, height: 500});
  // await page.screenshot({path: 'screenshots/login.png'});

  await page.goto(searchUrl);
  await page.waitFor(2*1000);

  const users = await page.evaluate((sInfo, sName, sEmail) => {
    return Array.prototype.slice.apply(document.querySelectorAll(sInfo)).map($userListItem => {
      const username = $userListItem.querySelector(sName).innerText;
      const $email = $userListItem.querySelector(sEmail);
      const email = $email ? $email.innerText : undefined;

      return {
        username,
        email
      };
    }).filter(u => !!u.email);

  },USER_LIST_INFO_SELECTOR, USER_LIST_USERNAME_SELECTOR, USER_LIST_EMAIL_SELECTOR);

  console.log(users);

  browser.close();
}

run();
