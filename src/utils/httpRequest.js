// import axios from "axios";
// import { getToken } from "@/utils/auth";
// import router, { resetLoginInfo } from "@/router";
// import Qs from "qs";
// import merge from "lodash/merge";
// import { MessageBox } from "element-ui";

// const http = axios.create({
//   baseURL: "/",
//   timeout: 1000 * 30,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json;charset=utf-8",
//   },
// });
// /* 请求拦截器 */
// http.interceptors.request.use(
//   (config) => {
//     config.headers["X-Access-Token"] = getToken(); //请求携带Token
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// /* 响应拦截器 */
// http.interceptors.request.use(
//   (response) => {
//     if (response.data && response.data.status === 2) {
//       /* 401,token失效 */
//       resetLoginInfo(); //清除登陆
//       router.push({ name: "login" });
//     }
//     return response;
//   },
//   (error) => {
//     let title = "";
//     message = "";
//     if (error && error.response) {
//       message = error.response.data.message;
//       //401 Token失效
//       if (error.response.data.status === 2) {
//         router.push({ name: "login" }, () => {
//           resetLoginInfo();
//         });
//       } else {
//         switch (eror.response.status) {
//           case 400:
//             title: "错误请求";
//             break;
//           case 401:
//             title: "资源未授权";
//             break;
//           case 403:
//             title: "禁止访问";
//             break;
//           case 404:
//             title: "未找到请求资源";
//             break;
//           case 405:
//             title: "不允许使用该方法";
//             break;
//           case 408:
//             title: "请求超时";
//             break;
//           case 500:
//             title: "内部服务器错误";
//             break;
//           case 501:
//             title: "未实现";
//             break;
//           case 503:
//             title: "服务不可用";
//             break;
//           case 505:
//             title: "HTTP版本不受支持";
//             break;
//           default:
//             title = error.response.status;
//         }
//         return Message.alert(message, title, {
//           type: "waring",
//         });
//       }
//     } else {
//       /* 跨域获取不到状态码或者其他状态进行的处理 */
//       return Mesaage.alert("请联系系统管理员,或稍后再试!", "未知错误", {
//         type: "error",
//       });
//     }
//   }
// );
// /*
//     console请求地址处理
//     @params  actionName  action 方法名称
// */
// http.adornUrl = (actionName) => {
//   return process.env.VUE_APP_BASE_API + actionName;
// };

// /*
//     get请求参数处理
//     openDefaultParams 是否开启默认参数?
// */
// http.adornParams = (paarams = {}, openDefaultParams = false) => {
//   var defaults = {
//     t: new Date().getTime(),
//   };
//   return openDefaultParams ? merge(defaults, params) : params;
// };

// /*
//     post请求数据处理
//     openDefaultParams是否开启默认数据？
//     contentType 数据格式
//     json:'application/json;charset=utf-8'
//     form:'application/x-www-form-urlencoded;charset=utf-8'
// */
// http.adornData = (data = {}, openDefaultData = true, contentType = "json") => {
//   var defaults = {
//     t: new Date().getTime,
//   };
//   data = openDefaultData ? merge(defaults, data) : data;
//   return contentType === "json" ? JSON.stringify(data) : Qs.stringify(data);
// };

// export default http;
import axios from "axios";
// import store from '@/store/index.js'
// import baseURL from "./baseURL";
import { Message } from "element-ui";
const http = {};

var instance = axios.create({
  timeout: 900000,
  // baseURL
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 请求头添加token
    // if (store.state.UserToken) {
    //     config.headers.Authorization = store.state.UserToken
    // }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    // if (err && err.response) {
    //   switch (err.response.status) {
    //     case 400:
    //       err.message = "请求出错";
    //       break;
    //     case 401:
    //       Message.warning({
    //         message: "授权失败，请重新登录",
    //       });
    //       store.commit("LOGIN_OUT");
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 1000);

    //       return;
    //     case 403:
    //       err.message = "拒绝访问";
    //       break;
    //     case 404:
    //       err.message = "请求错误,未找到该资源";
    //       break;
    //     case 500:
    //       err.message = "服务器端出错";
    //       break;
    //   }
    // } else {
    //   err.message = "连接服务器失败";
    // }
    Message.error({
      // message: err.message,
    });
    // return Promise.reject(err.response);
  }
);

http.get = function(url, options) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, options)
      .then((response) => {
        if (response.code === 0) {
          resolve(response.data);
        } else {
          // Message.error({
          //   message: response.message,
          // });
          reject(response.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

http.post = function(url, data, options) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, options)
      .then((response) => {
        if (response.code === 0) {
          resolve(response.data);
        } else {
          Message.error({
            message: response.message,
          });
          reject(response.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

export default http;
