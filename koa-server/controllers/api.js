const mongoose = require('mongoose');
const Info = mongoose.model('Info');
const News = mongoose.model('News');
const Blog = mongoose.model('Blog');
const {getInfo, getNews, getBlog} = require('../dbhelper/infoHelper');

const APIError = require('../rest').APIError;

module.exports = {
  // 'GET /api/sf/:size/:page': async (ctx, next) => {
  //   console.log(ctx.params.size);
  //   console.log(ctx.params.page);
  //   var info= await infoHelper(parseInt(ctx.params.size), parseInt(ctx.params.page));

  //   ctx.rest({
  //     info: info
  //   })
  // },

  'GET /api/sf/query': async (ctx, next) => {
    // console.log(ctx.request.query.size, ctx.request.query.page);
    var info = await getInfo(parseInt(ctx.request.query.size), parseInt(ctx.request.query.page));

    if (!ctx.request.query.size || !ctx.request.query.page) {
      ctx.rest({
        code: 1000001,
        msg: '参数错误'
      })
    } else {
      ctx.rest({
        info: info
      })
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
      ctx.rest({
        news: news
      })
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
      ctx.rest({
        blog: blog
      })
    }
  }
};
