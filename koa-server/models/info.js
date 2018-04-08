const mongoose = require('mongoose');

let counter = 1;
let CountedId = {type: Number, default: () => counter++};

const linkSchema = new mongoose.Schema({
  originLink: String,
  shortLink: String,
  dateCrawled: Date,
  id: CountedId
});

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

const navSchema = new mongoose.Schema({
  url: String,
  imgUrl: String,
  type: String,
  dateCrawled: Date
});

module.exports = {
  'Link': mongoose.model('Link', linkSchema),
  'Info': mongoose.model('Info', infoSchema),
  'News': mongoose.model('News', newsSchema),
  'Blog': mongoose.model('Blog', blogSchema),
  'Nav': mongoose.model('Nav', navSchema)
};
