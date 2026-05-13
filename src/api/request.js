import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create();
const NETWORK_ERROR = '网络异常，请稍后再试！';

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(
    (res) => {
    const {code, data, msg} = res.data
    if (code === 200) {
        return data // 成功，返回数据
    } else {
        ElMessage.error(msg || NETWORK_ERROR); // 失败，返回错误信息
        return Promise.reject(msg || NETWORK_ERROR);
    }
});

function request(options) {
    options.method = options.method || 'get';
    return service(options);
}

export default request;