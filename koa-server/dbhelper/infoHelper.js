const mongoose = require('mongoose');
const Info = mongoose.model('Info');

var getInfo = async (size, page) => {
  var query = Info.find({}).limit(size).skip(size * page - 10).sort({ _id: -1 });
  var res = [];
  await query.exec(function(err, infos) {
    if (err) {
      res = [];
    } else {
      res = infos;
    }
  })

  return res;
}

module.exports = getInfo
