const mongoose = require('mongoose');
const Link = mongoose.model('Link');
const {getUrl, setUrl} = require('../dbHelper/helper');

const APIError = require('../rest').APIError;

module.exports = {
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
    } else if (url.indexOf('http://' + ctx.request.host) === 0) {
      ctx.rest({
        code: 200,
        msg: '成功',
        shortLink: url
      })
    } else {
      let res = await setUrl(url)
      let short = 'http://' + ctx.request.host + '/' + res
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
};
