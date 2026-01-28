import axios from "axios";

const http = axios.create({
    //通用请求的地址（前缀）
    baseURL: '/api',
    timeout: 10000, //超时事件

})

http.interceptors.request.use(function (config) {
//在请求发送之前做什么
    return config;
},function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

http.interceptors.response.use(function (response) {
    //对响应数据做些什么
    return response
},function(error) {
    // 对响应错误做些什么
    return Promise.reject(error);
})
export default http

