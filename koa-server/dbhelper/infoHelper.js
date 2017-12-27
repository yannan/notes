const mongoose = require('mongoose');
const Info = mongoose.model('Info');
const News = mongoose.model('News');
const Blog = mongoose.model('Blog');

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

var getNews = async (size, page) => {
  var query = News.find({}).limit(size).skip(size * page - 10).sort({ _id: -1 });
  var res = [];
  await query.exec(function(err, news) {
    if (err) {
      res = [];
    } else {
      res = news;
    }
  })

  return res;
}

var getBlog = async (size, page) => {
  var query = Blog.find({}).limit(size).skip(size * page - 10).sort({ _id: -1 });
  var res = [];
  await query.exec(function(err, blog) {
    if (err) {
      res = [];
    } else {
      res = blog;
    }
  })

  return res;
}

module.exports = {
  getInfo,
  getNews,
  getBlog
}
