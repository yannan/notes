const mongoose = require('mongoose');
const {Link, Info, News, Blog, Nav} = require('../models/info');

const MAP = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
				'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
				'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
				'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
				'U', 'V', 'W', 'X', 'Y', 'Z','0', '1', '2', '3', '4', '5', '6', '7',
        				'8', '9']

function generateUrl(index) {
	let shortUrl = ''
  let i =0
	while (i<5) {
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

	console.log(Link)

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

var getInfo = async (size, page) => {
  var query = Info.find({}).limit(size).skip(size * page - size).sort({ _id: -1 });
	var countQuery = Info.find({}).count()
  var data = [];
	var total = 0;
  await query.exec(function(err, res) {
    if (err) {
      data = [];
    } else {
      data = res;
    }
  })
	await countQuery.exec(function(err, res) {
		if (err) {

    } else {
      total = res
    }
	})

  return {
		data,
		total
	}
}

var getNews = async (size, page) => {
  var query = News.find({}).limit(size).skip(size * page - 10).sort({ _id: -1 });
	var countQuery = News.find({}).count()
  var data = [];
	var total = 0;
  await query.exec(function(err, res) {
    if (err) {
      data = [];
    } else {
      data = res;
    }
  })
	await countQuery.exec(function(err, res) {
		if (err) {

    } else {
      total = res
    }
	})

  return {
		data,
		total
	}
}

var getBlog = async (size, page) => {
  var query = Blog.find({}).limit(size).skip(size * page - 10).sort({ _id: -1 });
	var countQuery = Blog.find({}).count()
  var data = [];
	var total = 0;
  await query.exec(function(err, res) {
    if (err) {
      data = [];
    } else {
      data = res;
    }
  })
	await countQuery.exec(function(err, res) {
		if (err) {

    } else {
      total = res
    }
	})

  return {
		data,
		total
	}
}

var getNav = async () => {
  var query = Blog.find({}).sort({ _id: -1 });
	var countQuery = Blog.find({}).count()
  var data = [];
	var total = 0;
  await query.exec(function(err, res) {
    if (err) {
      data = [];
    } else {
      data = res;
    }
  })
	await countQuery.exec(function(err, res) {
		if (err) {

    } else {
      total = res
    }
	})

  return {
		data,
		total
	}
}

var setNav = async (url, imgUrl) => {

  var res = ''

  var count = await Nav.count({})

  var query = await Nav.findOne({url: url})

  var newRecord = new Nav({
    url: url,
    imgUrl: imgUrl
  });

  res = await newRecord.save()

  return res

}

module.exports = {
  getInfo,
  getNews,
  getBlog,
	getUrl,
  setUrl,
	getNav,
	setNav
}
