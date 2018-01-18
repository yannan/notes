const mongoose = require('mongoose');

let counter = 1;
let CountedId = {type: Number, default: () => counter++};

const linkSchema = new mongoose.Schema({
  originLink: String,
  shortLink: String,
  dateCrawled: Date,
  id: CountedId
});

module.exports =  mongoose.model('Link', linkSchema)
