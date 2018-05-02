const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const sf = require('./models/sf');
const schedule = require('node-schedule');

const NEWS_TITLE = '.news__item-title a';
const NEWS_ITEM = '.news__item';
const NEWS_TYPE = '.news__item-meta > a.ml10';
const hostName = 'https://segmentfault.com/news';

const DB_URL = 'mongodb://45.76.66.135:52222/segmentfault';
if (mongoose.connection.readyState == 0) {
  mongoose.connect(DB_URL);
}

let db = mongoose.connection;

scheduleCronstyle(sf);
// sfSpider(sf);

async function sfSpider(collection) {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 200,
    ignoreHTTPSErrors: true,
    timeout: 10000
  });
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  try {
    const page = await browser.newPage();
    // await page.goto(hostName);
    let urlInfo = `${hostName}/newest`;
    await page.goto(urlInfo);

    // await page.screenshot({path: 'screenshots/segmentfault.png'});
    await sfTaskLoop(page, urlInfo, collection.info);

    // await page.goto(hostName);
    // await sfTaskLoop(page, hostName, collection.news);

    await browser.close();
    db.close();
  } catch (err) {
    console.log(err);
    await browser.close();
    db.close();
  } finally {
    process.exit(0);
  }
}

// 循环爬取
async function sfTaskLoop (page, url, collection) {

  // console.log(collection);
  for (let h = 1; h < 10; h++) {
    await page.goto(`${url}?page=${h}`);

    const info = await page.evaluate((sItem, sTitle, sType) => {
      return Array.prototype.slice.apply(document.querySelectorAll(sItem)).map($infoItem => {
        const title = $infoItem.querySelector(sTitle).innerText;
        const link = $infoItem.querySelector(sTitle).href;
        const type = $infoItem.querySelector(sType).innerText;

        return {
          title,
          link,
          type
        };
      });
    }, NEWS_ITEM, NEWS_TITLE, NEWS_TYPE);

    info.map(({title, link, type}) => {
      upsertInfo({
        title: title,
        link: link,
        type: type,
        dateCrawled: new Date()
      }, collection);
    });

    console.log(info);
  }
}

// 定时任务
function scheduleCronstyle (collection) {
  schedule.scheduleJob('* */10 * * * *', function () {
    sfSpider(collection);
  })
}

//  更新数据库
function upsertInfo(infoObj, collection) {

  // 如果文章存在，就更新实例，不新增
  const conditions = {
    title: infoObj.title
  };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  collection.findOneAndUpdate(conditions, infoObj, options, (err, result) => {
    if (err) {
      throw err;
    } else {
      // console.log(result)
    }
  });
}
