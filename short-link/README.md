# 短网址生成器

## 设计思路

服务端采用koa2,数据库采用MongoDB,前端展示采用vue框架。实现思路大致为：当通过api提交一个符合规范的url时，服务端先采用正则判断出是否是本系统生成的短链接，如果是就将此链接原样返回，否则的话就检索数据库，若数据库中已经有相关记录就将对应的短链接返回，若是一个新的链接，则通过规则生成一个新链接返回同时插入数据库。短链接生成规则为：通过实现一个自增的整型id,自增id通过查询数据长度得到，保证了短链接的不重复，根据此id从自定义的一个62位长度的字母数字组合中取出5位组成一个短链接的路径部分，类似于BASE64编码的转换。

## 数据库文档、API文档

Scheme：

字段          | 类型     | 描述
----------- | ------ | ----
originLink  | String | 原链接
shortLink   | String | 短链接
dateCrawled | Date   | 日期
id          | Number | 自增id

--------------------------------------------------------------------------------

API:

URL: host:port/api/url

请求方式: GET

参数: url

请求成功:

```
{
  "code": 200,
  "msg": "成功",
  "shortLink": "http://yannan.xyz/aaaaa"
}
```

请求失败:

```
{
  "code": 400,
  "msg": "参数错误"
}
```

请求示例:

```
curl host:port/api/url?url=http://www.baidu.com
```

## 运行

服务端npm install&&npm start,运行在3000端口

客户端开发环境npm install&&npm run dev将运行在8087端口,npm run build将打包后可放到服务器目录

## 示例地址

<http://short.yannan.xyz>
