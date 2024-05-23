/* eslint-disable func-names */
/*
 * @Author: lxc
 * @Date: 2019-05-27 10:54:43
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-13 16:13:16
 */
// 配置proxy代理
// eslint-disable-next-line import/no-extraneous-dependencies
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "http://192.168.60.228:3003",
      changeOrigin: true
      // pathRewrite: {
      //   "^/api": ""
      // }
    })
  );
};
