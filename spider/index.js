const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const mongoose = require('mongoose');
const User = require('./models/user');

const USERNAME_SELECTOR = '#login_field';
const PASSWORD_SELECTOR = '#password';
const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';
const USER_LIST_INFO_SELECTOR = '.user-list-item';
const USER_LIST_USERNAME_SELECTOR = '.user-list-info > a';
const USER_LIST_EMAIL_SELECTOR = '.user-list-meta a.muted-link';

const userToSearch = 'john';
const searchUrl = 'https://github.com/search?q=' + userToSearch + '&type=Users&utf8=%E2%9C%93';

async function run() {
  const browser = await puppeteer.launch({});
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

  const numPages = await getNumPages(page);
  // console.log('numPages: ', numPages);

  for (let h = 1; h <= numPages; h++) {
    // 跳到指定页码
    await page.goto(`${searchUrl}&p=${h}`);
    // 执行爬取
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

    users.map(({username, email}) => {
      // TODO: 保存用户信息
      upsertUser({
        username: username,
        email: email,
        dateCrawled: new Date()
      });
      console.log(username, '->', email);
    });
  }

  // console.log(users);

  browser.close();
}

run();

// 获取页数
async function getNumPages(page) {
  const NUM_USER_SELECTOR = '.border-bottom > h3:nth-child(1)';

  let inner = await page.evaluate((sel) => {
    return document.querySelector(sel).innerHTML
  }, NUM_USER_SELECTOR);

  inner = inner.replace(',', '').replace(' users', '');
  const numUsers = parseInt(inner);
  console.log('numUsers: ', numUsers);

  const numPages = Math.ceil(numUsers / 10);
  return numPages;
}

//  更新数据库
function upsertUser(userObj) {
  const DB_URL = 'mongodb://45.76.66.135/thal';
  if (mongoose.connection.readyState == 0) {
    mongoose.connect(DB_URL);
  }

  // 如果邮箱存在，就更新实例，不新增
  const conditions = {
    email: userObj.email
  };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  User.findOneAndUpdate(conditions, userObj, options, (err, result) => {
    if (err) {
      throw err;
    }
  });
}
