import Mock from 'mockjs'
import homeApi from './mockData/homeData'

//查错笔记：正则表达式不要忘记删掉两边的引号，否则会被当成字符串而不是正则表达式
Mock.mock(/\/api\/home\/getTableData/, 'get', 
    homeApi.getTableData
)
Mock.mock(/\/api\/home\/getCountData/, 'get', 
    homeApi.getCountData
)
Mock.mock(/api\/home\/getChartData/, "get", homeApi.getChartData);