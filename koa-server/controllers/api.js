const mongoose = require('mongoose');
const Info = mongoose.model('Info');
const infoHelper = require('../dbhelper/infoHelper');

const APIError = require('../rest').APIError;

module.exports = {
  'GET /api/sf/:num': async (ctx, next) => {
    console.log(ctx.params.num);
    var info= await infoHelper(parseInt(ctx.params.num));

    ctx.rest({
      info: info
    })
  }
};
