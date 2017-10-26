// pipe()方法实现文件的复制
'use strict';

const fs = require('fs');

const rs = fs.createReadStream('sample.txt');
const ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);
