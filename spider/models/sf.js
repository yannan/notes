const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  title: String,
  link: String,
  type: String,
  dateCrawled: Date
});

const newsSchema = new mongoose.Schema({
  title: String,
  link: String,
  type: String,
  dateCrawled: Date
});

const blogSchema = new mongoose.Schema({
  title: String,
  link: String,
  type: String,
  dateCrawled: Date
});

module.exports = {
  'info': mongoose.model('Info', infoSchema),
  'news': mongoose.model('News', infoSchema),
  'blog': mongoose.model('Blog', infoSchema)
};
