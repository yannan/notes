/*
  文件服务器
 */
'use strict';

var fs = require('fs');
var url = require('url');
var http = require('http');
var path = require('path');

// 从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir:' + root);

// 创建服务器
var server = http.createServer(function(request, response) {
  // 获得url的path
  var pathname = url.parse(request.url).pathname;
  // 获取对应的本地文件路径
  var filepath = path.join(root, pathname);
  fileServer(filepath, request, response);
});

/**
 * [description]
 * @method
 * @param  {[String]} filepath [文件路径]
 * @param  {[Object]} request  [server request]
 * @param  {[Object]} response [server response]
 * @return {[undefined]}          [无]
 */
var fileServer = function(filepath, request, response) {
  // 获取文件状态
  fs.stat(filepath, function(err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错且文件存在
      console.log('200' + request.url);
      // 发送200响应
      response.writeHead(200);
      // 将文件流导向response
      fs.createReadStream(filepath, 'utf-8').pipe(response);
    } else if (!err && stats.isDirectory()) {
      console.log('directory!');
      var filepath1 = filepath + '/index.html';
      var filepath2 = filepath + '/default.html';
      fileServer(filepath1, request, response);
      // fileServer(filepath2, request, response);
    } else {
      // 出错了或者文件不存在
      console.log('404' + request.url);
      response.writeHead(404);
      response.end('404 not found');
    }
  })
}

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');
