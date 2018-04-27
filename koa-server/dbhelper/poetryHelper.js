const mongoose = require('mongoose');

const Poetry = require('../models/poetry');

const getPoetry = async () => {
  var query = Poetry.find({}).limit(1).skip(parseInt(Math.random(0, 1)* 10000));

  return new Promise((resolve, reject) => {
    query.exec((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

module.exports = getPoetry
