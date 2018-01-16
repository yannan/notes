const mongoose = require('mongoose');
const Link = require('../models/model');

const MAP = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
				'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
				'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
				'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
				'U', 'V', 'W', 'X', 'Y', 'Z','0', '1', '2', '3', '4', '5', '6', '7',
        				'8', '9']

function generateUrl(index) {
	let shortUrl = ''
  let i =0
	while (i<6) {
		var remainder = index % 62;
		shortUrl += MAP[remainder]
		index = parseInt(index / 62);
		i++
	}
	return shortUrl.toString();
}

var getUrl = async (url) => {
  var res = await Link.findOne({shortLink: url})

  return res
}

var setUrl = async (url) => {

  var res = ''

  var count = await Link.count({})

  var query = await Link.findOne({originLink: url})

  var newRecord = new Link({
    originLink: url,
    id: count,
    shortLink: generateUrl(count)
  });

  if (query) {
    res = query
  } else {
    res = await newRecord.save()
  }

  return res.shortLink

}


module.exports = {
  getUrl,
  setUrl
}
