const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  originLink: String,
  shortLink: String,
  dateCrawled: Date,
  id: CountedId
});

module.exports =  mongoose.model('Link', linkSchema)
