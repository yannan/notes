const mongoose = require('mongoose');

const poetrySchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String
});

module.exports = mongoose.model('Poetry', poetrySchema);
