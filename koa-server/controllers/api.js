const mongoose = require('mongoose');
const Info = mongoose.model('Info');

const infoHelper = require('../dbhelper/infoHelper');


var fn_api = async (ctx, next) => {
  var data = await infoHelper();

  ctx.body = {
    code: 200,
    success: true,
    data
  }
};

module.exports = {
  'GET /api': fn_api
};
