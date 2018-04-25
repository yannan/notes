const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const poetry = require('./models/poetry');
const hostName = 'https://www.gushiwen.org/shiwen/default_0A0A';
const nodeItem = '.left .sons .cont';
const nodeTitle = 'b';
const nodeAuthor = '.source';
const nodeCon = '.contson';

(async() => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 200,
    ignoreHTTPSErrors: true,
    timeout: 10000
  });
  const DB_URL = 'mongodb://45.76.66.135:52222/database';
  if (mongoose.connection.readyState == 0) {
    mongoose.connect(DB_URL);
  }
  let db = mongoose.connection;

  try {
    const page = await browser.newPage();
    // await page.goto(hostName);
    await taskLoop(page, poetry);
    await browser.close();
    db.close()
  } catch (err) {
    console.log(err);
    await browser.close();
    db.close();
  } finally {
    // process.exit(0);
  }
})();

// 循环爬取
async function taskLoop(page, collection) {
  let pageTag = true;
  let pageNum = 1;
  while (pageTag) {
    await page.goto(`${hostName}${pageNum}.aspx`);
    console.log(`正在访问第${pageNum}页`);
    pageNum++;
    const info = await page.evaluate((nItem, nTitle, nAuthor, nCon) => {
      const nodeList = Array.from(document.querySelectorAll(nItem));
      if (nodeList.length === 0) {
        pageTag = false;
        return
      }
      return nodeList.map($item => {
        const title = $item.querySelector(nTitle).innerText;
        const author = $item.querySelector(nAuthor).innerText;
        const content = $item.querySelector(nCon).innerText;

        return {
          title,
          author,
          content
        }
      })
    }, nodeItem, nodeTitle, nodeAuthor, nodeCon);

    for (let {title, author, content} of info) {
      await upsertData({
        title: title,
        author: author,
        content: content
      }, collection);
    }
  }
}

//  更新数据库
function upsertData(dataObj, collection) {
  return new Promise((resolve, reject) => {
    const conditions = {
      title: dataObj.title
    };
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    };

    collection.findOneAndUpdate(conditions, dataObj, options, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
