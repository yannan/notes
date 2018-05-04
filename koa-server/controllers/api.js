const mongoose = require('mongoose');
const Info = mongoose.model('Info');
const News = mongoose.model('News');
const Blog = mongoose.model('Blog');
const Link = mongoose.model('Link');
const Nav = mongoose.model('Nav');
const Poetry = mongoose.model('Poetry');
const Juejin = mongoose.model('Juejin');
const {getInfo, getNews, getBlog, getJJ, getUrl, setUrl, getNav, setNav, deleteNav} = require('../dbhelper/infoHelper');
const getPoetry = require('../dbhelper/poetryHelper')

const APIError = require('../rest').APIError;

function setStatus(obj) {
  if (typeof obj === 'object') {
    obj.code = 200;
    obj.msg = '成功';
  }
  return obj;
}

module.exports = {
  // 'GET /api/sf/:size/:page': async (ctx, next) => {
  //   console.log(ctx.params.size);
  //   console.log(ctx.params.page);
  //   var info= await infoHelper(parseInt(ctx.params.size), parseInt(ctx.params.page));

  //   ctx.rest({
  //     info: info
  //   })
  // },
  'GET /api/poetry': async (ctx, next) => {
    try {
      let data = await getPoetry();
      ctx.rest(setStatus(data))
    } catch(err) {
      console.error(err);
      ctx.rest({
        code: 1000001,
        msg: err
      })
    }
  },

  'GET /api/sf/query': async (ctx, next) => {
    // console.log(ctx.request.query.size, ctx.request.query.page);
    var info = await getInfo(parseInt(ctx.request.query.size), parseInt(ctx.request.query.page));

    if (!ctx.request.query.size || !ctx.request.query.page) {
      ctx.rest({
        code: 1000001,
        msg: '参数错误'
      })
    } else {
      ctx.rest(setStatus(info))
    }
  },

  'GET /api/news/query': async (ctx, next) => {
    // console.log(ctx.request.query.size, ctx.request.query.page);
    var news = await getNews(parseInt(ctx.request.query.size), parseInt(ctx.request.query.page));

    if (!ctx.request.query.size || !ctx.request.query.page) {
      ctx.rest({
        code: 1000001,
        msg: '参数错误'
      })
    } else {
      ctx.rest(setStatus(news))
    }
  },

  'GET /api/blog/query': async (ctx, next) => {
    // console.log(ctx.request.query.size, ctx.request.query.page);
    var blog = await getBlog(parseInt(ctx.request.query.size), parseInt(ctx.request.query.page));

    if (!ctx.request.query.size || !ctx.request.query.page) {
      ctx.rest({
        code: 1000001,
        msg: '参数错误'
      })
    } else {
      ctx.rest(setStatus(blog))
    }
  },

  'GET /api/jj/query': async (ctx, next) => {
    // console.log(ctx.request.query.size, ctx.request.query.page);
    var data = await getJJ(parseInt(ctx.request.query.size), parseInt(ctx.request.query.page));

    if (!ctx.request.query.size || !ctx.request.query.page) {
      ctx.rest({
        code: 1000001,
        msg: '参数错误'
      })
    } else {
      ctx.rest(setStatus(data))
    }
  },

  'GET /api/url': async (ctx, next) => {
    // console.log(ctx.request.query.size, ctx.request.query.page);
    let reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
    let url = ctx.request.query.url

    if (!url) {
      ctx.rest({
        code: 400,
        msg: '参数错误'
      })
    } else if (!reg.test(url)) {
      ctx.rest({
        code: 400,
        msg: 'url格式错误'
      })
    // } else if (url.indexOf('http://' + ctx.request.host) === 0) {
    } else if (url.indexOf('http://yannan.xyz/') === 0) {
      ctx.rest({
        code: 200,
        msg: '成功',
        shortLink: url
      })
    } else {
      let res = await setUrl(url)
      // let short = 'http://' + ctx.request.host + '/' + res
      let short = 'http://yannan.xyz/' + res  // 部署到线上域名
      ctx.rest({
        code: 200,
        msg: '成功',
        shortLink: short
      })
    }
  },

  'GET /:url': async (ctx, next) => {
    // console.log(ctx.request.query.size, ctx.request.query.page);
    let data = await getUrl(ctx.params.url);

    if (!data) {
      ctx.response.status = 404
      ctx.body = '404 not found'
    } else {
      ctx.response.status = 302
      ctx.redirect(data.originLink)
      // ctx.rest({
      //   code: 200,
      //   status: 'success',
      //   data: data.originLink
      // })
    }
  },

  'GET /api/addnav': async (ctx, next) => {
    // console.log(ctx.request.query.size, ctx.request.query.page);
    let url = ctx.request.query.url || ''
    let imgUrl = ctx.request.query.imgUrl || ''
    let title = ctx.request.query.title || ''

    console.log(url, imgUrl, title)

    let res = await setNav(url, imgUrl, title)

    ctx.rest({
      code: 200,
      msg: '成功',
      data: res.data
    })
  },

  'GET /api/navlist': async (ctx, next) => {

    let res = await getNav()

    ctx.rest({
      code: 200,
      msg: '成功',
      data: res.data
    })
  },

  'GET /api/delnav': async (ctx, next) => {
    let id = ctx.request.query.id || ''

    let res = await deleteNav(id)

    ctx.rest({
      code: 200,
      msg: '成功',
      data: res
    })
  }
};
