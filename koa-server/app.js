const mongoose = require('mongoose');
const DB_URL = 'mongodb://45.76.66.135/segmentfault';
var conn = mongoose.connect(DB_URL);

const Info = require('./models/info');

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

const bodyparser = require('koa-bodyparser');

// 导入controller middleware
const controller = require('./controller');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
app.use(bodyparser());

// log request URL
app.use(async (ctx, next) => {
  console.log(`Progress ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// add router middleware
app.use(controller());

// 在端口3000监听:
app.listen(3008);
console.log('app started at port 3008...');
