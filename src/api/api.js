/**
 * 我在此处对整个项目api的统一管理
 */
import { mock } from "mockjs";
import request from "./request";

export default {
    // 获取左侧表格数据
    getTableData() {
        return request({
            url: '/home/getTableData/',
            method: 'get',
            mock: false, // 覆盖开关mock
        });
    },
    getCountData() {
        return request({
            url: '/home/getCountData/',
            method: 'get',
        });
    },
    getChartData() {
        return request({
        url: "/home/getChartData",
        method: "get",
    });
    },
    getUserData(params) {
        return request({
        url: "/user/getUserData",
        method: "get",
        data: params,//拦截器统一处理转换了所以可以统一使用data传参
    });
    },
    deleteUser(params) {
        return request({
        url: '/user/deleteUser',
        method: 'get',
        data: params
        })
    },
    addUser(params) {
        return request({
        url: '/user/addUser',
        method: 'post',
        data: params
        })
    },

};