const Crawler = require("crawler");
// 导入文件模块
const fs = require('fs');
// 导入path模块
const path = require('path')

// 请求页面
const cPage = new Crawler({
  maxConnections: 10,
  callback: function (error, res, done) {
    if (error) {
      console.log(error.message);
    } else {
      var $ = res.$;
      // $ is like Jquery
      // 定义空数组保存图片
      let imgArr = []
      // 获取图片
      $('.item_country').each((index, e) => {
        let src = $(e).find('img').attr('src')
        imgArr.push(src)
      })
      // 去获取对应的图片
      imgArr.forEach(uri => {
        cFile.queue({
          uri: `https://www.countryflags.io${uri}`,
          filename: path.resolve(__dirname, "./flags", `${uri.substring(1, 3)}.png`)
        })
      })
    }
    done();
  }
});

// 下载文件
const cFile = new Crawler({
  encoding: null,
  jQuery: false,
  // set false to suppress warning message.
  callback: function (err, res, done) {
    if (err) {
      console.log(err.message);
    } else {
      // 保存图片
      fs.createWriteStream(res.options.filename).write(res.body);
      console.log('finish:' + res.options.filename)
    }

    done();
  }
});

cPage.queue('https://www.countryflags.io')