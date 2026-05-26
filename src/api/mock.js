// 统一注册mock接口,拦截前端发出的axios请求，直接返回模拟数据
import Mock from 'mockjs'
import homeApi from './mockData/homeData'
import userApi from './mockData/userData'
import permissionApi from './mockData/permission'
//查错笔记：正则表达式不要忘记删掉两边的引号，否则会被当成字符串而不是正则表达式
Mock.mock(/\/api\/home\/getTableData/, 'get', 
    homeApi.getTableData
)
Mock.mock(/\/api\/home\/getCountData/, 'get', 
    homeApi.getCountData
)
Mock.mock(/api\/home\/getChartData/, "get", homeApi.getChartData);
Mock.mock(/user\/getUserData/,"get", userApi.getUserList)
Mock.mock(/user\/deleteUser/, "get", userApi.deleteUser)
Mock.mock(/user\/addUser/,"post", userApi.createUser)
Mock.mock(/user\/editUser/, "post",userApi.updateUser)
Mock.mock(/permission\/getMenu/, "post",permissionApi.getMenu)