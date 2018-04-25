const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const fs = require('fs');
const {juejin} = require('./models/juejin');

async function jjSpider(collection) {
  const browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();

  let url = 'https://juejin.im/welcome/frontend';

  const DB_URL = 'mongodb://45.76.66.135:52222/segmentfault';
  if (mongoose.connection.readyState == 0) {
    mongoose.connect(DB_URL);
  }

  let db = mongoose.connection;

  await page.goto(url);

  await autoScroll(page);

  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('.entry-link .title'));
    return anchors.map(item => {
      const title = item.innerText;
      const link = item.href;
      return {
        title,
        link
      }
    })
  });

  await browser.close();

  try {
    let fileString = ''
    console.log('~~~~~~~~正在写入数据库~~~~~~~~');
    for (let {title, link} of links) {
      fileString += `title: ${title}, link: ${link} \n`
      await upsertData({
        title: title,
        link: link,
        dataCrawled: new Date()
      }, collection);
    }
    console.log('~~~~~~~~写入数据库完成~~~~~~~~');
    db.close();
    console.log('-----------------------------')
    console.log('~~~~~~~~正在写入本地文件~~~~~~~~');
    const fileData = await readFile('output2.txt');
    await saveFile('output2.txt', fileData.toString() + fileString);
    console.log('~~~~~~~~写入本地文件完成~~~~~~~~');
  } catch (err) {
    console.log(err)
  }
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, res) => {
      if (err) return reject(err);
      resolve(res)
    })
  })
}

function saveFile(filePath, fileData) {
  return new Promise((resolve, reject) => {
    const wstream = fs.createWriteStream(filePath);

    wstream.on('open', () => {
      const blockSize = 128;
      const nbBlocks = Math.ceil(fileData.length / blockSize);
      for (let i = 0; i < nbBlocks; i++) {
        const currentBlock = fileData.slice(
          blockSize * i,
          Math.min(blockSize * (i + 1), fileData.length)
        );
        wstream.write(currentBlock);
      }

      wstream.end();
    });

    wstream.on('error', (err) => {
      reject(err);
    });

    wstream.on('finish', () => {
      resolve(true);
    });
  });
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

async function autoScroll(page) {
  await page.evaluate(async() => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 300;
      let timeTotal = 0;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        timeTotal += 100;

        if (scrollHeight >= distance * 1000 || timeTotal >= 100 * 1000) {
          clearInterval(timer);
          resolve()
        }
      }, 100);
    });
  });
}

jjSpider(juejin);
