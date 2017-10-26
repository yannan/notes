/*
HTTP服务器
 */

'use strict';

// 导入http模块
const http = require('http');

// 创建http server, 并传入回调函数
var server = http.createServer(function(request, response) {
  /*
    回调函数接收request和response参数，
    获得HTTP请求的method和url
   */
  console.log(request.method + ':' + request.url);
  // 将HTTP响应200写入response，同时设置Content-type
  response.writeHead(200, {'Content-type': 'text/html'});
  // 将HTTP响应的HTML内容写入response
  response.end('<h1>Hello World!</h1>');
});

// 让服务器监听8080端口
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
