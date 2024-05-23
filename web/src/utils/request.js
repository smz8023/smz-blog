/* eslint-disable camelcase */
/* eslint-disable import/no-mutable-exports */
/*
 * @Author: lxc
 * @Date: 2019-05-15 11:53:05
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-05 17:41:22
 */
import { message } from "antd";
import axios from "axios";
import { getCookie, deleteCookie } from "@utils/cookie";
import { z_event } from "@utils/event.js";
import { BrowserRouter as Router } from "react-router-dom";
import { copySync } from "fs-extra";
const { CancelToken } = axios;
let cancel;
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  304: "已经执行了GET，但文件未变化",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  402: "参数失败",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

// 请求拦截
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

axios.interceptors.request.use(
  config => {
    const token = getCookie("token");
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token;
    }
    return config;
  },
  err => Promise.reject(err)
);
// 配置响应拦截器
axios.interceptors.response.use(
  response =>
    // response.status === 200 ? message.success(codeMessage[200]) :  message.success('返回数据失败');
    response.status < 500 && Promise.resolve(response),
  error => {
    // 不同的状态码显示不同的消息
    if (error.response && error.response.status === 400) {
      // console.log('error',error.response.data)
      // message.destroy();
      message.error(error.response.data.msg[0]);
      return Promise.reject()
    }
    if (error.response && error.response.status === 401) {
      z_event.emit("token", false);
      message.destroy();
      // console.log('error.response',error.response)
      message.error(error.response.data.msg[0]);

      setTimeout(()=>{
        window.location.href = '/login'
      },300);
  
      return Promise.reject()
      // window.history.pushState({},'','/login')
  
    }
    // if (error.response && error.response.status > 404) {
    //   message.destroy();
    //   message.error(codeMessage[error.response.status]);
    // }
    // if (error.response && error.response.status == 413) {
    //   message.destroy();
    //   message.error("文件过大");
    // }
    console.log(error.response);
    if (error.code === "ECONNABORTED") {
      message.destroy();
      message.error("请求超时");
    } else {
      message.destroy();

      // message.error(error.response.msg || "请求错误,请重试");
    }
    return Promise.reject(error);
  }
);

function apiAxios(method, url, params, Callback = () => {}) {
  const httpDefault = {
    method,
    // baseURL: 'http://caster.yitu-inc.com/mock/760',
    url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === "GET" || method === "DELETE" ? params : null,
    data: method === "POST" || method === "PUT" ? params : null,
    // timeout: 15000,
    withCredentials: true,
    ContentType: "multipart/form-data",
    // eslint-disable-next-line no-undef
    cancelToken: new CancelToken(c => {
      // 这个executor 函数接受一个cancel function作为参数
      // eslint-disable-next-line no-undef
      cancel = c;
    })
  };

  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      // 此处的.then属于axios
      .then(res => {
        if (res && res.status === 200) {
          z_event.emit("lodingclose", false, 0);
        }
        // eslint-disable-next-line no-undef
        Callback(res);
        resolve(res);
      })
      .catch(err => {
        // eslint-disable-next-line no-undef
        z_event.emit("lodingclose", false, 0);
        // message.error(codeMessage[err.response.status]);
        reject(err);
      });
  });
}
export { cancel }; // 取消请求
export default apiAxios;
