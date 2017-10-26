/*
写入流
 */
'use strict';

const fs = require('fs');

var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入测试数据...\n');
ws1.write('不断写入数据...\n');
ws1.write('END');
ws1.end();

var ws2 = fs.createWriteStream('output2.txt', 'utf-8');
ws2.write(new Buffer('使用Stream写入测试数据...\n', 'utf-8'));
ws2.write(new Buffer('不断写入数据...\n', 'utf-8'));
ws2.write(new Buffer('END', 'utf-8'));
ws2.end();
