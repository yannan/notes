const mongoose = require('mongoose');
const Info = mongoose.model('Info');

var getInfo = async () => {
  var query = Info.find({}, null, {limit: 20});
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
