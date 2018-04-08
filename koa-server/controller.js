const fs = require('fs');

function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST')) {
      // 如果url类似“POST xxx”
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      // 无效的url
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  var files = fs.readdirSync(__dirname + '/' + dir);
  // 过滤出.js文件
  var js_files = files.filter((f) => {
    return f.endsWith('.js');
  });

  for (var f of js_files) {
    console.log(`Process controller: ${f}...`);

    // 导入js文件
    var mapping = require(__dirname + '/' + dir + '/' + f);
    addMapping(router, mapping)
  }
}

function addUploadFile(router) {
    //文件上传
    const multer = require('koa-multer');
    //配置
    var storage = multer.diskStorage({
        //文件保存路径
        destination:function (req,file,cb) {
            cb(null, __dirname + '/static/images/uploads')
        },
        filename:function (req,file,cb){
            var fileFormat = (file.originalname).split(".");
            cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    })
    var upload = multer({storage:storage});
    //upload.single('file')这里面的file是上传空间的name<input type="file" name="file"/>
    router.post('/uploadFile',upload.single('file'),async (ctx,next) => {
        ctx.body = {
                filename: '/static/images/uploads/' + ctx.req.file.filename //返回文件名
        }
    })
    console.log(`register URL mapping: POST /uploadFile`);
}

module.exports = function (dir) {
  let
      controllers_dir = dir || 'controllers',
      router = require('koa-router')();

  addControllers(router, controllers_dir);
  addUploadFile(router);
  return router.routes();
}
