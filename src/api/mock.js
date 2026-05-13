import Mock from 'mockjs'
import homeData from './mockData/homeData'


Mock.mock('/\/api\/home\/getTableData/', 'get', 
    homeData.getTableData
)