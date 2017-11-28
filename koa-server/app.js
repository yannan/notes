// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// require('koa-router')返回的是函数
const router = require('koa-router')();

const bodyparser = require('koa-bodyparser');
const mongoose = require('mongoose');
const User = require('./models/user');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
app.use(bodyparser());

let obj;
findUser();
// log request URL
app.use(async (ctx, next) => {
  console.log(`Progress ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// add url-router
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
  var
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
      ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
      ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
})

router.get('/api', async (ctx, next) => {
  ctx.response.body = global.obj.map(item => {
    return item
  });
});

// add router middleware
app.use(router.routes());

// 在端口3000监听:
app.listen(3008);
console.log('app started at port 3008...');

//  读取数据库
function findUser(obj) {
  const DB_URL = 'mongodb://45.76.66.135/thal';
  if (mongoose.connection.readyState == 0) {
    mongoose.connect(DB_URL);
  }

  User.find({}, (err, result) => {
    if (err) {
      throw err;
    } else {
      global.obj = result;
    }
  });
}
