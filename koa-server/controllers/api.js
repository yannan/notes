const mongoose = require('mongoose');
const Info = mongoose.model('Info');
const infoHelper = require('../dbhelper/infoHelper');

const APIError = require('../rest').APIError;

module.exports = {
  'GET /api/sf': async (ctx, next) => {
    var info= await infoHelper();
  
    // ctx.body = {
    //   code: 200,
    //   success: true,
    //   data
    // }

    ctx.rest({
      info: info
    })
  }
};
