const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Info = require('./models/info');
var schedule = require('node-schedule');

const NEWS_TITLE = '.news__item-title a';
const NEWS_ITEM = '.news__item';
const NEWS_TYPE = '.news__item-meta > a.ml10';
const hostName = 'https://segmentfault.com/news/newest';

async function sfSpider() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto('https://segmentfault.com/news/newest');
  // await page.screenshot({path: 'screenshots/segmentfault.png'});

  for (let h = 1; h < 10; h++) {
    await page.goto(`${hostName}?page=${h}`);

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
      });
    });

    console.log(info);
  }

  browser.close();
}
sfSpider();
// scheduleCronstyle();

// 定时任务
function scheduleCronstyle () {
  schedule.scheduleJob('30 30 * * * *', function () {
    sfSpider();
  })
}

//  更新数据库
function upsertInfo(infoObj) {
  const DB_URL = 'mongodb://45.76.66.135/segmentfault';
  if (mongoose.connection.readyState == 0) {
    mongoose.connect(DB_URL);
  }

  // 如果文章存在，就更新实例，不新增
  const conditions = {
    title: infoObj.title
  };
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  Info.findOneAndUpdate(conditions, infoObj, options, (err, result) => {
    if (err) {
      throw err;
    }
  });
}
