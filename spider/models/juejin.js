const mongoose = require('mongoose');

const juejinSchema = new mongoose.Schema({
  title: String,
  link: String,
  dateCrawled: Date
});

module.exports = {
  'juejin': mongoose.model('Juejin', juejinSchema)
};
