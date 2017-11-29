const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  title: String,
  link: String,
  dateCrawled: Date
});

module.exports = mongoose.model('Info', infoSchema);
