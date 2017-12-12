const mongoose = require('mongoose');
const Info = mongoose.model('Info');

var getInfo = async (num) => {
  var query = Info.find({}).limit(num).sort({ _id: -1 });
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
