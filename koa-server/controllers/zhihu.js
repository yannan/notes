const http = require('http');
const https = require('https');
const path = require('path');
const { URL } = require('url');

const getRequest = (_url) => {
	return new Promise(function(resolve, reject) {
		const myURL = new URL(_url);
		const option = {
			hostname: myURL.host,
			path: myURL.pathname,
			headers: {
				'Cookie': '_xsrf=Ob8uhFHMoG79UnoIwUV77tLs4eoL2gsL; path=/; domain=.zhihu.com; Expires=Sun, 27 Dec 2020 07:19:40 GMT;tgw_l7_route=29b95235203ffc15742abb84032d7e75; path=/; domain=.news-at.zhihu.com; Expires=Thu, 12 Jul 2018 09:20:04 GMT;'
			}
		}
		https.get(option, (res) => {
			  const { statusCode } = res;
			  const contentType = res.headers['content-type'];

			  let error;
			  if (statusCode === 301) {
			  	// getRequest(res.headers.location);
			  	console.log(res.headers);
			  } else if (statusCode !== 200) {
			    error = new Error('请求失败。\n' + `状态码: ${statusCode}`);
			  } else if (!/^application\/json/.test(contentType)) {
			    error = new Error('无效的 content-type.\n' + `期望 application/json 但获取的是 ${contentType}`);
			  }
			  if (error) {
			    console.error(error.message);
			    // 消耗响应数据以释放内存
			    res.resume();
			    reject(error.message)
			    return;
			  }

			  res.setEncoding('utf8');
			  let rawData = '';
			  res.on('data', (chunk) => { rawData += chunk; });
			  res.on('end', () => {
			    try {
			      let resData = JSON.parse(rawData);
			      resolve(resData)
			    } catch (e) {
			      reject(e.message)
			    }
			  });
			}).on('error', (e) => {
			  reject(`错误: ${e.message}`);
			});
	})
}

const getImg = (basename) => {
	return new Promise(function(resolve, reject) {
		const url = 'http://pic3.zhimg.com/' + basename;
		http.get(url, (res) => {
			  const { statusCode } = res;

			  let error;
			  if (statusCode !== 200) {
			    error = new Error('请求失败。\n' + `状态码: ${statusCode}`);
			  }
			  if (error) {
			    console.error(error.message);
			    // 消耗响应数据以释放内存
			    res.resume();
			    reject(error.message)
			    return;
			  }

			  res.setEncoding('binary');
			  let rawData = '';
			  res.on('data', (chunk) => { rawData += chunk; });
			  res.on('end', () => {
			    try {
			      resolve(rawData)
			    } catch (e) {
			      reject(e.message)
			    }
			  });
			}).on('error', (e) => {
			  reject(`错误: ${e.message}`);
			});
	})
}

module.exports = {
	'GET /api/zhihu/last-stories': async (ctx, next) => {
		try {
			let data = await getRequest('https://news-at.zhihu.com/api/4/news/latest');
			data.stories.forEach(story => {
				story.images.forEach((image, index, arr) => {
					arr[index] = 'http://' + ctx.host + '/api/zhihuImg/' + path.basename(image)
				})
			})
			ctx.rest({
				code: 200,
				data
			})
		} catch(e) {
			ctx.rest({
				code: 404,
				message: e
			})
		}
	},

	'GET /api/zhihuImg/:basename': async (ctx, next) => {
		try {
			const data = await getImg(ctx.params.basename);
			console.log(ctx.params.basename)
			ctx.type = 'image/jpeg';
			ctx.response.body = new Buffer(data, 'binary');
		} catch(e) {
			console.error(e)
		}
	}
}