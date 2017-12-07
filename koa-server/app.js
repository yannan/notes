const mongoose = require('mongoose');
const DB_URL = 'mongodb://45.76.66.135/segmentfault';
var conn = mongoose.connect(DB_URL);

const Info = require('./models/info');

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

const bodyparser = require('koa-bodyparser');

// 导入controller middleware
const controller = require('./controller');

// 导入模版
const templating = require('./templating');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// log request URL
app.use(async (ctx, next) => {
  console.log(`Progress ${ctx.request.method} ${ctx.request.url}...`);
  var
      start = new Date().getTime(),
      execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support
if (! isProduction) {
  // 导入静态文件处理函数
  let staticFiles = require('./static-files');
  app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body
app.use(bodyparser());

// add nunjucks as view:
app.use(templating('views', {
  noCache: !isProduction,
  watch: !isProduction
}));

// add router middleware
app.use(controller());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
